import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/marketplace/products/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setProduct(d.product);
        setLoading(false);
      })
      .catch(e => { setError(e.message || 'Failed to load'); setLoading(false); });
  }, [id]);

  const formatPrice = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? `${n}.//` : `${v}`;
  };

  return (
    <Layout>
      <div className="marketpage">
        <div className="main-container" style={{display:'block', maxWidth: 1200, margin: '0 auto', padding: '32px 24px'}}>
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Back">◀ Back</button>
          {loading && <div>Loading...</div>}
          {error && <div style={{color:'crimson'}}>{error}</div>}
          {product && (
            <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
              <div className="product-image-container" style={{border: '2px solid var(--minecraft-brown)'}}>
                {product.image_url ? (
                  <img className="product-image" src={product.image_url} alt={product.name}
                    onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/flag.png'; }} />
                ) : (
                  <div style={{ textAlign: 'center', color: '#666' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                    <div>No Image</div>
                  </div>
                )}
              </div>
              <div>
                <h1 style={{fontSize: 48, fontWeight: 800, letterSpacing: 1}}>{product.name}</h1>
                <p style={{fontSize: 36, fontWeight: 800, marginTop: 8}}>{formatPrice(product.price)}</p>
                <div style={{marginTop: 24, border: '2px solid var(--minecraft-brown)', background: 'var(--card)'}}>
                  <div style={{padding: 12, borderBottom: '2px solid var(--minecraft-brown)', fontWeight: 800}}>DETAILS:</div>
                  <div style={{padding: 16}}>
                    <p style={{margin: 0}}>{product.description || 'No description provided.'}</p>
                  </div>
                </div>
                <div style={{marginTop: 24}}>
                  <button className="sort-btn active" style={{fontSize: 20, padding: '12px 24px'}} onClick={()=> alert('Checkout flow TBD')}>
                    Buy Now!
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* mock reviews section */}
          <div style={{marginTop: 40}}>
            <h2 className="filter-title" style={{fontSize: 28}}>Latest reviews</h2>
            <div className="product-grid">
              {[1,2,3].map((i)=> (
                <div key={i} className="filter-card">
                  <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                    {'★★★★★'.slice(0, 5)}
                  </div>
                  <div style={{fontWeight:800}}>Review title</div>
                  <div style={{fontSize:14, color:'var(--minecraft-dark)'}}>Review body</div>
                  <div style={{display:'flex', alignItems:'center', gap:8, marginTop:12}}>
                    <img src="/flag.png" alt="avatar" style={{width:24, height:24, borderRadius:'50%'}} />
                    <div>
                      <div style={{fontWeight:700}}>Reviewer name</div>
                      <div style={{fontSize:12}}>Date</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
