import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { Container } from 'react-bootstrap'

const ProductItem = ({ product, handleCheck }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    const [descriptionLength, setDescriptionLength] = useState(30);

    const userLink = () => {
        return (
            <>
                <button className="btn add-to-cart"
                    style={{ marginLeft: '5px', flex: 1 }}
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))} >
                </button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                <Link href={`create/${product._id}`}>
                    <button className="btn btn-info"
                        style={{ marginRight: '5px', flex: 1 }}> Editar
                    </button>
                </Link>

                <button className="btn btn-danger"
                    style={{ marginLeft: '5px', flex: 1 }}
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{
                            data: '', id: product._id,
                            title: product.title, type: 'DELETE_PRODUCT'
                        }]
                    })} >
                    Eliminar
                </button>
            </>
        )
    }

    useEffect(() => {
        function handleResize() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 576) {
                setDescriptionLength(35);
            }
            else if (screenWidth < 700) {
                setDescriptionLength(17);
            }
            else if (screenWidth < 900) {
                setDescriptionLength(25);
            }
            else if (screenWidth < 1280) {
                setDescriptionLength(33);
            }
            else if (screenWidth < 1500) {
                setDescriptionLength(35);
            }
            else if (screenWidth < 1720) {
                setDescriptionLength(45);
            } else {
                setDescriptionLength(60);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="card">
            {auth.user && auth.user.role === 'admin' && (
                <input
                    type="checkbox"
                    checked={product.checked}
                    className="position-absolute"
                    style={{ height: '20px', width: '20px' }}
                    onChange={() => handleCheck(product._id)}
                />
            )}
            <Link href={`product/${product._id}`}>
                <Container className='cont-img' style={{ minWidth: '10vw', minHeight: '55vh' }}>
                <a>
                    <img 
                        className="card-img-top"
                        src={product.images[0].url}
                        alt={product.images[0].url}
                        style={{ aspectRatio: "auto" }}
                    />
                </a>
                </Container>
            </Link>
            <div className="card-body">
                <hr style={{ width: '100%', border: '1px solid' }} />
                <Link href={`product/${product._id}`}>
                    <a>
                        <h5 className="card-title text-capitalize" title={product.title}>
                            {product.title}
                        </h5>
                    </a>
                </Link>
                <p className="card-text" title={product.description}>
                    {product.description.length > descriptionLength
                        ? `${product.description.slice(0, descriptionLength)}...`
                        : product.description}
                </p>
                <p style={{ fontSize: '1.8rem',fontWeight:'bold'}}>{"$" + product.price}</p>

                <div className="row justify-content-between mx-0">
                    <h6 hidden className="text-danger">
                        ${product.price}
                    </h6>
                    <div className='px-4'></div>
                    {product.inStock > 0 ? (
                        <h6 hidden className="text-danger">
                            En Stock: {product.inStock}
                        </h6>
                    ) : (
                        <h6
                            style={{
                                userSelect: 'none',
                                bottom: '3.8rem',
                                left: '152px',
                                right: '10px',
                                fontWeight: 'bold',
                                position: 'absolute',
                                zIndex: '100',
                            }}
                            className="text-danger"
                        >
                            Stock agotado
                        </h6>
                    )}
                </div>

                <div className="mt-auto">
                    {!auth.user || auth.user.role !== 'admin'
                        ? userLink()
                        : adminLink()}
                </div>
            </div>
        </div>
    )
}


export default ProductItem