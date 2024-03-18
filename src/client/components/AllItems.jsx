/*import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { AllItems } from '../API'
//import { createItem } from '../../server/db/items'
import items from '../../server/db/seed'

export default async function AllItems() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function updateItems() {
            try{
                const products = await axios.get(items)
                setProducts(products)
            } catch (e) {
                console.error(e)
            }
        }  
            updateProducts()
    }, [])

    function searchHandler(e) {
        console.log('e.target.value', e.target.value)
        setSearch(e.target.value)
    }
    
}*/

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

    return (
        <div>
            <h1>All Items</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items..."
            />
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <img src={item.picture} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Brand: {item.brand}</p>
                        <p>Category: {item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}