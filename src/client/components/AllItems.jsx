import { useEffect, useState } from 'react';
import axios from 'axios'

export default function AllItemsComponent() {
    
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items'); // Adjust the endpoint as needed
                console.log('items', response.data);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []); // Empty dependency array to run effect only once
    
    //const button = document.createElement('button')
   // button.innerText = 'Search'
    //button.id = 'searchButton'
   // document.body.appendChild(button)
    
    return (
        <div>
            <h1>Product Gallery</h1>
            <div class="search-bar">
                <input
                    id='search'
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="What are you looking for..."
                    list='search-suggestions'
                    autoComplete='on'
                />
                <datalist id='search-suggestions'>
                    <option value='shampoo'></option>
                    <option value='conditioner'></option>
                    <option value='gel'></option>
                </datalist>

                <div class='search-button'>
                <button>Search</button>
                </div>
                

            </div>

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <h2 onClick={() => Navigate('/items/${item.id}')}>
                        <img src={item.picture} alt={item.name} />
                        {item.name}</h2>
                        <p>{item.description}</p>
                        <p>Brand: {item.brand}</p>
                        <p>Category: {item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}