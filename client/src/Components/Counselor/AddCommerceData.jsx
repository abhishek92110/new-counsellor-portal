import React, { useState } from 'react'

const AddCommerceData = () => {

    const [detail, setDetail] = useState({

        price:"",
        product:"",
        category:"",
        description:"",
        image:"",
        rate:"",
        count:"",
        productname:"",
        age:"",
        brand:"",
        type:"",
        title:"",

    })

    const [category, setCategory] = useState("Accessory")

    const addData = async()=>{
        console.log('data =',detail)

        let addData = await fetch('http://localhost:5000/api/product/Addproducts',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(detail)
        })
        
     
    }

  return (
    <>
    <div>AddCommerceData</div>


    <div className='container product-conatiner'>

<div className='dropdown'>
        <select name='category' onChange={e=>{setDetail({...detail,[e.target.name]:e.target.value});setCategory(e.target.value)}}>
        <option disabled selected>Category</option>
        <option value='Accessory'>Accessory</option>
        <option value='Toy'>Toy</option>
        <option value='Diaper'>Diaper</option>
        <option value='stroller'>stroller</option>
        <option value='Cot'>Cot</option>
        <option value='Jacket'>Jacket</option>
        </select>

        <select name='product' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value,["title"]:e.target.value})}>
            {category==="Accessory" && <>
            <option disabled selected>product</option>
                       <option value="Used Breast Pump">Used Breast Pump</option>
                       <option value="Baby Bed With Net">Baby Bed With Net </option>
                       <option value="Baby Cradle Automatic Swing">Baby Cradle Automatic Swing</option>
                       <option value="Mothertouch Walker">Mothertouch Walker</option>
                       <option value="Babyhug Car Seat">Babyhug Car Seat</option>
                       <option value="Cradle Swing">Cradle Swing</option>
                       <option value="Electric Cradle">Electric Cradle</option>
                       <option value="Electric Baby Swing">Electric Baby Swing</option>
                       <option value="Baby Bassinet">Baby Bassinet</option>
                       <option value="Baby palna">Baby palna</option>
                       <option value="Baby Bouncer and Rocker">Baby Bouncer and Rocker</option>
                       <option value="Baby Booster Chair">Baby Booster Chair</option>
                       </>}

                       {category==="Toy" && <>
            <option disabled selected>product</option>
                       <option value="Prongo Educational">Prongo Educational</option>
                       <option value="Car Bed For Kids">Car Bed For Kids</option>
                       <option value="Baby House Toy">Baby House Toy</option>
    
                       </>}

                       {category==="Diaper" && <>
            <option disabled selected>product</option>
                       <option value="xxxl Diapers">xxxl Diapers</option>
                       <option value="Car Bed For Kids">Car Bed For Kids</option>
                       <option value="Baby House Toy">Baby House Toy</option>
    
                       </>}
                       {category==="Cot" && <>
            <option disabled selected>product</option>
            
                       <option value="Wooden Baby Cot">Wooden Baby Cot</option>
                       
                       </>}
                       {category==="Jacket" && <>
            <option disabled selected>product</option>
            
            
                       <option value="Baby Girl Jacket">Baby Girl Jacket</option>
                       
                       </>}
                       {category==="stroller" &&
                        <>
            <option disabled selected>product</option>
            
            
                       <option value="Baby Stroller Under 1000">Baby Stroller Under 1000</option>
                       <option value="Babyhug Stroller">Babyhug Stroller</option>
                       
                       </>}
        </select>
        <select name='age' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}>
            <option disabled selected>age</option>
            <option value="0-1">0-1</option>
                       <option value="2-1">2-1</option>
                       <option value="2-3">2-3</option>
                       <option value="3-4">3-4</option>
                       <option value="4+">4+</option>
        </select>
        </div>

<input placeholder='price' name='price' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='product' name='product' value={detail.product}></input>
<input placeholder='category' name='category' value={detail.category}></input>
<input placeholder='description' name='description' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='image' name='image' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='rate' name='rate' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='count' name='count' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='productname' name='productname' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='age' name='age' value={detail.age}></input>
<input placeholder='brand' name='brand' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='type' name='type' onChange={e=>setDetail({...detail,[e.target.name]:e.target.value})}></input>
<input placeholder='title' name='title' value={detail.product}></input>

    </div>

    <button className='btn btn-primary' onClick={addData}>Add</button>
    </>
  )
}

export default AddCommerceData