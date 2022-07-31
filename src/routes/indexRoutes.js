
import express from 'express'
import  os from 'os'
import  compression from 'compression'
import logger from '../logger/logger.js'

const numProc = os.cpus().length
const router = express.Router();

const info = {
  "Node version": process.version,
  Platform: process.platform,
  "Directorio de ejecución": process.cwd(),
  "ID del proceso": process.pid,
  "Uso de la memoria": process.memoryUsage(),
  "Memoria total reservada (rss)": process.memoryUsage().rss,
  "path de ejecución": process.execPath, //donde está el ejecutable de node
  "Argumentos de entrada": process.argv,
  "Cantidad de procesadores": numProc,
};

function getRandom(cant) {
  const numeros = [];
  for (let i = 0; i < cant; i++) {
    numeros.push(Math.floor(Math.random() * 1000) + 1);
  }
  //contar cuantas veces salió cada numero
  const contador = numeros.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  return contador;
}



router.get("/info", (req, res) => {

  logger.info(`Ruta ejecutada /info.`)
  console.log(info)
  res.json(info);
});

router.get("/infozip",compression(), (req, res) => {
  logger.info(`Ruta ejecutada /infozip.`)
  res.json(info);
});

router.get('*',(req,res)=>{
  logger.warn(`La url:${req.url} no existe`)
  res.send(`La url:${req.url} no existe`)
})
router.get("/api/randoms", (req, res) => {
  //💡http://localhost:3000/api/randoms?cant=1000
  const cant = req.query.cant || 100000000;

  const msg=getRandom(cant)

  res.send(msg);
});

export default router;
