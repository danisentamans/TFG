const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const mnemonic = "acquire raise rich slide off offer floor emerge jeans reunion sphere pony";
const provider = new HDWalletProvider(mnemonic, "http://localhost:7545");
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    const constructorArguments = [
      "DanielTrabajoFindeGrado", // Nombre de la criptomoneda
      "DTFG", // Símbolo de la criptomoneda
      18, // Decimal places
      21000000, // Total supply
    ];

    const result = await new web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments: constructorArguments})
    .send({gas: 2000000, from:accounts[0]});


    // Acceder a los métodos del contrato
    const balance = await result.methods.balanceOf(accounts[0]).call();
    console.log("Balance:", balance);


    console.log("Contrato desplegado en la dirección:", result.options.address);
  } catch (error) {
    console.error("Error al desplegar el contrato:", error);
  }
};

deploy();
