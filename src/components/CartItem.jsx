import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeQuantity } from "@/store/cart";

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();

  // Fetch product details from the API
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        setDetail(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetail();
  }, [productId]);

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(
        changeQuantity({
          productId,
          quantity: quantity - 1,
        })
      );
    }
  };

  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId,
        quantity: quantity + 1,
      })
    );
  };

  // Render only after the product detail is fetched
  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center bg-[#CDE8E5] text-[#4D869C] p-2  border-slate-700 gap-5 m-3 rounded-md">
      <img src={detail.thumbnail} alt={detail.title} className="w-12" />
      <h3 >{detail.title}</h3>
      <p>${detail.price * quantity}</p>
      <div className="w-20 flex justify-between">
        <button
          className="bg-white rounded-full w-6 h-6 text-gray-700"
          onClick={handleMinusQuantity}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="bg-white rounded-full w-6 h-6 text-gray-700"
          onClick={handlePlusQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
