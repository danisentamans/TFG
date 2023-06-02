///Necesitaremos este módulo para acceder a la ruta donde está Micontrato.sol
const path = require('path');
///Necesitaremos este módulo para leer el código de Micontrato.sol
const fs = require('fs');
///Necesitaremos este módulo para compilar el código de Micontrato.sol
const solc = require('solc');

///Ruta donde está nuestro archivo
const MicontratoPath = path.join(__dirname, '../Micontrato.sol');

///Obtenemos el código
const code = fs.readFileSync(MicontratoPath, 'utf8');

///Compilamos el código
const input = {
    language: 'Solidity',
    sources: {
        'Micontrato.sol':{
            ///Le metemos el código que hemos obtenido arriba
            content: code
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};


///Resultado de la compilación
const output = JSON.parse(solc.compile(JSON.stringify(input)));

///Recogemos la información que queremos del output
module.exports = {
    ///Aquí estarán los objetos de las funciones
    abi: output.contracts['Micontrato.sol'].Micontrato.abi,
    ///Aquí el código byte
    bytecode: output.contracts['Micontrato.sol'].Micontrato.evm.bytecode.object
}