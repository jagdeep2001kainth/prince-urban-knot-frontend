import { useState } from 'react';
import { useAuth } from '../AuthContext';

const BULK_URL = 'https://prince-urban-knot-backend.onrender.com/api/products/bulk-v2';

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = lines[0].split(delimiter).map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = delimiter === '\t'
      ? line.split('\t').map(v => v.replace(/^"|"$/g, '').trim())
      : line.match(/(".*?"|[^,]+)(?=,|$)/g).map(v => v.replace(/^"|"$/g, '').trim());

    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });

    return {
      name: obj.name,
      description: obj.description,
      price: parseFloat(obj.price),
      imageUrl: obj.imageUrl,
      category: obj.category,
      stock: parseInt(obj.stock)
    };
  });
}

function AdminBulkUploadV2() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debugLog, setDebugLog] = useState([]);

  const log = (msg) => {
    console.log('[BulkV2]', msg);
    setDebugLog(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setMessage(null);
    setDebugLog([]);
    log(`File selected: ${selected.name}`);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = parseCSV(event.target.result);
        log(`Parsed ${parsed.length} rows`);
        setPreview(parsed);
      } catch (err) {
        log(`Parse error: ${err.message}`);
        setMessage({ type: 'error', text: 'Failed to parse CSV. Check format.' });
        setPreview([]);
      }
    };
    reader.readAsText(selected);
  };

  const handleUpload = async () => {
    if (preview.length === 0) return;
    setLoading(true);
    setMessage(null);

    log(`Token present: ${!!token}`);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        log(`Token role: ${payload.role}, exp: ${new Date(payload.exp * 1000).toLocaleString()}`);
        log(`Token expired: ${Date.now() > payload.exp * 1000}`);
      } catch {
        log('Could not decode token');
      }
    }

    try {
      log(`Sending POST to ${BULK_URL}`);
      const response = await fetch(BULK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preview)
      });

      log(`Response status: ${response.status}`);
      const responseText = await response.text();
      log(`Response body: ${responseText}`);

      if (!response.ok) {
        throw new Error(`Upload failed (${response.status}): ${responseText}`);
      }

      setMessage({ type: 'success', text: `${preview.length} products added successfully!` });
      setFile(null);
      setPreview([]);
    } catch (err) {
      log(`Caught error: ${err.message}`);
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Bulk Upload Products v2 (CSV)</h2>
      <p style={{ marginBottom: '1.5rem', color: '#888' }}>
        CSV format: name,description,price,imageUrl,category,stock
      </p>

      <input type="file" accept=".csv" onChange={handleFileChange} />

      {preview.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Preview ({preview.length} products)</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Price</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Category</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((p, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.5rem' }}>{p.name}</td>
                  <td style={{ padding: '0.5rem' }}>${p.price}</td>
                  <td style={{ padding: '0.5rem' }}>{p.category}</td>
                  <td style={{ padding: '0.5rem' }}>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleUpload} disabled={loading} style={{ marginTop: '1.5rem' }}>
            {loading ? 'Uploading...' : `Upload ${preview.length} Products`}
          </button>
        </div>
      )}

      {message && (
        <p style={{ color: message.type === 'success' ? 'green' : 'red', marginTop: '1rem' }}>
          {message.text}
        </p>
      )}

      {debugLog.length > 0 && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <strong>Debug Log:</strong>
          {debugLog.map((line, i) => (
            <div key={i} style={{ marginTop: '0.25rem' }}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBulkUploadV2;
