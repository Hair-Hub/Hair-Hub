import { useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom/dist'
//import { deleteItem, SingleItem} from '../api'
//import { createItem } from '../../server/db/items'

export default function SingleItem() {
    const navbar = useNavigate()

    const { id } = useParams
    const [item, setItem] = useState(null)

    useEffect(() => {
        async function updateItem() {
            try {
                const item = await SingleItem(id)
                setItem(item)
            } catch (e) {
                console.error(e)
            }
        }
        updateItem()
    }, [])

    async function deleteHandler(itemId) {
        await deleteItem(itemId)

        navbar('/')
    }

    return <article key={item.id}>
        <h2>
            <img src={item.picture} />
             {item.name}
        </h2>
        <h3>{item.brand}</h3>
        <button onClick={() => deleteHandler(id)}>DELETE!</button>
    </article>

}
