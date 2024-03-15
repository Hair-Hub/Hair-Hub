import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllItems } from '../API'
import { createItem } from '../../server/db/items'

export default async function AllItems() {
    const navigate = useNavigate()
    const [items, setItmes] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        try {
            const Items = await AllItems()
            console.log('items', Items)
            setItmes(items)
        } catch (e) {
            console.log(e)
        }
    }
    updateItems()
)
}