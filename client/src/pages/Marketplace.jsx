import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Marketplace() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI filters
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordChips, setKeywordChips] = useState(['Spring', 'Smart', 'Modern']);
  const [priceMax, setPriceMax] = useState(100);
  const [selectedSections, setSelectedSections] = useState(['Games', 'Clothes', 'Fruits and Vegetables']);
  const [sortBy, setSortBy] = useState('new');

  const API_BASE = (import.meta?.env?.VITE_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

  useEffect(() => {
    fetch(`${API_BASE}/api/marketplace/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, [API_BASE]);

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
    const matchesSection = (p) => selectedSections.length === 0 || (p.category && selectedSections.includes(p.category));
    const matchesPrice = (p) => {
      const price = Number(p.price);
      if (!Number.isFinite(price)) return true;
      return price <= priceMax;
    };

    let list = (products || []).filter(p =>  matchesSection(p) && matchesPrice(p));

    if (sortBy === 'price-asc') list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    else if (sortBy === 'price-desc') list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    else if (sortBy === 'rating') list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    else if (sortBy === 'new') list.sort((a, b) => (Number(b.id) || 0) - (Number(a.id) || 0));

    return list;
  }, [products, keywordChips, selectedSections, priceMax, sortBy]);

  const maxProductPrice = useMemo(() => {
    return (products || []).reduce((max, p) => {
      const v = Number(p.price);
      return Number.isFinite(v) && v > max ? v : max;
    }, 100);
  }, [products]);

  useEffect(() => {
    if (maxProductPrice > 0 && (priceMax === 0 || priceMax > maxProductPrice)) {
      setPriceMax(maxProductPrice);
    }
  }, [maxProductPrice, priceMax]);

  return (
    <Layout>
      <div className="flex h-screen " style={{ fontFamily: 'BlockBlueprint, monospace' }}>
        {/* Fixed Left Sidebar */}
        <aside className="w-1/4 flex-shrink-0 flex items-start justify-center h-[75vh] ">
          <div className="p-6 bg-gold border-2 border-black overflow-y-auto w-3/4 h-full mp-scroll rounded-lg">
            {/* Keywords Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-black">Keywords</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {keywordChips.map((k) => (
                  <span key={k} className="inline-flex items-start bg-theme-orange text-black rounded-md text-sm border border-theme-orange ">
                    <div className=' w-[calc(100%-4px)] h-[calc(100%-4px)] bg-white rounded-md inline-flex items-center justify-center px-3 py-2'>
                    {k}
                    <button 
                      onClick={() => removeKeywordChip(k)}
                      className="ml-2 text-black hover:text-red-600 font-bold z-10"
                    >
                      ×
                    </button>
                    </div>
                  </span>
                ))}
              </div>
              {/* <div className="flex">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKeywordChip()}
                  placeholder="Add keyword"
                  className="flex-1 px-3 py-2 border-2 border-black rounded-l bg-white"
                />
                <button
                  onClick={addKeywordChip}
                  className="px-4 py-2 bg-orange-300 border-2 border-l-0 border-black rounded-r hover:bg-orange-400 flex items-center justify-center"
                >
                  <ion-icon name="search-outline"></ion-icon>
                </button>
              </div> */}
            </div>

            {/* Labels Section */}
            <div className="mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start mb-3">
                  <input type="checkbox" defaultChecked className="mr-3 mt-1" />
                  <div>
                    <div className="font-bold text-black">Label</div>
                    <div className="text-sm text-gray-700">Description</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-black">Price Range</h3>
              <input
                type="range"
                min={0}
                max={maxProductPrice}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full mb-2"
              />
              <div className="flex justify-between text-sm text-gray-700">
                <span>0ℳ</span>
                <span>{priceMax}ℳ</span>
              </div>
            </div>

            {/* Section Checkboxes */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 text-black">Section</h3>
              {['Games', 'Clothes', 'Fruits and Vegetables', 'Electronics', 'Books'].map(s => (
                <label key={s} className="flex items-center mb-2 text-black">
                  <input
                    type="checkbox"
                    checked={selectedSections.includes(s)}
                    onChange={() => toggleFromArray(selectedSections, setSelectedSections, s)}
                    className="mr-3"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="  p-4 flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex w-1/3">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKeywordChip()}
                  placeholder="Search"
                  className="flex-1 px-4 py-2 border-2 border-black border-r-0 rounded-l-full bg-orange-200 focus:outline-none focus:ring-0"
                />
                <button
                  onClick={addKeywordChip}
                  className="px-4 py-2 bg-orange-200 border-2 border-l-0 border-black  rounded-r-full hover:bg-orange-300 flex items-center justify-center"
                >
                  <ion-icon name="search-outline"></ion-icon>
                </button>
              </div>

              <div className="flex gap-2">
                {[
                  { k: 'new', label: 'New' },
                  { k: 'price-asc', label: 'Price ascending' },
                  { k: 'price-desc', label: 'Price descending' },
                ].map(opt => (
                  <button
                    key={opt.k}
                    onClick={() => setSortBy(opt.k)}
                    className={`px-3 py-2 border-2 border-black rounded text-sm ${
                      sortBy === opt.k 
                        ? 'bg-orange-400 text-black' 
                        : 'bg-orange-200 text-black hover:bg-orange-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading && <div className="text-center py-8">Loading products...</div>}
            {error && <div className="text-center py-8 text-red-600">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/marketplace/${product.id}`}
                  className="group"
                >
                  <div className="bg-white border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
                      {product.image_url ? (
                        <img
                          src={`${API_BASE}/${String(product.image_url).replace(/^\//, '')}`}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="text-6xl text-gray-400 flex items-center justify-center w-full h-full"
                        style={{ display: product.image_url ? 'none' : 'flex' }}
                      >
                        📦
                      </div>
                    </div>
                    <div className="p-4 bg-orange-100">
                      <h3 className="font-bold text-black text-lg mb-1">{product.name}</h3>
                      <p className="text-black font-bold">{product.price}ℳ</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && !loading && !error && (
              <div className="text-center py-8 text-gray-600">No products found.</div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
