import React, { useState, useEffect } from 'react'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'

const Filter = ({ state }) => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const { categories } = state

    const router = useRouter()

    useEffect(() => {

    }, [])

    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({ router, category: e.target.value })
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({ router, sort: e.target.value })
    }

    useEffect(() => {
        filterSearch({ router, search: search ? search.toLowerCase() : 'all' })
    }, [search])

    return (
        <div className="contenedor-filtros">

            { /*<form autoComplete="off" className=" col-md-4 px-0 buscador-artic">
                <label>
                <input type="text" placeholder='Buscá tu producto' className="form-control" list="title_product"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
                </label>
                
    </form> */}
            <div className=" px-0 categorias">
                <select className="custom-select text-capitalize"
                    value={category} onChange={handleCategory}>
                    <option value="all">Todo</option>

                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id} >
                                {item.name.charAt(0) + item.name.slice(1).toLowerCase()}
                            </option>
                        ))
                    }
                </select>

            </div>



            <div className="   selector-sort">

                <select className="custom-select text-capitalize "
                    value={sort} onChange={handleSort}>
                    <option value="-createdAt">Ultimos</option>
                    <option value="oldest">Ofertas</option>
                    <option value="-sold">Mas vendidos</option>
                    <option value="-price">Precio alto</option>
                    <option value="price">Precio bajo</option>

                </select>

            </div>


        </div>
    )
}

export default Filter
