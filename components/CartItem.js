import Link from 'next/link'
import { decrease, increase } from '../store/Actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const CartItem = ({ item, dispatch, cart }) => {
    return (
        <div className="tr">
            <hr style={{ marginTop: '0rem', width: "95%", border: "1px solid" }} />
            <div className="tr2">
                <div className='table-product' >
                    <img src={item.images[0].url} alt={item.images[0].url}
                        className="img-thumbnail "
                    />

                </div>
                <div className='text-details'>
                    <h5>
                        <Link href={`/product/${item._id}`}>
                            <a>{item.title}</a>
                        </Link>
                    </h5>
                    <h6 className='table-price'> ${item.price}</h6>
                </div>
                <div className="contador" >
                    <button className="btn btn-outline-secondary"
                        onClick={() => dispatch(decrease(cart, item._id))}
                        disabled={item.quantity === 1 ? true : false} > - </button>

                    <span className="px-3">{item.quantity}</span>

                    <button className="btn btn-outline-secondary"
                        onClick={() => dispatch(increase(cart, item._id))}
                        disabled={item.quantity === item.inStock ? true : false} > + </button>
                </div>

                <div className="table-total">

                    <h5 >${item.quantity * item.price}</h5>
                    {
                        item.inStock > 0
                            ? <p className="mb-1 text-primary"></p>
                            : <p className="mb-1 text-danger">Sin Stock</p>
                    }
                </div>
                <div className="table-edit" >
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true"
                        style={{ cursor: 'pointer', fontSize: '20px', color: '#9E9E9E' }} data-toggle="modal" data-target="#exampleModal"
                        onClick={() => dispatch({
                            type: 'ADD_MODAL',
                            payload: [{ data: cart, id: item._id, title: item.title, type: 'ADD_CART' }]
                        })} />
                </div>
            </div>
        </div>
    )
}

export default CartItem