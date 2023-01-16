import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploaded_productos");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const jsonPath = './public/uploaded_productos/productos.json'

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      // Eliminar cualquier archivo existente en el directorio /public/uploaded_files
      fs.readdir("./public/uploaded_productos", (err, files) => {
        if (err) {
          console.error(err);
          res.status(500).end();
          return;
        }
        files.forEach((file) => {
          fs.unlink(`./public/uploaded_productos/${file}`, (err) => {
            if (err) {
              console.error(err);
              res.status(500).end();
              return;
            }
          });
        });
        res.status(200).end();
      });
      break;
    case "POST":
      upload.single("file")(req, res, (err) => {
        if (err) {
          console.error(err);
          res.status(500).end();
          return;
        }
        //validar el archivo json
        let rawdata = fs.readFileSync(jsonPath);
        let products = JSON.parse(rawdata);
        for(let i = 0; i < products.length; i++) {
          let product = products[i];
          //validar cada producto del json antes de guardarlo en la base de datos
          if(!product.title || !product.price || !product.description || !product.content || !product.color || !product.images || !product.category) {
          console.error("Producto no valido: " + JSON.stringify(product));
          continue;
          }
          //guardar producto en la base de datos
          let newProduct = new productModels(product);
          await newProduct.save();
          }
          res.status(200).end();
          });
          break;
          default:
          res.status(405).end();
          break;
          }
          };
          
          export const config = {
          api: {
          bodyParser: false
          }
          }

