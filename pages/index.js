import React from "react";
import Head from "next/head";
import Image from "next/image";
import banner_eps from "../public/banner_epson.png";
import banner_eps__responsive from "../public/banner_epson__responsive.png";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
import ProductHome from "../components/product/ProductHome";
import { useRouter } from "next/router";
import useWindowSize from "../components/getwindowSize";
import Servicios from "./servicios";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);
/*   const [novedades, setNovedades] = useState(props.novedades);
 */
  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const size = useWindowSize();

  const lastThreeProducts = products.slice(0,3);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: "",
          id: product._id,
          title: "Eliminar todos los productos seleccionados?",
          type: "DELETE_PRODUCT",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  const handleLoadmore = () => {};
  return (
    <div className="contenedor-home">
      <Head>
        <title>HOME</title>
      </Head>
      {/* <Carousel fade prevLabel="" nextLabel="">
        <Carousel.Item>
          {size.width < 760 ? (
            <Image
              className="d-block w-100"
              src={banner1Mobile}
              alt="First slide"
            />
          ) : (
            <Image className="d-block w-100" src={banner1} alt="First slide" />
          )}
        </Carousel.Item>
        <Carousel.Item>
          {size.width < 760 ? (
            <Image
              className="d-block w-100"
              src={banner1Mobile}
              alt="First slide"
            />
          ) : (
            <Image className="d-block w-100" src={banner3} alt="First slide" />
          )}
        </Carousel.Item>
        <Carousel.Item>
          {size.width < 760 ? (
            <Image
              className="d-block w-100"
              src={banner2Mobile}
              alt="Second slide"
            />
          ) : (
            <Image className="d-block w-100" src={banner2} alt="Second slide" />
          )}
        </Carousel.Item>
        <Carousel.Item>
          {size.width < 760 ? (
            <Image
              className="d-block w-100"
              src={bannerMobile}
              alt="Third slide"
            />
          ) : (
            <Image className="d-block w-100" src={banner} alt="Third slide" />
          )}
        </Carousel.Item>
      </Carousel> */}
      <div className="d-none d-sm-none d-md-block w-100">
        <Image className="w-100" src={banner_eps} alt="First slide" />
      </div>
      <div className="d-bock d-sm-block d-md-none w-100">
        <Image className="w-100" src={banner_eps__responsive} alt="First slide" />
      </div>

      {auth.user && auth.user.role === "admin" && (
        <div
          className="delete_all btn btn-danger mt-2"
          style={{ marginBottom: "10px", marginLeft: "10px" }}
        >
          <input type="checkbox" checked={isCheck} onChange={handleCheckALL} />

          <button
            className="btn btn-danger ml-2"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleDeleteAll}
          >
            Borrar todo
          </button>
        </div>
      )}

      {/* <SeparatorImage imagen={separatorImg} imagen2={separatorImg2} imagen3={separatorImg3}  title="aah"/> */}

      <div className="featured mt-5 mt-md-auto">
        <h2><b>Nuevos Ingresos</b></h2>
        <div className="featured-items">
          {products.length === 0 ? (
            <h2>No hay productos</h2>
          ) : (
            lastThreeProducts.map((product) => (
              <ProductHome
                key={product._id}
                product={product}
                handleCheck={handleCheck}
              />
            ))
          )}
        </div>
      </div>
      <Servicios />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=${
      page * 4
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;

/* EN LOS PRODUCTOS CARDS QUE APARECEN EN LA HOME SOLO NECESITAMOS LAS PROPS DE IMAGE, TITLE, PRECIO, DESCRIPTION, SOLO DEBEN SER 4 
CARDS, Y SERAN LAS PRIMERAS 4 QUE APAREZCAN EN LA SECCION TIENDA  */
