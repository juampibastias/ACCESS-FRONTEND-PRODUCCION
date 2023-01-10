import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploaded_servicios");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      // Eliminar cualquier archivo existente en el directorio /public/uploaded_files
      fs.readdir("./public/uploaded_servicios", (err, files) => {
        if (err) {
          console.error(err);
          res.status(500).end();
          return;
        }
        files.forEach((file) => {
          fs.unlink(`./public/uploaded_servicios/${file}`, (err) => {
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