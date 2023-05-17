import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { useRouter } from 'next/dist/client/router'
import { Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Accordion from 'react-bootstrap/Accordion';
import VentanaContactos from '../../components/contactos'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const route = useRouter();

    const [activeIndex, setActiveIndex] = useState(0); // definir el estado de activeIndex

    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex); // actualizar el valor de activeIndex cuando cambia la imagen en el carousel
    };
    const [servicioAbierto, setServicioAbierto] = useState(null);

    const toggleServicio = (id) => {
        if (servicioAbierto === id) {
            setServicioAbierto(null);
        } else {
            setServicioAbierto(id);
        }
    };


    return (
        <div className="contenedor-pdp">
            <Head>
                <title>Detalle de Producto</title>
            </Head>
            <div className="pdp">
                <div className="contenedor-img-desc ">
                    <Carousel
                        activeIndex={activeIndex}
                        onSelect={handleSelect}
                        interval={null}
                        pause={false}
                        controls={true}
                        nextIcon={<FontAwesomeIcon icon={faChevronRight} style={{ color: 'black', fontSize: '3rem' }} />}
                        prevIcon={<FontAwesomeIcon icon={faChevronLeft} style={{ color: 'black', fontSize: '3rem' }} />}
                    >
                        {product.images.map((img, index) => (

                            <Carousel.Item key={index}>
                                <img
                                    src={img.url}
                                    alt={img.url}
                                    onClick={() => setTab(index)}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="text-pdp">
                    <div className="title-price">
                        <h1 className="text-capitalize" style={{fontSize:'2rem'}}><b>{product.title}</b></h1>
                        <h5 className="">${product.price}</h5>
                    </div>

                    <div className="row mx-0 d-flex justify-content-between stock-info">
                        {/* <div className='data-stock'>
                    {
                            product.inStock > 0
                            ? <h6 className="">En Stock: <b>{product.inStock}</b></h6>
                            : <h6 className=""><b>Sin Stock</b></h6>
                        }

                        <h6 className="">Vendidos:<b> {product.sold}</b></h6>
                    </div> */}
                        <h6 className="">Color: {product.color}</h6>

                    </div>



                    <div className='botonera'>
                        <button type="button" className="btn add-to-cart"
                            onClick={() => dispatch(addToCart(product, cart))} >
                            Añadir al carrito
                        </button>

                        {/* <button type="button" className="btn continue">
                        <a href='/'>Seguir comprando</a>
                    </button> */}
                    </div>
                    <div className="info">
                        <Accordion>
                            <Accordion.Item eventKey={1} key='1' id='itemProducto'>
                                <Accordion.Header onClick={() => { toggleServicio(1) }} style={{width:'auto'}}>
                                    <h3 style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        Descripción
                                        <FontAwesomeIcon icon={servicioAbierto === 1 ? faMinus : faPlus} style={{ marginLeft: "1rem", width: '1rem', cursor: 'pointer' }} /></h3>
                                </Accordion.Header>
                                <Accordion.Body style={{ fontWeight: '400', marginBottom: '1rem' }}>
                                    <p>{product.description}</p>
                                </Accordion.Body>
                            </Accordion.Item>

                            <hr style={{ border: "1px solid", margin: '.5rem 0' }} />

                            <Accordion.Item eventKey={2} key='2' id='itemProducto'>
                                <Accordion.Header onClick={() => { toggleServicio(2) }}>
                                    <h3 style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        Especificaciones técnicas
                                        <FontAwesomeIcon icon={servicioAbierto === 2 ? faMinus : faPlus} style={{ marginLeft: "1rem", width: '1rem', cursor: 'pointer' }} /></h3>
                                </Accordion.Header>
                                <Accordion.Body style={{ fontWeight: '400', marginBottom: '1rem' }}>
                                    <p>{product.content}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>



                    {/* <div className='social-share'>
                    <h4>Compartir +</h4>
                    <ul>
                        <li>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://access.com.ar`+route.asPath} target="_blank"><i className="fab fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href={`https://twitter.com/intent/tweet?text=Mira este producto! https://access.com.ar`+route.asPath} target="_blank"><i className="fab fa-twitter"></i></a>
                        </li>
                
                        <li>
                            <a href={`whatsapp://send?text=Mira este producto!:https://access.com.ar`+route.asPath}><i className="fab fa-whatsapp"></i></a>
                        </li>
                    </ul>
                </div> */}
                    <div>
                    </div>

                </div>
            </div>

            <VentanaContactos/>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {

    const res = await getData(`product/${id}`)
    // server side rendering
    return {
        props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailProduct