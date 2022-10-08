import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './addProduct.css'
import axios from 'axios'

const AddProd = () => {

    const navigate=useNavigate()
    const [values,setValues]=useState({
    sku:'',
    prodName:"",
    price:"",
    switcher:"",
    size:"",
    weight:'',
    height:"",
    width:"",
    length:""
   }) 
   
   const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})

   }
   
   const handleSubmit=async (event)=>{
    event.preventDefault()
    console.log(values)
    let formData= new FormData()

    formData.append('sku',values.sku)
    formData.append('prodName',values.prodName)
    formData.append('price',values.price)
    formData.append('switcher',values.switcher)
    formData.append('size',values.size)
    formData.append('weight',values.weight)
    formData.append('height',values.height)
    formData.append('width',values.width)
    formData.append('length',values.length)
    
    axios({
        method:'post',
        url:'https://productlist008.000webhostapp.com/',
        data: formData,
        config: { headers :{'Content-Type': 'multipart/form-data'}}
    })
    .then(response=>console.log(response)) && navigate('/') && window.location.reload()
    .catch(error=>console.log(error)) 

    
    
   }
   
  return (
    <>
    <form onSubmit={handleSubmit} id="product_form">
        <div className='nav'>
            <h1>Add Product</h1>
            <div className='btn'>
                <button type='submit'>Save</button>
                <button onClick={()=>navigate('/')}>Cancel</button>
            </div>
        </div>
        <hr/>
        <div className='content'>
            <div>
                <div className="input">
                    <label htmlFor="">SKU</label>
                    <input type="text" id="sku" onChange={handleChange}  name="sku" required/>
                </div>
            </div>
            <div className="input">
                <label htmlFor="">Name</label>
                <input type="text" id="name" onChange={handleChange} name="prodName" />
            </div>
            <div className="input">
                <label htmlFor="">Price</label>
                <input type="text" id="price" onChange={handleChange} name="price" />
            </div>
            <div className="input">
                <label htmlFor="">SWITCHER</label>
                <select name="switcher" onChange={handleChange} id="productType">
                    <option value="">Type Switcher</option>
                    <option value="DVD">DVD</option>
                    <option value="BOOK">BOOK</option>
                    <option value="FURNITURE">FURNITURE</option>
                </select>
            </div>
            {
                (values.switcher==="DVD") ? 
                <div className='input selected' id="DVD">
                    <div>
                        <label htmlFor="">Size (MB)</label>
                        <input type="text" id="size" onChange={handleChange} name="size"/>
                    </div>
                    <span>Please Provide size in MB format<b>*</b></span>
                </div> :
                (values.switcher ==="BOOK") ?
                <div className='input selected' id="Book">
                    <div>
                        <label htmlFor="">Weight (KG)</label>
                        <input type="text" id="weight" onChange={handleChange} name="weight"/>
                    </div>
                    <span>Please provide weight in KG format<b>*</b></span>
                </div> : (values.switcher ==="FURNITURE")?
                <div className='input selected' id="Furniture">
                    <>
                    <div>
                        <label htmlFor="">Height (CM)</label>
                        <input type="text" id="height" onChange={handleChange} name="height"/>
                    </div>
                    <div>
                        <label htmlFor="">Width (CM)</label>
                        <input type="text" id="width" onChange={handleChange} name="width"/>
                    </div>
                    <div>
                        <label htmlFor="">Length (KG)</label>
                        <input type="text" id="length" onChange={handleChange} name="length"/>
                    </div>
                    </>
                    <span>Please provide weight in HxWxL format <b>*</b></span>
                </div> :
                <div></div>

            }

        </div>
    </form>
    <hr/>
    <div className='footer'>
        <span>scandiweb test assignment</span>
    </div>
    </>
  )
}

export default AddProd