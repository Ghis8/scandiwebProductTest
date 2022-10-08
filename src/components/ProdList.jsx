import React,{useState,useEffect} from 'react'
import Product from './Product'
import './prodList.css'
import { Link} from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'


const ProdList = () => {
  const [values,setValues]=useState([])
  const [isChecked,setIsChecked]=useState([])
   const divRef=useRef(null)

   const massDelete=()=>{
    let ids=isChecked.values()
    for(let id of ids){
      axios({
        method:'post',
        url:'https://productlist008.000webhostapp.com/?delete='+id
      })
      .then(res=>{
        if(res.status === 200){
          window.location.reload()
        }
      })
      .catch(err=>console.log(err))
    }
    

  }

   
  useEffect(()=>{
    
    const url="https://productlist008.000webhostapp.com/" 
    axios.get(url).then(res=>{
      setValues(res.data)
    }).catch(err=>console.log(err))
    
  },[massDelete])
    
  return (
    <div className='prodList'>
        <div className='prodListNav'>
            <h1>Product List</h1>
            <div>
                <Link to="/addProduct">ADD</Link>
                <button onClick={massDelete}>MASS DELETE</button>
            </div>
        </div>
        <hr/>
        <div className='products'>
          {
           values.map((value,key)=>
            <Product
             ref={divRef}
             id={value.id}
             handleChange={(e)=>(
              e.target.checked ? setIsChecked((prev)=>[...prev,value.id]):''
           )}
             key={key}
             sku={value.sku}
             prodName={value.names}
             price={value.price}
             switcher={value.switcher}
             size={value.size}
             lengths={value.lengths}
             height={value.height}
             weights={value.weights}
             width={value.width}
             />
           )
          }
           
        </div>
        <hr />
        <div className='footer'>
          <span>scandiweb test assignment</span>
      </div>

    </div>
  )
}

export default ProdList