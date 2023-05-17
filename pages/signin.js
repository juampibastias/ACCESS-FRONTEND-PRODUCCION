import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const {state, dispatch} = useContext(DataContext)
  const { auth } = state

  const router = useRouter()

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]:value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await postData('auth/login', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    dispatch({ type: 'NOTIFY', payload: {success: res.msg} })

    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    }})

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>Ingrese a la página</title>
        </Head>
        <h1 style={{ textAlign: "left", marginLeft: "5%", fontWeight: "bold"}}>
          Iniciar sesión
        </h1>
        <hr style={{width:"90%", border: "1px solid"}}/>
        <form className="mx-auto signin-form" style={{maxWidth: '450px', margin:"13rem 0" , textAlign: "center"}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" placeholder='Email' value={email} onChange={handleChangeInput} required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1"></label>
            <input type="password" placeholder="Contraseña" className="form-control" id="exampleInputPassword1"
            name="password" value={password} onChange={handleChangeInput} required />
          </div>
          
          <p style={{textAlign:"center",margin:"3rem"}}>
            No tienes una cuenta? <Link href="/register"><a style={{textDecoration:"underline"}}>Registrate ahora</a></Link>
          </p>
          
          <button type="submit" className="btn sign" style={{ fontWeight:'bold' ,borderRadius:'3rem' ,fontSize:'1.3rem',width:"8rem", backgroundColor:"#8268c1"}}>Entrar</button>          
        </form>
      </div>
    )
  }
  
  export default Signin