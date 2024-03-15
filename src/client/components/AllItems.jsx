import { useEffect, useState } from 'react'
import { useNavbar } from 'react-router-dom'
import { AllItems } from '../API'


export default function AllItems() {
    const navbar = useNavbar()
    const [items, setItmes] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        try {
            const Items = await AllItems()
            console.log('items', Items)
            setItmes(items)
        }
    }
}