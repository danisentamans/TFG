const addressContract = "0x72A0647621Ed66Fe39681b5979563018C5Db125a";

const abi = [
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
      { internalType: "uint8", name: "decimals_", type: "uint8" },
      { internalType: "uint256", name: "suply_", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
    ],
    name: "NewProductCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "productsBase",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

/////////////////////////////////////////////////////////
///////////Declaración de la tabla//////////////////////
////////////////////////////////////////////////////////
// Código de barras de la fruta
var codigoBarras;

const selectFrutas = document.querySelector("#fruta");
const precioFruta = document.querySelector("#precio1");
const descripcionFruta = document.querySelector("#descripcion1");
const cantidadTotalFruta = document.querySelector("#cantidad-total1");
const direccionFruta = document.querySelector("#direccion1");

selectFrutas.addEventListener("change", async () => {
  const frutaSeleccionada = selectFrutas.value;
  if (frutaSeleccionada != "") {
    direccionFruta.innerHTML = fruitaccount;
    noMostrarHortaliza();
    noMostrarLegumbre();
    notShowButtonPDF();
    notShowDownloadPDF();
    if (frutaSeleccionada === "pera") {
      precioFruta.innerHTML = "0.89€/kg";
      codigoBarras = "20250140";
    } else if (frutaSeleccionada === "manzana") {
      precioFruta.innerHTML = "0.76€/kg";
      codigoBarras = "3700476611430";
    } else if (frutaSeleccionada === "naranja") {
      precioFruta.innerHTML = "0.54€/kg";
      codigoBarras = "8480017114679";
    } else if (frutaSeleccionada === "platano") {
      precioFruta.innerHTML = "1.20€/kg";
      codigoBarras = "2303800001368";
    } else if (frutaSeleccionada === "kiwi") {
      precioFruta.innerHTML = "1.35€/kg";
      codigoBarras = "20654993";
    }

    try {
      const ethValue = await addAddress(
        fruitaccount,
        precioFruta.innerHTML,
        cantidadTotalFruta.value
      );
      totalEthValue = ethValue;
      console.log("ethValue:", ethValue);
      obtenerTrazabilidad(codigoBarras, descripcionFruta);
    } catch (error) {
      console.error("Error al obtener la trazabilidad:", error);
    }

    mostrarFruta();
  } else {
    precioFruta.innerHTML = "";
    descripcionFruta.innerHTML = "";
    cantidadTotalFruta.value = "";
    direccionFruta.innerHTML = "";
    noMostrarFruta();
  }
});

cantidadTotalFruta.addEventListener("input", async () => {
  try {
    const ethValue = await addAddress(
      fruitaccount,
      precioFruta.innerHTML,
      cantidadTotalFruta.value
    );
    totalEthValue = ethValue;
    console.log("ethValue:", ethValue);

    obtenerTrazabilidad(codigoBarras, descripcionFruta)
      .then((trazabilidad) => {
        crearPDF(
          selectFrutas.value,
          precioFruta.innerHTML,
          fruitaccount,
          trazabilidad,
          cantidadTotalFruta.value,
          totalEthValue
        ).then((contenidoPDF) => {
          buyerPDF = 0;
          buyerPDF = contenidoPDF;
        });
      })
      .catch((error) => {
        console.error("Error al obtener la trazabilidad:", error);
      });
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
  }
});

const selectHortalizas = document.querySelector("#hortalizas");
const precioHortalizas = document.querySelector("#precio2");
const descripcionHortalizas = document.querySelector("#descripcion2");
const cantidadTotalHortalizas = document.querySelector("#cantidad-total2");
const direccionHortalizas = document.querySelector("#direccion2");

selectHortalizas.addEventListener("change", async () => {
  const hortalizaSeleccionada = selectHortalizas.value;
  if (hortalizaSeleccionada != "") {
    direccionHortalizas.innerHTML = vegetablesaccount;
    noMostrarLegumbre();
    noMostrarFruta();
    notShowButtonPDF();
    notShowDownloadPDF();
    if (hortalizaSeleccionada === "zanahoria") {
      precioHortalizas.innerHTML = "0.89€/kg";
      codigoBarras = "20342753";
    } else if (hortalizaSeleccionada === "lechuga") {
      precioHortalizas.innerHTML = "0.76€/kg";
      codigoBarras = "8429839000012";
    } else if (hortalizaSeleccionada === "tomate") {
      precioHortalizas.innerHTML = "0.54€/kg";
      codigoBarras = "20242107";
    } else if (hortalizaSeleccionada === "berenjena") {
      precioHortalizas.innerHTML = "1.20€/kg";
      codigoBarras = "8436533916433";
    } else if (hortalizaSeleccionada === "esparrago") {
      precioHortalizas.innerHTML = "1.35€/kg";
      codigoBarras = "3560070451159";
    }

    try {
      const ethValue = await addAddress(
        vegetablesaccount,
        precioHortalizas.innerHTML,
        cantidadTotalHortalizas.value
      );
      totalEthValue = ethValue;
      console.log("ethValue:", ethValue);
      obtenerTrazabilidad(codigoBarras, descripcionHortalizas);
    } catch (error) {
      console.error("Error al obtener la trazabilidad:", error);
    }

    mostrarHortaliza();
  } else {
    precioHortalizas.innerHTML = "";
    descripcionHortalizas.innerHTML = "";
    cantidadTotalHortalizas.value = "";
    direccionHortalizas.innerHTML = "";
    noMostrarHortaliza();
  }
});

cantidadTotalHortalizas.addEventListener("input", async () => {
  try {
    const ethValue = await addAddress(
      vegetablesaccount,
      precioHortalizas.innerHTML,
      cantidadTotalHortalizas.value
    );
    totalEthValue = ethValue;
    console.log("ethValue:", ethValue);

    obtenerTrazabilidad(codigoBarras, descripcionHortalizas)
      .then((trazabilidad) => {
        crearPDF(
          selectHortalizas.value,
          precioHortalizas.innerHTML,
          vegetablesaccount,
          trazabilidad,
          cantidadTotalHortalizas.value,
          totalEthValue
        ).then((contenidoPDF) => {
          buyerPDF = 0;
          buyerPDF = contenidoPDF;
        });
      })
      .catch((error) => {
        console.error("Error al obtener la trazabilidad:", error);
      });
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
  }
});

const selectLegumbres = document.querySelector("#legumbres");
const precioLegumbre = document.querySelector("#precio3");
const descripcionLegumbre = document.querySelector("#descripcion3");
const cantidadTotalLegumbre = document.querySelector("#cantidad-total3");
const direccionLegumbre = document.querySelector("#direccion3");

selectLegumbres.addEventListener("change", async () => {
  const legumbreSeleccionada = selectLegumbres.value;
  if (legumbreSeleccionada != "") {
    direccionLegumbre.innerHTML = legumesaccount;
    noMostrarFruta();
    noMostrarHortaliza();
    notShowButtonPDF();
    notShowDownloadPDF();
    if (legumbreSeleccionada === "garbanzos") {
      precioLegumbre.innerHTML = "0.89€/kg";
      codigoBarras = "8480000260291";
    } else if (legumbreSeleccionada === "frijoles") {
      precioLegumbre.innerHTML = "0.76€/kg";
      codigoBarras = "0044695000846";
    } else if (legumbreSeleccionada === "lentejas") {
      precioLegumbre.innerHTML = "0.54€/kg";
      codigoBarras = "8480000053305";
    } else if (legumbreSeleccionada === "judias") {
      precioLegumbre.innerHTML = "1.20€/kg";
      codigoBarras = "8427603144009";
    } else if (legumbreSeleccionada === "soja") {
      precioLegumbre.innerHTML = "1.35€/kg";
      codigoBarras = "8480000610232";
    }

    try {
      const ethValue = await addAddress(
        legumesaccount,
        precioLegumbre.innerHTML,
        cantidadTotalLegumbre.value
      );
      totalEthValue = ethValue;
      console.log("ethValue:", ethValue);

      obtenerTrazabilidad(codigoBarras, descripcionLegumbre);
    } catch (error) {
      console.error("Error al obtener la trazabilidad:", error);
    }
    mostrarLegumbre();
  } else {
    precioLegumbre.innerHTML = "";
    descripcionLegumbre.innerHTML = "";
    cantidadTotalLegumbre.value = "";
    direccionLegumbre.innerHTML = "";
    noMostrarLegumbre();
  }
});

cantidadTotalLegumbre.addEventListener("input", async () => {
  try {
    const ethValue = await addAddress(
      legumesaccount,
      precioLegumbre.innerHTML,
      cantidadTotalLegumbre.value
    );
    totalEthValue = ethValue;
    console.log("ethValue:", ethValue);

    obtenerTrazabilidad(codigoBarras, descripcionLegumbre)
      .then((trazabilidad) => {
        crearPDF(
          selectLegumbres.value,
          precioLegumbre.innerHTML,
          legumesaccount,
          trazabilidad,
          cantidadTotalLegumbre.value,
          totalEthValue
        ).then((contenidoPDF) => {
          buyerPDF = 0;
          buyerPDF = contenidoPDF;
        });
      })
      .catch((error) => {
        console.error("Error al obtener la trazabilidad:", error);
      });
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
  }
});

// Realiza una solicitud HTTP a la API de Open Food Facts para obtener información de trazabilidad de un producto
function obtenerTrazabilidad(codigoBarras, contenedorDescripcion) {
  return new Promise((resolve, reject) => {
    let url = `https://world.openfoodfacts.org/api/v0/product/${codigoBarras}.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let descripcion = "Descripción: ";
        console.log("Producto --> ", data.product);

        if (data.product.ingredients_text_debug) {
          descripcion += data.product.ingredients_text_debug;
        } else {
          descripcion += data.product.product_name;
        }

        if (data.product.packaging) {
          descripcion += " Empaquetado: " + data.product.packaging;
        }

        descripcion += " Procedencia: ";
        if (data.product.manufacturing_places) {
          descripcion += data.product.manufacturing_places;
        } else {
          descripcion += data.product.countries;
        }

        url = `https://es.openfoodfacts.org/producto/${codigoBarras}`;

        const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
          url
        )}&chs=100x100`;

        const qrCodeImage = new Image();
        qrCodeImage.src = qrCodeUrl;

        qrCodeImage.onload = function () {
          const linebreak = document.createElement("br");
          contenedorDescripcion.appendChild(linebreak);
          contenedorDescripcion.appendChild(qrCodeImage);
        };

        contenedorDescripcion.innerHTML = descripcion;

        resolve(contenedorDescripcion.innerHTML);
      })
      .catch((error) => {
        console.error(
          "Error al obtener la información de trazabilidad:",
          error
        );
        reject(error);
      });
  });
}

function mostrarPopUpFrutas() {
  // Crea un elemento div para el pop-up
  var popUp = document.createElement("div");
  popUp.innerHTML = `
    <h2>Trazabilidad ${obtenerArticulo(selectFrutas.value)} ${
    selectFrutas.value
  }</h2>
    <p>${descripcionFruta.innerHTML}</p>`;

  // Agrega estilos CSS al pop-up
  popUp.style.position = "fixed";
  popUp.style.top = "50%";
  popUp.style.left = "50%";
  popUp.style.transform = "translate(-50%, -50%)";
  popUp.style.backgroundColor = "#fff";
  popUp.style.padding = "20px";
  popUp.style.border = "1px solid #000";
  popUp.style.zIndex = "9999";

  // Agrega el pop-up al cuerpo del documento
  document.body.appendChild(popUp);

  // Agrega un evento de clic al cuerpo del documento
  document.body.addEventListener("click", function (event) {
    // Verifica si el clic se realizó dentro o fuera del pop-up
    if (
      !popUp.contains(event.target) &&
      event.target !== document.getElementById("descripcionPopUpFruta")
    ) {
      // Si el clic se realizó fuera del pop-up y fuera del botón, elimina el elemento del DOM
      document.body.removeChild(popUp);
    }
  });
}

function obtenerArticulo(fruta) {
  // Verificar si el valor es masculino
  if (
    fruta === "kiwi" ||
    fruta === "platano" ||
    fruta === "tomate" ||
    fruta === "esparrago"
  ) {
    return "del";
  } else if (fruta === "garbanzos" || fruta === "frijoles") {
    return "de los";
  } else if (fruta === "lentejas" || fruta === "judias") {
    return "de las";
  } else {
    return "de la";
  }
}

function mostrarPopUpHortalizas() {
  // Crea un elemento div para el pop-up
  var popUp = document.createElement("div");
  popUp.innerHTML = `
  <h2>Trazabilidad ${obtenerArticulo(selectHortalizas.value)} ${
    selectHortalizas.value
  }</h2>
  <p>${descripcionHortalizas.innerHTML}</p>`;
  // popUp.innerHTML = "Este es mi pop-up";

  // Agrega estilos CSS al pop-up
  popUp.style.position = "fixed";
  popUp.style.top = "50%";
  popUp.style.left = "50%";
  popUp.style.transform = "translate(-50%, -50%)";
  popUp.style.backgroundColor = "#fff";
  popUp.style.padding = "20px";
  popUp.style.border = "1px solid #000";
  popUp.style.zIndex = "9999";

  // Agrega el pop-up al cuerpo del documento
  document.body.appendChild(popUp);

  // Agrega un evento de clic al cuerpo del documento
  document.body.addEventListener("click", function (event) {
    // Verifica si el clic se realizó dentro o fuera del pop-up
    if (
      !popUp.contains(event.target) &&
      event.target !== document.getElementById("descripcionPopUpHortaliza")
    ) {
      // Si el clic se realizó fuera del pop-up y fuera del botón, elimina el elemento del DOM
      document.body.removeChild(popUp);
    }
  });
}

function mostrarPopUpLegumbres() {
  // Crea un elemento div para el pop-up
  var popUp = document.createElement("div");
  popUp.innerHTML = `
    <h2>Trazabilidad ${obtenerArticulo(selectLegumbres.value)} ${
    selectLegumbres.value
  }</h2>
    <p>${descripcionLegumbre.innerHTML}</p>`;

  // Agrega estilos CSS al pop-up
  popUp.style.position = "fixed";
  popUp.style.top = "50%";
  popUp.style.left = "50%";
  popUp.style.transform = "translate(-50%, -50%)";
  popUp.style.backgroundColor = "#fff";
  popUp.style.padding = "20px";
  popUp.style.border = "1px solid #000";
  popUp.style.zIndex = "9999";

  // Agrega el pop-up al cuerpo del documento
  document.body.appendChild(popUp);

  // Agrega un evento de clic al cuerpo del documento
  document.body.addEventListener("click", function (event) {
    // Verifica si el clic se realizó dentro o fuera del pop-up
    if (
      !popUp.contains(event.target) &&
      event.target !== document.getElementById("descripcionPopUpLegumbre")
    ) {
      // Si el clic se realizó fuera del pop-up y fuera del botón, elimina el elemento del DOM
      document.body.removeChild(popUp);
    }
  });
}

function mostrarFruta() {
  const trazabilidadFruta = document.getElementById("descripcionPopUpFruta");
  trazabilidadFruta.style.display = "block";
  precioFruta.style.display = "table-cell";
  precioFruta.style.width = "100px";
  cantidadTotalFruta.style.display = "table-cell";
  cantidadTotalFruta.style.width = "70px";
}

function mostrarHortaliza() {
  const trazabilidadHortaliza = document.getElementById(
    "descripcionPopUpHortaliza"
  );
  trazabilidadHortaliza.style.display = "block";
  precioHortalizas.style.display = "table-cell";
  precioHortalizas.style.width = "100px";
  cantidadTotalHortalizas.style.display = "table-cell";
  cantidadTotalHortalizas.style.width = "70px";
}

function mostrarLegumbre() {
  const trazabilidadLegumbre = document.getElementById(
    "descripcionPopUpLegumbre"
  );
  trazabilidadLegumbre.style.display = "block";
  precioLegumbre.style.display = "table-cell";
  precioLegumbre.style.width = "100px";
  cantidadTotalLegumbre.style.display = "table-cell";
  cantidadTotalLegumbre.style.width = "70px";
}

function noMostrarFruta() {
  selectFrutas.value = "";
  const trazabilidadFruta = document.getElementById("descripcionPopUpFruta");
  trazabilidadFruta.style.display = "none";
  precioFruta.style.display = "none";
  cantidadTotalFruta.style.display = "none";

  const optionFruit = document.querySelector('#fruta option[value=""]');
  optionFruit.textContent = "Frutas";
}

function noMostrarHortaliza() {
  selectHortalizas.value = "";
  const trazabilidadHortaliza = document.getElementById(
    "descripcionPopUpHortaliza"
  );
  trazabilidadHortaliza.style.display = "none";
  precioHortalizas.style.display = "none";
  cantidadTotalHortalizas.style.display = "none";

  const optionLegumbres = document.querySelector(
    '#hortalizas option[value=""]'
  );
  optionLegumbres.textContent = "Hortalizas";
}

function noMostrarLegumbre() {
  selectLegumbres.value = "";
  const trazabilidadLegumbre = document.getElementById(
    "descripcionPopUpLegumbre"
  );
  trazabilidadLegumbre.style.display = "none";
  precioLegumbre.style.display = "none";
  cantidadTotalLegumbre.style.display = "none";

  const optionLegumbres = document.querySelector('#legumbres option[value=""]');
  optionLegumbres.textContent = "Legumbres";
}

function mostrarTabla() {
  const tituloTabla = document.getElementById("tituloTablaProductos");
  tituloTabla.style.display = "block";
  const tabla = document.getElementById("productsTable");
  tabla.style.display = "block";
}

function mostrarTransferencia(quantity) {
  const transfer = document.getElementById("transferForm");
  if (quantity != 0) {
    transfer.style.display = "block";
  } else {
    transfer.style.display = "none";
  }
}

function mostrarButtonBalance() {
  const getBalance = document.getElementById("btnGetBalance");
  getBalance.style.display = "block";
}

function showButtonHistory() {
  const gethistory = document.getElementById("btnGetHistory");
  gethistory.style.display = "block";
}

function mostrarBalance() {
  const getBalance = document.getElementById("showBalance");
  getBalance.style.display = "flex";
  getBalance.classList.add("show");
}

//PDS Y IPFS
const getPDF = document.getElementById("btnShowPDF");
const getDownloadPDF = document.getElementById("btnDownloadPDF");
function showButtonPDF() {
  getPDF.style.display = "block";
}

function showDownloadPDF() {
  getDownloadPDF.style.display = "block";
}

function notShowButtonPDF() {
  getPDF.style.display = "none";
}

function notShowDownloadPDF() {
  getDownloadPDF.style.display = "none";
}

function showbtnIPFS() {
  const getIPFS = document.getElementById("btnIPFS");
  getIPFS.style.display = "block";
}

getPDF.addEventListener("click", showDownloadPDF);

////////////////////////////////////////////////////////
/////////////EMPIEZA EL CÓDIGO////////////////////////
///////////////////////////////////////////////////////
let web3;
let account;
let Micontrato;
let fruitaccount;
let vegetablesaccount;
let legumesaccount;

let buyerPDF;
let totalEthValue;

// Obtener el elemento del mensaje de bienvenida
const welcomeMessage = document.getElementById("welcomeMessage");

// Función para mostrar un mensaje de bienvenida personalizado
function showWelcomeMessage(account) {
  welcomeMessage.innerText = `Bienvenido/a a tu cuenta: ${account}`;
  welcomeMessage.parentElement.classList.add("show");
}

async function addAddress(address, price, quantity) {
  return new Promise(async (resolve, reject) => {
    // Modificamos el valor de la dirección de envío
    const addressBenefit = document.getElementById("addressBenefiaria");
    addressBenefit.innerHTML = address;

    // Modificamos la cantidad de euros
    const amount = document.getElementById("cantidadEnEuros");
    amount.innerHTML = (
      parseFloat(price.replace("€/kg", "")) * parseInt(quantity)
    ).toFixed(2);

    // Ejemplo de uso:
    await convertEURtoETH(amount.innerHTML)
      .then((result) => {
        console.log(result);
        const ethValue = result; // Modificamos la cantidad de ETH
        const amountETH = document.getElementById("cantidad");
        amountETH.innerHTML = ethValue;
        resolve(ethValue); // Resolvemos la promesa con el valor de ethValue
      })
      .catch((error) => {
        reject(error); // Rechazamos la promesa en caso de error
      });

    // Mostramos para hacer la transacción
    mostrarTransferencia(quantity);
  });
}
// función que convertirá los € a ETH
async function convertEURtoETH(amountInEUR) {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR`
  );
  const data = await response.json();
  console.log("data --> ", data.EUR);
  const etherValue = amountInEUR / data.EUR;
  console.log(etherValue);
  return etherValue;
}

function init() {
  //Obtenemos todas las cuentas de metamask a las que se realizarán las compras
  if (typeof window.ethereum !== undefined) {
    const metamaskBtn = document.getElementById("enabledEthereumButton");
    metamaskBtn.classList.remove("d-none");

    metamaskBtn.addEventListener("click", async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      web3 = new Web3(window.ethereum);

      account = web3.utils.toChecksumAddress(accounts[0]);

      const ganacheUrl = "http://localhost:7545";
      const ganache = new Web3(ganacheUrl);
      const allAccounts = ganache.eth.getAccounts();

      /// Almacenamos las cuentas de los vendedores
      allAccounts
        .then((accountMeta) => {
          fruitaccount = web3.utils.toChecksumAddress(accountMeta[1]);
          vegetablesaccount = web3.utils.toChecksumAddress(accountMeta[2]);
          legumesaccount = web3.utils.toChecksumAddress(accountMeta[3]);
        })
        .catch((error) => {
          console.error(error);
        });

      metamaskBtn.classList.add("d-none");
      document.getElementById("accountSelected").innerHTML = account;

      //Selecciona el span por su ID
      var span1 = document.getElementById("direccion1");

      //Establece su propiedad 'display' a 'none'
      span1.style.display = "none";

      //Selecciona el span por su ID
      var span2 = document.getElementById("direccion2");

      //Establece su propiedad 'display' a 'none'
      span2.style.display = "none";

      //Selecciona el span por su ID
      var span3 = document.getElementById("direccion3");

      //Establece su propiedad 'display' a 'none'
      span3.style.display = "none";

      // Mostrar el mensaje de bienvenida
      showWelcomeMessage(account);

      // Cargamos la tabla de los productos
      mostrarTabla();

      // Mostraremos el botón del balance y del historial
      mostrarButtonBalance();
      showButtonHistory();

      // Llamada a la función asincrónica
      detectChangeAccount();
      contract();
    });
  }
}

function detectChangeAccount() {
  window.ethereum.on("accountsChanged", function (accounts) {
    account = accounts[0];
    console.log("Contrato cambiado a --> ", account);
    document.getElementById("accountSelected").innerHTML = account;
    // Mostrar el mensaje de bienvenida
    // showWelcomeMessage(account);
    window.location.reload();
  });
}

///Creamos el nuevo contrato
async function contract() {
  web3 = new Web3(window.ethereum);
  Micontrato = new web3.eth.Contract(abi, addressContract);
  interact();
}

async function crearPDF(
  producto,
  precio,
  direccion,
  trazabilidad,
  cantidad,
  ethValue
) {
  console.log(
    "precio y cantidad " + precio + " - " + cantidad + " - " + direccion
  );
  // Crear el contenido del PDF con el valor de hashValue incluido
  const contenidoPDF = `
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
        }
        
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        
        th {
          text-align: left;
          font-weight: bold;
        }
        
        .invoice-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #f7f7f7;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .invoice-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        
        .invoice-header img {
          max-width: 100px;
        }
        
        .invoice-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        
        .invoice-details div {
          flex-basis: 50%;
        }
        
        .invoice-details .label {
          color: #999;
          margin-bottom: 5px;
        }
        
        .invoice-details .value {
          font-weight: bold;
        }
      </style>
    
      <title>Mi factura IPFS</title>
      
      <div class="invoice-container">
        <div class="invoice-header">
        <div style="display: flex; align-items: center;">
      <img src="logo.png" alt="Logo" style="width: 200px; margin-left: 60px; margin-right: 40px;">
      <h1 class="text-center">Factura compra</h1>
      <img src="logo.png" alt="Logo" style="width: 200px; margin-left: 40px;">
    </div>
        </div>
        
        <div class="invoice-details">
          <div>
            <div class="label">Producto:</div>
            <div class="value">${producto}</div>
          </div>
          <div>
            <div class="label">Precio el kg:</div>
            <div class="value">${precio}</div>
          </div>
        </div>
    
        <div class="invoice-details">
          <div>
            <div class="label">Cantidad comprada:</div>
            <div class="value">${cantidad}</div>
          </div>
          <div>
            <div class="label">Total a pagar en DTFG:</div>
            <div class="value">${ethValue}</div>
          </div>
        </div>
    
        <div class="invoice-details">
        <div>
          <div class="label">Trazabilidad:</div>
          <div class="value">${trazabilidad}</div>
        </div>
      </div>
        
        <div class="invoice-details">
          <div>
            <div class="label">Dirección:</div>
            <div class="value">${direccion}</div>
          </div>
        </div>
        </div>
    `;

  return contenidoPDF;
}

function showPDF() {
  // Abrir una nueva ventana o pestaña con el contenido del PDF
  const nuevaVentana = window.open("", "_blank");
  nuevaVentana.document.write(buyerPDF);
  nuevaVentana.document.close();
}

// Función para convertir el HTML a PDF y guardar en el sistema de archivos
async function convertirHTMLaPDF() {
  try {
    html2pdf().from(buyerPDF).save("FacturaTransaccion.pdf");
    showbtnIPFS();
  } catch (error) {
    console.error("Error al descargar el documento:", error);
  }
}

function redirectToLocalhost() {
  const url = "http://localhost:8888";
  const windowFeatures = "width=800,height=600,resizable,scrollbars=yes";
  window.open(url, "_blank", windowFeatures);
}

function interact() {
  const valueBalance = document.getElementById("addressGetBalance");
  valueBalance.innerHTML = account;

  const btnGetBalance = document.getElementById("btnGetBalance");

  // btnGetBalance.addEventListener("click", async () => {
  //   const address = document.getElementById("addressGetBalance");
  //   const value = address.textContent;
  //   const balancePromise = web3.eth.getBalance(value);

  //   balancePromise
  //     .then((balance) => {
  //       const balanceResult = balance; // Almacenamos el resultado en una constante
  //       const valueSpan = document.getElementById("balance");
  //       const ethBalance = parseFloat(balanceResult) / 1000000000; // Convertir de wei a ETH
  //       valueSpan.innerHTML = Math.round(ethBalance) / 1000000000; // Redondea a dos decimales
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // });

  btnGetBalance.addEventListener("click", async () => {
    const addressElement = document.getElementById("addressGetBalance");
    const address = addressElement.textContent;

    console.log("dirección eth --> " + address);

    try {
      await Micontrato.methods
        .balanceOf(address)
        .call()
        .then((res) => {
          const balance = web3.utils.fromWei(res, "ether");
          const valueSpan = document.getElementById("balance");
          valueSpan.innerHTML = balance;
        });
    } catch (error) {
      console.error(error);
    }
  });

  const transfer = document.getElementById("transferir");
  // //Botón de transferecia
  transfer.addEventListener("click", async () => {
    try {
      const addressElement = document.getElementById("addressBenefiaria");
      const addressValue = addressElement.innerHTML;
      const amount = document.getElementById("cantidad");
      const amountString = amount.innerHTML.toString();
      const amountTransfer = web3.utils.toWei(amountString, "ether");

      console.log("dirección", web3.utils.toChecksumAddress(addressValue));

      /// Hacemos la transferencia por MetaMask
      // Si la aprobación no se ha realizado o es insuficiente, realiza la aprobación
      // await Micontrato.methods
      //   .approve(web3.utils.toChecksumAddress(addressValue), amountTransfer)
      //   .send({ from: account, gas: 2000000 })
      //   .on("transactionHash", function (hash) {
      //     console.log("Approval transaction hash: ", hash);
      //   })
      //   .on("confirmation", function (confirmationNumber, receipt) {
      //     console.log("Approval Confirmation Number:", confirmationNumber);
      //     console.log("Approval Receipt:", receipt);
      //   })
      //   .on("error", function (error) {
      //     console.error("Approval Error:", error);
      //   });

      // Una vez que la aprobación se ha realizado (o ya estaba realizada), realiza la transferencia
      await Micontrato.methods
        .transfer(addressValue, amountTransfer)
        .send({ from: account })
        .then((res) => {
          addressElement.value = "";
          amount.value = 0;
        });

      showButtonPDF();
    } catch (err) {
      console.log(err);
    }
  });
}

////////////////////////////////////////////
////////////////////////////////////////////
//////////// HISTORIAL /////////////////////
///////////////////////////////////////////
////////////////////////////////////////////

async function getTransactionHistory(address) {
  const currentBlockNumber = await web3.eth.getBlockNumber();
  const transactions = [];

  for (let i = 0; i <= currentBlockNumber; i++) {
    const block = await web3.eth.getBlock(i, true);
    for (const tx of block.transactions) {
      if (tx.from === address || tx.to === address) {
        transactions.push(tx);
      }
    }
  }

  return transactions;
}

document.getElementById("btnGetHistory").addEventListener("click", async () => {
  const transactions = await getTransactionHistory(account);

  buyerPDF = "";

  // Función para agregar las filas de datos al cuerpo de la tabla
  function addTransactionRows() {
    let contenidoPDF = `
      <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
      
      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      
      th, td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }
      
      th {
        text-align: left;
        font-weight: bold;
      }
      
      .invoice-container {
        max-width: 2000px;
        margin: 0 auto;
        background-color: #f7f7f7;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      .invoice-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
      }
      
      .invoice-header img {
        max-width: 100px;
      }
      
      .invoice-details {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }
      
      .invoice-details div {
        flex-basis: 50%;
      }
      
      .invoice-details .label {
        color: #999;
        margin-bottom: 5px;
      }
      
      .invoice-details .value {
        font-weight: bold;
      }
      </style>
      <title>Historial</title>
      <div class="invoice-container">
        <div class="invoice-header">
          <div style="display: flex; align-items: center;">
            <img src="logo.png" alt="Logo" style="width: 200px; margin-left: 400px; margin-right: 40px;">
            <h1 class="text-center">Historial de transacciones</h1>
            <img src="logo.png" alt="Logo" style="width: 200px; margin-left: 40px;">
          </div>
        </div>
        <div class="invoice-details">
          <table>
            <thead>
              <tr>
                <th>Transacción</th>
                <th>Hash</th>
                <th>Remitente</th>
                <th>Smart contract</th>
              </tr>
            </thead>
            <tbody>
    `;

    for (let i = transactions.length - 1; i >= 0; i--) {
      const tx = transactions[i];

      const truncateText = (text, maxLength) => {
        if (!text) {
          return "No se ha relizado la transacción correctamente";
        }
        if (text.length > maxLength) {
          const truncatedText = text.slice(0, maxLength) + "...";
          const splitText = truncatedText.split(" ");
          const finalText = splitText.join("<br>");
          return finalText;
        }
        return text;
      };

      contenidoPDF += `
        <tr>
          <td>${i}</td>
          <td>${truncateText(tx.hash, 20)}</td>
          <td>${truncateText(tx.from, 20)}</td>
          <td>${truncateText(tx.to, 20)}</td>
        </tr>
      `;
    }

    contenidoPDF += `
            </tbody>
          </table>
        </div>
      </div>
    `;
    buyerPDF += contenidoPDF;
    showPDF();
  }

  addTransactionRows();
});

//Llamada de inicio
window.onload = init();
