import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cart";
 
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  if (loading) {
    return <div>Loading product details...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handelMinusQuantity = () =>{
    setQuantity(quantity-1 < 1 ? 1:quantity-1);
  }
  const handelPlusQuantity = ()=>{
    setQuantity(quantity+1);
  }
  const handelAddToCart = (id) =>{
    dispatch(addToCart({
      productId: id,
      quantity: quantity
    }))
  }

  return (
    <div>
    
    <h2 className="text-3xl text-center my-5 bg-[#7AB2B2] py-3 text-white font-bold rounded-lg" >Product Detail</h2>  
    <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
        
        <img 
             src={product.thumbnail} 
             alt={product.title} 
             className="w-full border rounded-lg shadow-xl "
        />
        </div>
        <div className="flex flex-col my-auto gap-5">
            
            <h1 className="text-4xl uppercase font-bold">{product.title}</h1>
            <p className="font-bold text-3xl">${product.price}</p>
            <div className="flex gap-5">
                <div className="flex gap-2 justify-center items-center">

                  {/* //quantity selection  */}
                    <button className="bg-[#4D869C] h-full w-10 font-bold text-xl text-white rounded-xl flex justify-center items-center" 
                           onClick={handelMinusQuantity}
                    > - </button>

                    <span className="bg-[#7AB2B2] h-full w-10 font-bold text-xl text-white rounded-xl flex justify-center items-center">
                      {quantity}
                    </span> 

                    <button className="bg-[#4D869C] h-full w-10 font-bold text-xl text-white rounded-xl flex justify-center items-center"
                           onClick={handelPlusQuantity}
                    > + </button>
                </div> 
                                      
            </div>

                  {/* //add to cart button   */}

            <button className="bg-[#7AB2B2] hover:bg-[#4D869C] text-white px-7 py-3 rounded-xl shadow-2xl" onClick={() =>handelAddToCart(product.id)}>
                    Add To Cart
                </button> 
            <p className="text-sm text-gray-600">{product.stock} in stock</p>
            <p>
            {product.description}
            </p>
            <NavLink to="/productlist">
            <span className="bg-[#4D869C] py-2 px-6 rounded-md text-white"> Back</span>
            </NavLink> 
        </div>
    </div>
    </div>
  );
}

export default ProductDetail;

