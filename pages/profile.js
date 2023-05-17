import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link'

import valid from '../utils/valid'
import { patchData } from '../utils/fetchData'

import {imageUpload} from '../utils/imageUpload'

const Profile = () => {
    const initialSate = {
        avatar: '',
        name: '',
        phone: '',
        password: '',
        cf_password: ''
    }
    const [data, setData] = useState(initialSate)
    const { avatar, name, phone, password, cf_password } = data

    const {state, dispatch} = useContext(DataContext)
    const { auth, notify, orders } = state

    useEffect(() => {
        if(auth.user) setData({...data, name: auth.user.name})
    },[auth.user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleUpdateProfile = e => {
        e.preventDefault()
        if(password){
            const errMsg = valid(name, phone, auth.user.email, password, cf_password)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
            updatePassword()
        }

        if(name !== auth.user.name || avatar) updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
        })
    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if(!file)
            return dispatch({type: 'NOTIFY', payload: {error: 'File does not exist.'}})

        if(file.size > 1024 * 1024) //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'The largest image size is 1mb.'}})

        if(file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({type: 'NOTIFY', payload: {error: 'Image format is incorrect.'}})
        
        setData({...data, avatar: file})
    }

    const updateInfor = async () => {
        let media;
        dispatch({type: 'NOTIFY', payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar])

        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({type: 'AUTH', payload: {
                token: auth.token,
                user: res.user
            }})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    if(!auth.user) return null;
    return( 
        <div className="profile_page">
            <Head>
                <title>Perfil</title>
            </Head>

            <h1 style={{ textAlign: "left", marginLeft: "7rem", fontWeight: "bold"}}>
                Perfil
            </h1>
            <hr style={{width:"90%", border: "1px solid"}}/>

            <section className="profile_contenedor" style={{display:'flex', flexWrap:'wrap',flexDirection: 'row',justifyContent:'center'}} >
                <div className="contenedor-data-profile">
                    <h3 className="text-center name">
                    {auth.user.role === 'user' ? "Hola " + name.charAt(0).toUpperCase() + name.slice(1) + "!" : 'Admin Profile'}

                    </h3>

                    <div className="avatar">
                        <img style={{borderColor:'none'}}src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                        alt="avatar" />
                        <span style={{backgroundColor:'white'}}>
                            <i className="fas fa-camera" style={{color:'#8268c1'}}></i>
                            <p style={{color:'#8268c1'}}>CAMBIAR</p>
                            <input type="file" name="file" id="file_up"
                            accept="image/*" onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        
                        <input type="text" name="name" value={name} className="form-control"
                        placeholder="NOMBRE" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <input type="text" name="phone" value={auth.user.phone} className="form-control"
                        placeholder="TELEFONO" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">EMAIL</label>
                        <input type="text" name="email" defaultValue={auth.user.email} 
                        className="form-control" disabled={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input type="password" name="password" value={password} className="form-control"
                        placeholder="NUEVA CONTRASEÑA" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password"></label>
                        <input type="password" name="cf_password" value={cf_password} className="form-control"
                        placeholder="CONFIRME NUEVA CONTRASEÑA" onChange={handleChange} />
                    </div>

                    <button className="btn sign"  style={{width:"8rem"}} disabled={notify.loading}
                    onClick={handleUpdateProfile}>
                        Actulizar
                    </button>
                </div>

                <div className="contenedor-tabla-profile" style={{width:"60% !important"}}>
                    <h3 className="">MIS COMPRAS</h3>

                    <div className="my-3 table-responsive">
                        <table className="table-bordered table-hover " style={{width:"90%"}}>
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">Día</td>
                                    <td className="p-2">Total</td>
                                    <td className="p-2">Entregado</td>
                                    <td className="p-2">Estado de pago</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={order._id}>
                                            <td className="p-2">
                                                <Link href={`/order/${order._id}`}>
                                                    <a>{order._id}</a>
                                                </Link>
                                                
                                            </td>
                                            <td className="p-2">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-2">${order.total}</td>
                                            <td className="p-2">
                                                {
                                                    order.delivered
                                                    ? <i className="fas fa-check text-success"></i>
                                                    : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                            <td className="p-2">
                                                {
                                                    order.paid
                                                    ? <i className="fas fa-check text-success"></i>
                                                    : <i className="fas fa-times text-danger"></i>
                                                }
                                            </td>
                                        </tr> 
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile