import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    keywords: '',
    priceRange: '',
    color: '',
    section: ''
  });

  useEffect(() => {
    fetch('/api/marketplace/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      (!filters.keywords || product.name.toLowerCase().includes(filters.keywords.toLowerCase())) &&
      (!filters.color || product.color === filters.color) &&
      (!filters.section || product.category === filters.section)
    );
  });

  return (
    <Layout>
      <div className="flex min-h-screen bg-[#f5e6d3] font-blockblueprint">
        {/* Sidebar Filters */}
        <div className="w-64 bg-[#e6d7c3] border-r-2 border-black p-4">
          <h2 className="text-xl font-bold mb-4 text-center bg-[#d4af37] text-white py-2 border-2 border-black">
            United Pingdom of Minet
          </h2>
          
          {/* Navigation Tabs */}
          <div className="flex mb-4">
            <button className="px-3 py-1 bg-[#ff6b35] text-white border-2 border-black text-sm font-bold">
              Topics
            </button>
            <button className="px-3 py-1 bg-gray-300 border-2 border-black text-sm">
              Services
            </button>
            <button className="px-3 py-1 bg-[#ff6b35] text-white border-2 border-black text-sm font-bold">
              Scam Alert
            </button>
          </div>

          {/* Keywords Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-2 bg-[#d4af37] text-white px-2 py-1 border border-black">Keywords</h3>
            <input
              type="text"
              value={filters.keywords}
              onChange={(e) => setFilters({...filters, keywords: e.target.value})}
              className="w-full border-2 border-black px-2 py-1 text-sm"
              placeholder="Search products..."
            />
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h3 className="font-bold mb-2 bg-[#d4af37] text-white px-2 py-1 border border-black">Price Range</h3>
            <select 
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="w-full border-2 border-black px-2 py-1 text-sm"
            >
              <option value="">All Prices</option>
              <option value="under-100">Under $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="over-500">Over $500</option>
            </select>
          </div>

          {/* Color Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-2 bg-[#d4af37] text-white px-2 py-1 border border-black">Color</h3>
            <div className="space-y-1">
              {['Red', 'Blue', 'Purple', 'Green', 'Yellow'].map(color => (
                <label key={color} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={filters.color === color}
                    onChange={(e) => setFilters({...filters, color: e.target.checked ? color : ''})}
                    className="mr-2"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Section Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-2 bg-[#d4af37] text-white px-2 py-1 border border-black">Section</h3>
            <div className="space-y-1">
              {['Electronics', 'Clothes', 'Fruits and Vegetables', 'Books'].map(section => (
                <label key={section} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={filters.section === section}
                    onChange={(e) => setFilters({...filters, section: e.target.checked ? section : ''})}
                    className="mr-2"
                  />
                  {section}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center border-2 border-black rounded-full bg-white px-4 py-2 w-96">
              <input
                type="text"
                placeholder="Search"
                value={filters.keywords}
                onChange={(e) => setFilters({...filters, keywords: e.target.value})}
                className="flex-1 outline-none"
              />
              <button className="ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {loading && <div className="text-center">Loading products...</div>}
          {error && <div className="text-red-600 text-center">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="border-2 border-black rounded-lg bg-[#ff8c42] overflow-hidden shadow-lg">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">📦</div>
                      <div>No Image</div>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm mb-2">{product.description}</p>
                  <div className="font-bold text-xl">₹{product.price}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {product.category} • {product.color}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && !error && (
            <div className="text-center text-gray-600 mt-8">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
