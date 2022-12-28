import { useState } from 'react';
import artefactos from './data/artefactos.json';

function Search() {
  const [resultados, setResultados] = useState(null);

  function buscarArtefacto(e) {
    if (e) {
      e.preventDefault();
      const numero = e.target.numero.value;
      const artefacto = artefactos.find(a => a.numero == numero);
      setResultados(artefacto);
    }
  }

  return (
    <div>
      <h1 style={{marginTop: '50px'}}>Consulta sobre Servicio Técnico</h1>
      <form method='post' action='#' onSubmit={buscarArtefacto} style={{textAlign: 'center', marginTop: '50px'}}>
        <label>
          Ingrese su codigo: 
          <input type="number" id="numero" style={{marginLeft: '10px', WebkitAppearance: 'none'}}/>
        </label>
        <button type="submit">Buscar</button>
      </form>
      {resultados && (
        <div>
          <h2 style={{textAlign: 'center', marginTop: '50px'}}>Resultados de la búsqueda</h2>
          <ul>
            <li style={{textAlign: 'center', listStyle: 'none'}}>
              Codigo ingresado: {resultados.numero}
            </li>
            <li style={{textAlign: 'center', listStyle: 'none', color: 'red'}}>
              Reparado: {resultados.reparado ? 'Sí' : 'No'}
            </li>
            {resultados.costoReparacion && (
              <li style={{textAlign: 'center', listStyle: 'none'}}>
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



