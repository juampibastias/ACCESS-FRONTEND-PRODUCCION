import Head from 'next/head'
import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import valid from '../utils/valid'
import {DataContext} from '../store/GlobalState'
import {postData} from '../utils/fetchData'
import { useRouter } from 'next/router'


const Register = () => {
  const initialState = { name: '', phone: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = useState(initialState)
  const { name, phone, email, password, cf_password } = userData

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
    const errMsg = valid(name, phone, email, password, cf_password)
    if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await postData('auth/register', userData)
    
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

    return(
      <div>
        <Head>
          <title>Registrate en nuestro sitio</title>
          <link rel='shortcut icon' href='/images/favicon.ico'></link>
        </Head>
        <h1 style={{ textAlign: "left", marginLeft: "5%", fontWeight: "bold"}}>
          Registrate
        </h1>
        <hr style={{width:"90%", border: "1px solid"}}/>
        <form className="mx-auto signin-form" style={{maxWidth: '400px', margin:"10rem 0",  textAlign: "center"}} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name"></label>
            <input type="text" className="form-control" id="name"
            name="name"  placeholder='Nombre' value={name} onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="phone"></label>
            <input type="text" className="form-control" id="phone"
            name="phone"  placeholder='Teléfono' value={phone} onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email"  placeholder='Email' value={email} onChange={handleChangeInput} />
            <small id="emailHelp" className="form-text text-muted">Nunca compartiremos tu correo electrónico con nadie más.</small>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1"></label>
            <input type="password" className="form-control" id="exampleInputPassword1"
            name="password" placeholder='Contraseña' value={password} onChange={handleChangeInput} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword2"></label>
            <input type="password" className="form-control" id="exampleInputPassword2"
            name="cf_password" placeholder='Confirma tu contraseña' value={cf_password} onChange={handleChangeInput} />
          </div>
          
          <button type="submit" className="btn sign" 
          style={{fontWeight:'bold' ,borderRadius:'3rem' ,fontSize:'1.3rem',width:"10rem", backgroundColor:"#8268c1"}}>Registrate</button>

          <p className="my-2">
            Ya tienes una cuenta? <Link href="/signin"><a style={{color: 'crimson'}}>Ingresar ahora</a></Link>
          </p>
        </form>
      </div>
    )
  }
  
  export default Register