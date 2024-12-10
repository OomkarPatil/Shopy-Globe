import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { toggleStatusTab } from "@/store/cart";
import { NavLink } from "react-router-dom";


const Cart = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector(store => store.cart.statusTab);
  const dispatch = useDispatch(); 

  const handelCloseButton = () => {
    dispatch(toggleStatusTab());
  }

  return (
    <div className={`fixed top-0 right-0 bg-[#7AB2B2] shadow-2xl w-[1000px] h-full grid grid-rows-[60px_1fr_60px] rounded-l-lg transform transition-transform duration-500 ${statusTab === false ? "translate-x-full" : ""}`}>
      <h2 className="p-5 text-white text-2xl border-b border-white ">Your Cart</h2>
      <div className="p-5 overflow-y-auto">
        {carts.length > 0 ? (
          carts.map((item, index) => <CartItem key={index} data={item} />)
        ) : (
          <p className="text-center text-white">Your cart is empty.</p>
        )}
      </div>
      <div className="grid grid-cols-2">
        <NavLink to={"/productlist"} className="bg-[#4D869C] font-semibold m-2 rounded-lg text-white hover:text-gray-700 hover:bg-white"
                onClick={handelCloseButton}>
          <button className="font-semibold m-2 text-center  hover:text-gray-700">CLOSE TAB</button>
        </NavLink>
        <button className="bg-gray-300 font-semibold m-2 rounded-lg hover:text-gray-300 hover:bg-[#4D869C]">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
