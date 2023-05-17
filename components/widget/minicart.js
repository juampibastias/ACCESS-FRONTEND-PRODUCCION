
import React,{useEffect} from 'react';
import Link from 'next/link'
import 'animate.css';
const MiniCartWidget =(props)=>{
   
    
    

    return(
        <div className="container-widget">
          
            <Link href='/cart' >
            
                <a> <img src="./icons/carrito.png"/> <p>{props.count}</p></a>
           
            </Link>
        </div>
    )
}
export default MiniCartWidget;