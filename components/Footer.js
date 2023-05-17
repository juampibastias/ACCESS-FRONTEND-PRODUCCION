import React from "react";
import Link from 'next/link'
import Image from 'next/image';
import imagenLogo from "../public/images/logoblanco.png";
import useWindowSize from "../components/getwindowSize";
import Accordion from 'react-bootstrap/Accordion';


const Footer = () => {
  const size = useWindowSize();
  return (
    <footer className="footer">

      {size.width > 0/* 760 */ ?
        (
          <ul>
            <li style={{ width: '40%' }}>
              <ul>
                <div >
                  <Link href="/" ><Image className="footer-logo" src={imagenLogo} alt="access" /></Link>
                </div>
              </ul>
            </li>

            <li style={{ width: '40%' }}>
              <ul>
                <li><b>Mapa del Sitio</b></li>
                <li><Link href="/nosotros"><a>Nosotros</a></Link></li>
                <li><Link href="/tienda" ><a>Tienda</a></Link></li>
                <li><Link href="/servicios"><a>Servicios</a></Link></li>
              </ul>
            </li>

            <li>
              <ul>
                <li><b>Localizacion de tiendas</b></li>
                <li><b>Rivadavia</b>
                  <br />W.Nuñez 597
                  <br />Tel (0263) 4445900 - (0263) 4445901
                </li>
                <li>
                  <b>Junin</b>
                  <br />Av. Mitre 8
                  <br />Tel (0263) 4498375
                </li>
                <li>
                  <b>San Martin</b>
                  <br />25 de Mayo 252
                  <br />Tel (0263) 4428808 - (0263) 4420051
                </li>
              </ul>
            </li>

            <li>
              <ul>
                <li><b>Nuestros Servicios</b></li>
                <li><Link href="/tienda" ><a>Soporte online</a></Link></li>
                <li><Link href="https://wa.me/5492634617852"><a>Servicio tecnico</a></Link></li>
                <li><Link href="/servicios"><a>Desarrollo de software</a></Link></li>
                <li><Link href="/servicios"><a>Sistema de camaras de seguridad</a></Link></li>
                <li><Link href="/servicios"><a>Ventas de equipo</a></Link></li>
                <li><Link href="/servicios"><a>Sistemas para negocios</a></Link></li>
              </ul>
            </li>
          </ul>
        )
        :
        (

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h5>Mapa del Sitio</h5>
              </Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li><Link href="/nosotros"><a>Nosotros</a></Link></li>
                  <li><Link href="/sucursales"><a>Sucursales</a></Link></li>
                  <li><Link href="/servicios"><a>Servicios</a></Link></li>
                  <li><Link href="/novedades"><a>Novedades</a></Link></li>
                  <li><Link href="/tienda" ><a>Tienda</a></Link></li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5>Dirección</h5>
              </Accordion.Header>
              <Accordion.Body>
                <p>Rivadavia, W.Nuñez 597, <b>Tel: </b>(0263) 4445900 - 4445901</p>
                <p>Junin, Av. Mitre 8, <b> Tel:</b> (0263) 4498375</p>
                <p>San Martin, 25 de Mayo 252, <b>Tel</b> (0263) 4428808 - 4420051</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      {/* <p className="copyright-footer">Copyright © All Rights Reserved</p> */}
    </footer>
  )
}
export default Footer;