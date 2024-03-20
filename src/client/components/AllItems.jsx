
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function AllItemsComponent() {
    
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items'); 
                console.log('items', response.data);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []); 

    return (
        <div className="search-bar">
            <h1>Product Gallery</h1>
            <input
                id='search'
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What are you looking for..."
                list="search-suggestions"
                autoComplete="off"
            />
            <list id="search-suggestions">
                <option value="shampoo"></option>
                <option value="conditioner"></option>
            </list>
        
      

            <div className="items-container">
                {items.map((item) => (
                    <Link to= {`/item/${item.id}`} key={item.id}>
                    <div className="item-card" key={item.id}>
                        <img className="item-image" src={item.picture} alt={item.name} />
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>Brand: {item.brand}</p>
                            <p>Category: {item.category}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}