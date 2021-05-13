import React, { useEffect, useState} from "react";
import ImageHelper from "./helper/ImageHelper";
import { Link,Redirect} from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAutheticated } from "../auth/helper";
 

import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  toast.configure()
  
 
const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  //   function(f){return f}
  reload = undefined,
  showQuantity,
  calculatePrice,
  
  
 
}) => {
  const [redirect, setRedirect] = useState(false);
   
  const [count, setCount] = useState(product.count);
 
   
  

  //alert notification//

  const notify=()=>{
    toast.success(" Added to cart", {
     position: "top-center",
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     })
  }
  
 
   
  
 //alerts
  
  const cartTitle = product ? product.name : "A photo from pexels";
  const productId=product?product._id:"DEFAULT ID"
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";
  const category=product?(product.category.name):"DEFAULT"
  const addToCart = () => {
     
    isAutheticated()?(addItemToCart(product, () => setRedirect(true))):(alert("Please Login or Signup to continue!"))
   
    
  };

  
  const getARedirect = redirect => {
    if (redirect) {
    
  return notify()
    }
  };
 

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button id="added"
          onClick={addToCart}
          className="btn btn-block btn-outline-success  mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showGoToCart=()=>{
    return redirect&&<Link to="/cart" className="btn btn-block btn-outline-info mt-2 mb-2">Go To Cart</Link>  
  }
  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <Link to="/cart">
           <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
            window.location.reload()
          
      
          
          }}
          className="btn btn-block removeFromCart btn-outline-danger mt-2 mb-2"
        >
          Remove 
        </button>
        </Link>
      )
    );
  };
  let w = window.innerWidth;
  const [value,setValue]=useState(1)
  const total=value*cartPrice;
 
  const handleChange=(e)=>{
   
    setValue(e.target.value); 
    calculatePrice(e.target.value*cartPrice,productId);
    
   
 
  }
 
  
   
 
  return (
    <div className="card text-white bg-dark border border-info mb-2">
     
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
         
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescrption}
        </p>
        <p className="lead bg-secondary font-weight-normal text-wrap rounded">Rs/- {cartPrice}</p>
        {showQuantity?(<div> <p className="lead bg-info font-weight-normal text-wrap rounded">Total Rs/- {total}</p>
        <form className="form mb-2">
        <select name="Quantity" id="Quantity" onChange={handleChange} value={value}>
          <option value="1">1</option>
          <option value="2" >2</option>
          <option value= "3">3</option>
          <option value="4">4</option>
        </select>
         
        </form></div>):""}
        
    
      {
  w>768?<p className="lead bg-success font-weight-normal text-wrap rounded">Category : {category}</p>:""

      }   
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}
           </div>

           
          <div className="col-12">{redirect?showGoToCart():showRemoveFromCart(removeFromCart)}</div>
        </div>
         
      </div>
    </div>
  );
};

export default Card;
