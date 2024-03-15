import { useEffect, useState} from 'react'
import { useNavbar, useParams} from 'react-router-dom/dist'
import { deleteItem, SingleItem} from '../API'

export default function SingleItem() {
    const navbar = useNavbar()

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
            <img src={item.imageUrl} />
             {item.name}
        </h2>
        <h3>{item.brand}</h3>
        <button onClick={() => deleteHandler(id)}>DELETE!</button>
    </article>

}
