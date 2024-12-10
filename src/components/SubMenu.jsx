import React, { useLayoutEffect, useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const SubMenu = ({data}) => {
    const {pathname}= useLocation();
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [contentHeigt, setContentHeigt] = useState(0);
    const contentRef = useRef(null)

    useLayoutEffect (()=>{
        if(contentRef.current){
            setContentHeigt(contentRef.current.scrollHeight)
        }
    },[])
  return (
    <>
        <li 
           className={`link ${pathname.includes(data.name) && "underline underline-offset-8 "}`}
           onClick={() => setSubMenuOpen(!subMenuOpen)}  
           
        >
            <data.icon size={23} className="min-w-max" />
            <p className='flex-1'>{data.name}</p>
            <IoIosArrowDown className={`${subMenuOpen && 'rotate-180'} duration-200`}/>
        </li>
        <motion.ul 
         initial={{height:0}}
         animate={{height: subMenuOpen ? contentHeigt : 0}}
         transition={{duration:0.2}}
         style={{overflow: "hidden"}} 
        className='flex flex-col pl-12 text-[0.8rem] gap-3 font-FP overflow-hidden h-0'
       >
            {data.menus.map(menu => (
                <li key={menu}  ref={contentRef}>
                    <NavLink to={`${data.name}/${menu}`}
                      className="link"
                      
                    >
                    {menu}
                    </NavLink>
                </li>
            ))}
        </motion.ul>
    </>
  )
}

export default SubMenu