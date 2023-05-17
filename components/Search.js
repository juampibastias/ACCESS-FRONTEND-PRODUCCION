import { useState } from 'react';
import artefactos from '../public/uploaded_servicios/servicios.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const estadoResultado = () => {
  Search(false);
  
}

function Search(n) {
  const [resultados, setResultados] = useState(null);

  function buscarArtefacto(e) {
    if (n == false) {
      setResultados(null);
      console.log("aca ingreso");
    }
    if (e) {
      e.preventDefault();
      const numero = e.target.numero.value;
      if (numero !== '') {
        const artefacto = artefactos.find(a => a.numero == numero);
        setResultados(artefacto);
        console.log(artefacto);
      }
    }
  }

  return (
    <div className="formSearch contenedor-form-search">
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
            <h4 style={{ color: resultados.reparado ? 'green' : 'red' }}>{resultados.reparado ? ' finalizada' : ' en proceso'}</h4>
          </div>
          <ul>
            <li style={{ listStyle: 'none', fontSize: "15px" }}>
              Codigo ingresado: {resultados.numero}
            </li>
            {resultados.costoReparacion && (
              <li style={{ listStyle: 'none', fontSize: "15px" }}>
                Costo de reparación: ${resultados.costoReparacion}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;



