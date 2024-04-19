import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


export default function addItemForm() {


const [name, setName] = useState()
const [brand, setBrand] = useState()
const [category, setCategory] = useState()
const [description, setDescription] = useState()
const [picture, setPicture] = useState()

async function handleSubmit(e) {
    e.preventDefault()

    try {
        const response = await axios.post('/api/items/additem', {
            name,
            brand,
            category,
            description,
            picture,
        });
        const data = response.data;
        console.log(data);
        
        //setToken(data.token);
        setName('')
        setBrand('')
        setCategory('')
        setDescription('')
        setPicture('')
    } catch(error) {
        // Handle error response
       if (error.response) {
         console.log('Server responded with non-success status code');
          console.log('Status:', error.response.status);
          console.log('Data:', error.response.data);
        } else if (error.request) {
          console.log('Request made but no response received');
          console.log('Request:', error.request);
        } else {
          console.log('Error setting up request');
          console.log('Error:', error.message);
        }
      }
}

return <form onSubmit={handleSubmit}>
    <h1>Add Product</h1>
    <div>
    <label>Name</label>
    <input
    name='name'
    type='text'
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder='Add Product Name'/>
    </div>
    
    <div>
    <label>Brand</label>
    <input name='brand'
    type='text'
    value={brand}
    onChange={(e) => setBrand(e.target.value)} />
    </div>
    
    <div>
    <label>Description</label>
    <input name='description' 
    type='text' 
    value={description}
    onChange={(e) => setDescription(e.target.value)} />
    </div>
    
    <div>
    <label>Category</label>
    <input 
    name='category'
    type='search'
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    list='add-category'
    autoComplete='off'/>
        <datalist id="add-category">
            <option value="shampoo"></option>
            <option value="conditioner"></option>
        </datalist>
    </div>
    
    <div>
    <label>Picture</label>
    <input 
    name='picture'
    type='url'
    value={picture}
    onChange={(e) => setPicture(e.target.value)}
    placeholder='Add Product Image'/>
    </div>
    
    <button type='submit'>Add</button>
</form>
}