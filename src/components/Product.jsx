import React from 'react'
import './product.css'

const Product =React.forwardRef(({handleChange,sku,prodName,price,switcher,size,lengths,height,weights,width},ref) => {
  

  return (
    <div className='product delete-checkbox' ref={ref}>
        <input type="checkbox" onChange={handleChange} />
        <div className="product__items">
            <span value={sku}>{sku}</span>
            <span>{prodName}</span>
            <span>{price}$</span>
            {
              (switcher === "DVD") ? 
              <span>Size: {size}MB</span>: (switcher === "BOOK") ?
              <span>Weight: {weights}KG</span> : (switcher === "FURNITURE") ?
              <span>Dimension: {height+"x"+width+"x"+lengths}</span> 
              :<span></span>
            }
        </div>
    </div>
  )
})

export default Product