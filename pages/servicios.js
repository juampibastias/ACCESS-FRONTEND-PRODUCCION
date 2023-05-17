import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
//import Search from '../components/Search';
import Accordion from 'react-bootstrap/Accordion';
import artefactos from '../public/uploaded_servicios/servicios.json';
import VentanaContactos from "../components/contactos";


function Servicios() {
  const [servicioAbierto, setServicioAbierto] = useState(null);
  const [resultados, setResultados] = useState(null);

  function buscarArtefacto(e) {
    if (e) {
      e.preventDefault();
      const numero = e.target.numero.value;
      if (numero !== '') {
        const artefacto = artefactos.find(a => a.numero == numero);
        setResultados(artefacto);
      } else {
        estadoResultado();
      }
    }
  }

  function estadoResultado() {
    console.log("ESTADO RESULTADO");
    setResultados(null);
  }

  const vaciarInput = (id) => {
    const inputs = document
      .getElementsByClassName("servicios")[0]
      .querySelectorAll("input");
    const resultados = document.getElementById("resultados");
    if ((id) != 1) {
      inputs[0].value = "";
      estadoResultado();
    }
  }

  const toggleServicio = (id) => {
    if (servicioAbierto === id) {
      setServicioAbierto(null);
    } else {
      setServicioAbierto(id);
    }
  };

  const servicios = [
    {
      id: 1,
      titulo: "Servicio técnico",
      descripcion: <div className="formSearch contenedor-form-search">
        <p>Aquí podrás consultar el estado de reparacion de su equipo</p>
        <form method='post' action='#' onSubmit={buscarArtefacto} autoComplete="off" className="nav-buscador-artic">
          <label>
            <input type="text" id="numero" className="form-control searchHolder" placeholder="Ingrese su codigo" style={{ width: '100%', textAlign: 'center !important' }} />
          </label>
          {/* <button type="submit" className='btn btn-info' style={{ marginLeft: "5px", background: "#534080", borderColor: "#534080" }} >Buscar</button> */}
        </form>
        {resultados && (
          <div className="resultado">
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', marginTop: '1rem' }}>
              <h4>Estado:&nbsp;</h4>
              <h4 style={{ color: resultados.reparado ? 'green' : 'red' }}><b>{resultados.reparado ? ' finalizada' : ' en proceso'}</b></h4>
            </div>
            <ul>
              <li style={{ listStyle: 'none', fontSize: "17px" }}>
                Codigo ingresado: {resultados.numero}
              </li>
              {resultados.costoReparacion && (
                <li style={{ listStyle: 'none', fontSize: "17px" }}>
                  Costo de reparación: ${resultados.costoReparacion}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>,
      barra: <hr style={{ border: "1px solid", margin: '.5rem 0' }} />,

    },
    {
      id: 2,
      titulo: "Desarrollo de software a medida",
      descripcion: "Desarrollamos software personalizados y a medida para satisfacer las necesidades de nuestros clientes. Brindamos capacitación y soporte técnico para optimizar el uso del mismo y asegurar su correcta utilización. Además, ofrecemos mantenimiento y mejora continua para garantizar la eficiencia a largo plazo.",
      barra: <hr style={{ border: "1px solid", margin: '.5rem 0' }} />,
    },
    {
      id: 3,
      titulo: "Venta de equipos",
      descripcion: "Creamos PC personalizadas que se ajustan a las necesidades y presupuesto de cada cliente, permitiendo la libre elección de componentes. También brindamos asesoramiento en el proceso de selección y ofrecemos servicio técnico de reparación y mantenimiento en nuestro laboratorio, para garantizar el mejor funcionamiento de los productos tecnológicos.",
      barra: <hr style={{ border: "1px solid", margin: '.5rem 0' }} />,
    },
    {
      id: 4,
      titulo: "Sistemas de cámaras de seguridad",
      descripcion: "Ofrecemos soluciones de seguridad personalizadas para hogares y negocios. Incluye asesoramiento en la selección de cámaras y diseño del sistema, venta e instalación de equipos, capacitación en su uso, soporte técnico y mantenimiento continuo para garantizar su funcionamiento óptimo a largo plazo.",
      barra: <hr style={{ border: "1px solid", margin: '.5rem 0' }} />,
    },
    {
      id: 5,
      titulo: "Sistemas para empresas",
      descripcion: "GIDE: El sistema de gestión integral de empresas es un software completo que permite a las empresas administrar eficientemente sus ventas, compras, stock, finanzas y facturación electrónica. Bodegas, supermercados, restaurantes, estaciones de servicios, sanatorios médicos, facturación, puntos de ventas. Ayuda a las empresas a mantener un control sobre sus operaciones y finanzas, lo que les permite tomar decisiones y planificar para el futuro.",
      barra: <hr style={{ border: "1px solid", margin: '.5rem 0' }} />,
    },
    {
      id: 6,
      titulo: "Otros servicios",
      descripcion: "Reparación y mantenimiento de PC, notebooks, impresoras, sistemas de impresoras fiscales y redes. Soluciones de cableado, circuitos cerrados de TV, telefonía IP y configuración de software. Mantenimiento y actualización de software, detección de fallas en placas madre, recuperación de sistemas operativos basados en Windows. Limpieza física y eliminación de malware y virus, reemplazo de pantallas, teclados y Jack de carga, testeo y diagnóstico de hardware.",
    }
  ];

  return (
    <div className="contenedor-servicios">
      <div className="servicios">
        <Accordion>
          <h1 style={{ padding: '3rem 0', fontWeight: 'bold' }}><b>Servicios</b></h1>
          {servicios.map((servicio) => (
            <Accordion.Item eventKey={servicio.id} key={servicio.id}>
              <Accordion.Header onClick={() => { vaciarInput(servicio.id); toggleServicio(servicio.id) }}>
                <h3 style={{ padding:'1rem',width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{servicio.titulo}</span>
                  <FontAwesomeIcon icon={servicioAbierto === servicio.id ? faMinus : faPlus} style={{ marginLeft: "1rem", width: '1rem', cursor: 'pointer' }} /></h3>
              </Accordion.Header>
              <Accordion.Body style={{ fontWeight: '400', marginBottom: '1rem' }}>
                <div>{servicio.descripcion}</div>
              </Accordion.Body>
              {servicio.barra}
            </Accordion.Item>
          ))}
        </Accordion>

      </div>
      <VentanaContactos />
    </div>
  );
};

export default Servicios;
