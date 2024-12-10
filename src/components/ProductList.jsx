import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { addToCart } from "@/store/cart";

function ProductList() {
  const carts = useSelector((store) => store.cart.items);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [minPrice, setMinPrice] = useState(""); // State for min price filter
  const [maxPrice, setMaxPrice] = useState(""); // State for max price filter
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook

  // Add to cart handler
  const handelAddToCart = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Set filtered products as well
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterProducts(event.target.value, minPrice, maxPrice);
  };

  // Handle min price change
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    filterProducts(searchQuery, event.target.value, maxPrice);
  };

  // Handle max price change
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    filterProducts(searchQuery, minPrice, event.target.value);
  };

  // Filter products based on search query and price range
  const filterProducts = (query, minPrice, maxPrice) => {
    const filtered = products.filter((product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(query.toLowerCase());
      const matchesPrice =
        (minPrice === "" || product.price >= minPrice) &&
        (maxPrice === "" || product.price <= maxPrice);

      return matchesQuery && matchesPrice;
    });
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Helper function to generate stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars (integer part of the rating)
    const halfStar = rating % 1 >= 0.5 ? true : false; // Check for half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex items-center ">
        {/* Full stars */}
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={`full-${index}`} className="text-yellow-500">⭐</span>
          ))}
        {/* Half star */}
        {halfStar && <span className="text-yellow-500">⭐</span>}
        {/* Empty stars */}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={`empty-${index}`} className="text-gray-300">⭐</span>
          ))}
      </div>
    );
  };

  return (
    <div>
      {/* Search Bar and Price Range Filter */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-lg"
        />

        <div className="flex items-center space-x-4 ml-4">
          {/* Min Price */}
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min Price"
            className="w-24 p-2 border border-gray-300 rounded-lg"
          />

          {/* Max Price */}
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max Price"
            className="w-24 p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 align-middle m-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h3>
              <div className="text-sm text-gray-500 mt-1">
                {renderStars(product.rating)} {/* Render stars dynamically */}
              </div>
              <p className="text-xl font-bold text-gray-900 mt-2">${product.price}</p>
              <p className="text-sm text-gray-600 mt-1">{product.stock} in stock</p>
            </div>
            <div className="flex justify-between p-4">
              {/* More Info Button */}
              <button
                className="bg-[#7AB2B2] text-white py-2 px-5 rounded-lg hover:bg-[#4D869C]"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                More Info
              </button>

              {/* Add to Cart Button */}
              <button
                className="bg-[#7AB2B2] text-white py-1 px-3 rounded-lg hover:bg-[#4D869C]"
                onClick={() => handelAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
