import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";
import axios from "axios";
import path from "path";
import fsPromises from "fs/promises";

//Variables para axios mercadopago
let itemMp;
let itemMpArray = [];
let totalConEnvio;
let filePath;

let jsonData;

let objectData = [];

const Cart = (props) => {
  const nombresProvincias = props.provincias.map((tarifa) => tarifa.nombre);
  const costoProvincias = props.provincias.map((tarifa) => tarifa.costo);


  const cartSelect = props.provincias
    .slice(1, props.provincias.length)
    .map((tarifa) => tarifa.nombre);
  const [tarifaProvincia, setTarifaProvincia] = useState(0);

  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);

  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [address, setAddress] = useState("");
  const [cp, setCp] = useState("");
  const [mobile, setMobile] = useState("");
  const [coment, setComent] = useState("");
  const [color, setColor] = useState("");
  const [callback, setCallback] = useState(false);
  const router = useRouter();

  const handlerTarifaProvincia = function (e) {
    const option = e.target.value;

    setTarifaProvincia(option);
  };

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart01__devat"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  const handlePayment = async () => {
    if (
      !provincia ||
      !ciudad ||
      !address ||
      !mobile ||
      !coment ||
      !color ||
      !cp
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Por favor, complete los datos de envío." },
      });

    let newCart = [];
    while (itemMpArray.length > 0) {
      itemMpArray.pop();
    }
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }

      itemMp = {
        title: item.title,
        unit_price: totalConEnvio,
        quantity: item.quantity,
      };

      itemMpArray.push(itemMp);
    }
    //llamada a api de mercadopago
    axios
      .post("https://api-mp-access-test.herokuapp.com/payment", {
        data: itemMpArray,
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        window.open(response.data.data, "_self");
      });

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "El producto está agotado o la cantidad es insuficiente.",
        },
      });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    postData(
      "order",
      { provincia, ciudad, address, cp, mobile, coment, color, cart, total },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({ type: "ADD_CART", payload: [] });

      const newOrder = {
        ...res.newOrder,
        user: auth.user,
      };
      dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return router.push(`/order/${res.newOrder._id}`);
    });
  };

  //flechita toggle envio

  if (cart.length === 0)
    return (
      <div>
        <h1 style={{ textAlign: "left", marginLeft: "5%", marginTop: "3rem", fontSize: "1.2rem", fontWeight: "bold" }}>
          Carrito de Compras
        </h1>
        <hr style={{ width: "90%", border: "1px solid" }} />
        <h3 style={{ fontWeight: "bold", textAlign: "center", margin: "21rem 0" }}>
          <p>El carrito está vacío</p>
          <Link href="/tienda">
            <a style={{
              fontSize: "1.2rem",
              textDecoration: "underline"
            }}>
              Seguir navegando
            </a>
          </Link>
        </h3>
      </div>

    );

  return (
    <div className="contenedor-carrito">
      <Head>
        <title>MI CARRITO</title>
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
      </Head>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="home">Inicio</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Carrito
          </li>
        </ol>
      </nav>
      <Head>
        <title>Carrito</title>
      </Head>

      <div className="contenedor-carro-envio">
        <div className="contenedor-carro-envio__table contenedor-carro-envio__table-1" /* style={{ width: '55%' }} */>
          <h1 style={{ textAlign: "left", fontWeight: "bold" }}>
            Carrito de compras
          </h1>
          {/* <hr style={{ marginTop:'2rem', width: "100%", border: "1px solid" }} /> */}
          <div className="contenedor-articulos">
            <div className=" text-secondary table-responsive my-3">
              <div className="table my-3">
                <div className="tbody">
                  {cart.map((item) => (
                    <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contenedor-carro-envio__table contenedor-carro-envio__table-2">
          <h1 style={{ textAlign: "left", fontWeight: "bold" }}>
            Resumen
          </h1>
          <hr style={{ marginTop: '2rem', width: "100%", border: "1px solid" }} />
          <div className="contenedor-envio-subtotal">

            <div className="contenedor-envio">
              <form>
                <div className="grid-resumen">

                  {/* provincia */}
                  <div className="acomodador-input">
                    <label htmlFor="provincia">Provincia</label>
                    {/* <select
                      name="provincia"
                      id="provincia"
                      className="form-control mb-2"
                      onChange={(e) => setProvincia(e.target.value)}
                    >
                      {cartSelect.map((item, i) => (
                        <option value={i[0]}>{item}</option>
                      ))}
                    </select> */}
                    <select
                    name="provincia"
                    id="provincia"
                    className="form-control mb-2"
                    onChange={(e) => setProvincia(e.target.value)}
                    onClick={handlerTarifaProvincia}
                  >
                    {nombresProvincias.map((item, i) => (
                      <option value={i}>{item}</option>
                    ))}
                  </select> 
                  </div> 


                  {/* codigo postal */}
                  <div className="acomodador-input">
                    <div className="item-cp">
                      <label htmlFor="cp">Código postal</label>
                      <input
                        type="text"
                        name="cp"
                        id="cp"
                        className="form-control mb-2"
                        value={cp}
                        onChange={(e) => setCp(e.target.value)}
                        placeholder=""
                        pattern="[0-9]{4}"
                        autoComplete="on"
                      />
                    </div>
                  </div>


                  {/* ciudad */}
                  <div className="acomodador-input">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      id="ciudad"
                      className="form-control mb-2"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      placeholder=""
                      autoComplete="on"
                    />
                  </div>


                  {/* direccion */}

                  <div className="acomodador-input">
                    <div className="item-cp">
                      <label htmlFor="address">Dirección</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="form-control mb-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Calle y número"
                        autoComplete="on"
                      />
                    </div>
                  </div>

                  {/* comentarios */}
                  <div className="acomodador-input">
                    <label htmlFor="coment">Indicación adicional</label>
                    <input
                      type="text"
                      name="coment"
                      id="coment"
                      placeholder="Entre calles, horario, etc"
                      className="form-control mb-2"
                      value={coment}
                      onChange={(e) => setComent(e.target.value)}
                    />

                  </div>

                  {/* telefono */}
                  <div className="acomodador-input">
                    <label htmlFor="mobile">Teléfono</label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      className="form-control mb-2"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Cod area + num"
                      autoComplete="on"
                    />

                  </div>
                </div>
              </form>


              <form>
                <label htmlFor="color">Color del producto</label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  placeholder="rojo, verde, azul..."
                  className="form-control mb-2"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </form>

              <div className="contenedor-subtotal">
                <div className="subtotal-item">
                  <h4>Subtotal</h4>
                  <h4>$ {total}</h4>
                </div>
                <div className="subtotal-item">
                  <div className="text-containers">
                    <label htmlFor="provincia">Envío</label>
                    <h4>$ {costoProvincias[tarifaProvincia]}</h4>
                  </div>
                  {/* <select
                    name="provincia"
                    id="provincia"
                    className="form-control mb-2"
                    onChange={(e) => setProvincia(e.target.value)}
                    onClick={handlerTarifaProvincia}
                  >
                    {nombresProvincias.map((item, i) => (
                      <option value={i}>{item}</option>
                    ))}
                  </select> */}
                </div>
              </div>
              <h3>
                Total:{" "}
                <span className="text-danger">
                  ${(totalConEnvio = total + costoProvincias[tarifaProvincia])}
                </span>
              </h3>
            </div>
            <div className="contenedor-boton">
              <Link href="/tienda">
                <a className="btn add-to-cart my-2">Seguir comprando</a>
              </Link>

              <Link href={auth.user ? "#!" : "/signin"}>
                <a style={{
                  backgroundColor: 'rgb(130, 104, 193)',
                  color: 'rgb(0, 0, 0)',
                  fontWeight: 600,
                  padding: '1rem 2rem',
                  borderRadius: '3rem',
                  textDecoration: 'none'
                }} onClick={handlePayment}>
                  Iniciar pago
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  filePath = path.join(process.cwd(), "costoEnvio.json");

  jsonData = await fsPromises.readFile(filePath);

  objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };

}

export default Cart;
