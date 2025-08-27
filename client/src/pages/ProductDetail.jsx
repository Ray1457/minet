import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = (import.meta?.env?.VITE_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`${API_BASE}/api/marketplace/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then(data => {
        setProduct(data.product || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [API_BASE, id]);

  const handleBuyNow = () => {
    alert(`You have bought: ${product?.name}`);
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 font-mono text-black">
        <div className="max-w-5xl mx-auto px-6 bg-orange-100 rounded-lg border-2 border-black p-6 shadow-lg">
          {loading && <div className="text-center py-8">Loading product...</div>}
          {error && <div className="text-center py-8 text-red-600">{error}</div>}
          {!loading && !error && !product && (
            <div className="text-center py-8 text-gray-600">Product not found.</div>
          )}
          {!loading && product && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl font-bold">{product.price}ℳ</p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-1 bg-white border-2 border-black rounded-lg p-4 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={`${API_BASE}/${String(product.image_url).replace(/^\//, '')}`}
                      alt={product.name}
                      className="max-w-full max-h-[400px] object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-6xl text-gray-400 flex items-center justify-center w-full h-full">
                      📦
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Description</h2>
                    <p className="mb-6">{product.description || 'No description available.'}</p>
                    <h3 className="text-xl font-semibold mb-2">Category</h3>
                    <p>{product.category || 'Uncategorized'}</p>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="mt-6 bg-theme-orange border-2 border-black text-black font-bold py-3 rounded-lg hover:bg-orange-400 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white border-2 border-black rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {/* Placeholder reviews; replace with real data if available */}
                <p className="text-gray-700">No reviews yet. Be the first to review this product!</p>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
