import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


export default function addItemForm() {
const navigate = useNavigate()

const [name, setName] = useState()
const [brand, setBrand] = useState()
const [category, setCategory] = useState()
const [description, setDescription] = useState()
const [picture, setPicture] = useState()

async function handleSubmit(e) {
    e.preventDefault()

    const itemObject ={

        name: name,
        brand: brand,
        category: category,
        description: description,
        picture: picture,
    }
    await addItemForm(itemObject);

    navigate('/api/items')
}

return <form onSubmit={handleSubmit}>
    <h1>Add Product</h1>
    <div>
    <label>Name</label>
    <input
    name='name'
    value={name}
    onChange={(e) => setBrand(e.target.value)}
    placeholder='Add Product Name'/>
    </div>
    
    <div>
    <label>Brand</label>
    <input name='brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
    </div>
    
    <div>
    <label>Description</label>
    <input name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
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