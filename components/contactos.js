import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link'
import React from "react";

function VentanaContactos() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form className="form-newsletter">

        <div className="div-izq">
          <h4><b>Estemos en contacto</b></h4>
          <span style={{ display: "flex", justifyContent: "space-evenly" }}>
            <a className="icon-link-social" href="https://www.instagram.com/access.tecnologia/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="icon-link-social" href="https://www.facebook.com/access.tecnologia1" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className="icon-link-social" href="https://wa.me/+5492634617852" target="_blank">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </span>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", marginTop:"1rem"}}>
            <p>
              Nuestro servicio técnico:
            </p>
            <a href="https://wa.me/+549263430-8544" className="icon-link-service" target="_blank" style={{fontSize: '1.3rem'}}>
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
        <div className="div-der">
          <label htmlFor="emailnewsletter">
            <h4>
              <b>
                Consultanos por nuestras novedades
              </b>
            </h4>
          </label>
          {/* <button className="btn btn-outline-dark"> */}
            <a className="btn btn-outline-dark btn-send-mail" href="mailto:access@access.com.ar?subject=Quiero%20saber%20las%20novedades&body=Esta%20es%20una%20consulta%20desde%20el%20sitio%20web%20de%20Access">
              Enviar correo
            </a>
          {/* </button> */}
        </div>
      </form>
    </div>
  );
}

export default VentanaContactos;