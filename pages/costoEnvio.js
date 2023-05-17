import Head from 'next/head'
import Link from 'next/link'
import path from "path";
import fsPromises from 'fs/promises'


export default function costoEnvio(props) {
  const posts = props.provincias;
  return (
    <div style={{ padding: 30 }}>
      <Head>
        <title>ACCESS - TARIFAS POR ENVIOS</title>
      </Head>
      <button className='btn btn-success'>
        <Link href="/">
          Ir a la Tienda
        </Link>
      </button>
      <div style={{ 
        paddingTop: '2rem',
        display:'flex',
        gap: '20px',
        flexWrap:'wrap',
        justifyContent: 'space-around'
        }}>
        {posts.map(post =>
          <div
            className="card-paises"
            key={post.id}>
            <div className="card-body">
              <h2>{post.nombre}</h2>
              <hr style={{ width: "100%", border: "1px solid" }} />
              <p> ${post.costo} por paquete (hasta 25 kg)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

//llamada a api provincias y ciudades argentias
export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'costoEnvio.json');

  const jsonData = await fsPromises.readFile(filePath);

  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}