import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { FaBoxes } from "react-icons/fa";
import {IoIosArrowBack} from "react-icons/io"
import { AiOutlineAppstore } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { GiClothes } from "react-icons/gi";
import { VscChip } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import SubMenu from "./SubMenu";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatusTab } from "@/store/cart";

const NavBar = () => {
    const [totalQuntity, setTotalQuntity] = useState(0);
    const carts = useSelector(store =>store.cart.items);
    const dispatch = useDispatch();
    useEffect(()=>{
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuntity(total)
    },[carts])
    const handelOpenTabCart = () =>{
        dispatch(toggleStatusTab());
    }

    const Sidebar_animation = {
        
        open:{
            width:"16rem",
            transition:{
                damping:40,
            }
        },
        closed:{
            width:"4rem",
            transition:{
                damping:40,
            }
        }
    };
    const SubMenuList = [
        {
            name:"Electronics",
            icon: VscChip,
            menus:["mobiles","fun"] 
        },
        {
            name:"Clothing",
            icon: GiClothes,
            menus:["Top Ware","Bottom Ware"]
        }
    ]

    const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div variants={Sidebar_animation} animate={ isOpen ? "open" : "closed"} className='bg-[#7AB2B2] text-gray-100 shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden rounded-r-lg md:relative fixed'>

        <div className="flex items-center gap-3 font-medium font-FM border-b border-white mx-3 py-2">
            <img src="https://img.icons8.com/?size=100&id=0ny63oDHuHzk&format=png&color=000000" alt="" width={50}  />
            <span className="text-xl whitespace-pre">ShopyGlobe</span>
        </div>

        <div className="flex flex-col h-full">
            <ul className="flex flex-col gap-1.5 font-medium overflow-x-hidden whitespace-pre px-3 text-[0.9rem] py-5">
                <li>
                    <NavLink to="/" className={"link"} >
                    <AiOutlineAppstore 
                       size={23}
                       className="min-w-max"/>
                         Home
                    </NavLink>
                </li>
                <li>
                <NavLink to="/productlist" className={"link"} >
                    <FaBoxes 
                       size={23}
                       className="min-w-max"/>
                         Products
                    </NavLink>
                </li>

                {isOpen &&
                  (<div className="mt-2 border-y py-5 border-gray-300">
                    <small className="pl-3 text-gray-100 inline-block mb-2">Catagory</small>
                    {SubMenuList?.map(menu => (
                        <div key={menu.name} className="flex flex-col gap-1">
                            <SubMenu data={menu}/>
                        </div>
                    ))}
                  </div>)
                }
                

                <li>
                <NavLink to="/cart" className={"link"} onClick={handelOpenTabCart} >
                    <HiOutlineShoppingCart 
                       size={23}
                       className="min-w-max"/>
                         Cart
                         <span className="bg-white text-[#4D869C] px-2 py-1 rounded-full">{totalQuntity}</span>
                    </NavLink>
                </li>
                
            </ul>
        </div>

        <motion.div 
          animate={isOpen ? {x:0,y:0,rotate:0}:{x:-10,y:-200,rotate:180}}
           onClick={()=>setIsOpen(!isOpen)} 
           className="absolute h-fit w-fit z-50 right-2 bottom-3 cursor-pointer md:block hidden" > 
            <IoIosArrowBack size={25}/>
        </motion.div>

    </motion.div>
  )
}

export default NavBar