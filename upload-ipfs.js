const fs = require("fs");
const IPFS = require("ipfs-http-client");
const openurl = require("openurl");

async function uploadIPFS(PATH) {
  try {
    const node = await IPFS.create();
    const file = await node.add(fs.readFileSync(PATH));
    const cidValue = file.cid.toString();
    const gatewayUrl = `https://ipfs.io/ipfs/${cidValue}`;
    openurl.open(gatewayUrl, (err) => {
        if (err) {
          console.error(`Error al abrir la URL: ${err}`);
        } else {
          console.log(`Se abrió la URL en el navegador`);
        }
      });
    return file.cid.toString();
  } catch (err) {
    console.log("Error en uploadIPFS:");
    console.error(err);
    throw new Error("Error al cargar en IPFS");
  }
}

module.exports = uploadIPFS;
