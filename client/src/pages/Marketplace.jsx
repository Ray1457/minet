import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import './Marketplace.css';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI filters to mirror the design exactly
  const [keywordInput, setKeywordInput] = useState('');
  // Start with no active keyword chips so initial view isn't over-filtered
  const [keywordChips, setKeywordChips] = useState([]);
  const [priceMax, setPriceMax] = useState(0); // will be set to max product price when data loads
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [sortBy, setSortBy] = useState('new'); // 'new' | 'price-asc' | 'price-desc' | 'rating'

  useEffect(() => {
    fetch('/api/marketplace/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const toggleFromArray = (arr, setArr, value) => {
    setArr(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  const addKeywordChip = () => {
    const v = keywordInput.trim();
    if (!v) return;
    if (!keywordChips.includes(v)) setKeywordChips([...keywordChips, v]);
    setKeywordInput('');
  };

  const removeKeywordChip = (v) => setKeywordChips(keywordChips.filter(k => k !== v));

  const filteredProducts = useMemo(() => {
    const matchesKeywords = (p) =>
      keywordChips.length === 0 || keywordChips.some(k => p.name?.toLowerCase().includes(k.toLowerCase()) || p.description?.toLowerCase().includes(k.toLowerCase()));
    const matchesColor = (p) => selectedColors.length === 0 || (p.color && selectedColors.includes(p.color));
    const matchesSection = (p) => selectedSections.length === 0 || (p.category && selectedSections.includes(p.category));
    // Price filter: slider range is 0..maxProductPrice
    const matchesPrice = (p) => {
      const price = Number(p.price);
      if (!Number.isFinite(price)) return true;
      return price <= priceMax;
    };

    let list = (products || []).filter(p => matchesKeywords(p) && matchesColor(p) && matchesSection(p) && matchesPrice(p));

    // sorting
    if (sortBy === 'price-asc') list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    else if (sortBy === 'price-desc') list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    else if (sortBy === 'rating') list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    else if (sortBy === 'new') list.sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0));

    return list;
  }, [products, keywordChips, selectedColors, selectedSections, priceMax, sortBy]);

  // Compute max product price dynamically
  const maxProductPrice = useMemo(() => {
    return (products || []).reduce((max, p) => {
      const v = Number(p.price);
      return Number.isFinite(v) && v > max ? v : max;
    }, 0);
  }, [products]);

  // Initialize or clamp the slider value to the available max when products load
  useEffect(() => {
    if (maxProductPrice > 0 && (priceMax === 0 || priceMax > maxProductPrice)) {
      setPriceMax(maxProductPrice);
    }
  }, [maxProductPrice]);

  return (
    <Layout>
      <div className="marketpage">
        <div className="main-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="filter-card">
              {/* Keywords */}
              <section className="filter-section">
                <h3 className="filter-title">Keywords</h3>
                <div className="keywords-container">
                  {keywordChips.map((k) => (
                    <span key={k} className="keyword-tag">
                      {k}
                      <button aria-label={`remove ${k}`} className="keyword-remove" onClick={() => removeKeywordChip(k)}>×</button>
                    </span>
                  ))}
                </div>
                <div className="search-bar-container" style={{ marginTop: 8 }}>
                  <div className="search-input-container">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input className="search-input" placeholder="Add keyword" value={keywordInput} onChange={(e)=>setKeywordInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && addKeywordChip()} />
                  </div>
                </div>
              </section>

              {/* Labels (visual only) */}
              <section className="filter-section">
                <div className="label-item">
                  <input type="checkbox" defaultChecked />
                  <div className="label-content">
                    <label>Label</label>
                    <p className="label-desc">Description</p>
                  </div>
                </div>
              </section>

              {/* Price Range */}
              <section className="filter-section">
                <h3 className="filter-title">Price Range</h3>
                <div className="price-slider-container">
                  <input
                    className="price-slider"
                    type="range"
                    min={0}
                    max={maxProductPrice || 0}
                    step={1}
                    value={priceMax}
                    onChange={(e)=> setPriceMax(Number(e.target.value))}
                    disabled={!maxProductPrice}
                  />
                  <div className="price-labels">
                    <span>0.//</span>
                    <span>{priceMax}.//</span>
                  </div>
                </div>
              </section>

              {/* Color */}
              <section className="filter-section">
                <h3 className="filter-title">Color</h3>
                <div className="checkbox-group">
                  {['Black', 'Purple', 'Blue', 'Red', 'Green', 'Yellow'].map(c => (
                    <label key={c} className="checkbox-item">
                      <input type="checkbox" checked={selectedColors.includes(c)} onChange={() => toggleFromArray(selectedColors, setSelectedColors, c)} />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Section */}
              <section className="filter-section">
                <h3 className="filter-title">Section</h3>
                <div className="checkbox-group">
                  {['Games', 'Clothes', 'Fruits and Vegetables', 'Electronics', 'Books'].map(s => (
                    <label key={s} className="checkbox-item">
                      <input type="checkbox" checked={selectedSections.includes(s)} onChange={() => toggleFromArray(selectedSections, setSelectedSections, s)} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          {/* Main */}
          <main className="main-content">
            <section className="search-section">
              <div className="search-bar-container">
                <button className="back-btn" aria-label="Back">◀</button>
                <div className="search-input-container">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input className="search-input" placeholder="Search" value={keywordInput} onChange={(e)=> setKeywordInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && addKeywordChip()} />
                </div>
                <div className="sort-buttons">
                  {[
                    { k: 'new', label: 'New' },
                    { k: 'price-asc', label: 'Price ascending' },
                    { k: 'price-desc', label: 'Price descending' },
                    { k: 'rating', label: 'Rating' },
                  ].map(opt => (
                    <button key={opt.k} className={`sort-btn ${sortBy === opt.k ? 'active' : ''}`} onClick={()=> setSortBy(opt.k)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section>
              {loading && <div>Loading products...</div>}
              {error && <div style={{ color: 'crimson' }}>{error}</div>}

              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="product-card">
                    <div className="product-image-container">
                      {product.image_url ? (
                        <img
                          className="product-image"
                          src={product.image_url}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null; // prevent loop
                            e.currentTarget.src = '/flag.png';
                          }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', color: '#666' }}>
                          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                          <div>No Image</div>
                        </div>
                      )}
                    </div>
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-price">{Number(product.price) || product.price}.//</p>
                    </div>
                  </article>
                ))}
              </div>

              {filteredProducts.length === 0 && !loading && !error && (
                <div style={{ textAlign: 'center', color: '#666', marginTop: 24 }}>No products found.</div>
              )}
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}
