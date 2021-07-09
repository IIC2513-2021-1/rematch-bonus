const fs = require('fs');
const path = require('path');
const re = require('rematchjs');

/*
  ACTIVIDAD BONUS - REmatchJS y ciberataques

  REmatchJS es una librería que sirve para extraer información a partir de
  expresiones regulares. Pueden revisar un tutorial de como usarla en Node.js
  siguiendo el siguiente link:
      https://runkit.com/nicovsj/60e77d6f003217001a5d23a0

  En esta actividad deberás extraer información a partir de un archivo de logs
  de un servidor que ejecuta Apache:
*/

const TEXT = fs.readFileSync(path.resolve(__dirname, 'access.log'), 'utf8');

/*
  Cada línea del archivo presenta el siguiente formato:

  {client ip address} - - {time of request} {client request} {status code} ...

  Supongamos que deseamos extraer todos las direcciones IPs de aquellos clientes
  que realizaron un request de tipo POST, junto con el tiempo en que se realizó
  cada request. Dado que vamos a usar REmatchJS, debemos crear una consulta que
  satisfaga el patrón que necesitamos.

  Una posibilidad es el siguiente patrón:
*/

let consultaEjemplo = '(^|\\n)!x{[0-9.]+} - - \\[!y{[^\\n\\]]*}\\] "POST';

/*
  Analicemos este patrón por partes:

  +'(^|\\n)':
        Esto hara "match" con el inicio de una línea, esto porque '\\n' se
        interpreta como un salto de línea y '^' es el inicio del documento.
        Hay que notar que debemos colocar doble backslash '\\' para que JS lo
        interprete como un backslash simple (dado que REmatchJS espera un '\n'
        para un salto de línea).

  +'!x{[0-9.]*}':
        Acá le decimos a REmatchJS que queremos extraer la dirección  ip del
        cliente en una variable "x". Dentro de los corchetes encontramos el
        patrón '[0-9.]*' que hace match con un string que tiene dígitos o
        puntos por caracteres (e.g. 192.168.0.1)

  +'\\[!y{[^\\n\\]]*}\\]':
        Esta parte puede resultar confusa, pero simplemente estamos extrayendo
        los [dd/mm/yyyy:hh:MM:ss +tz]. Primero necesitamos hacer match con
        un '[', el problema es que REmatchJS tiene ese caracter reservado para
        su sintáxis (e.g. [0-9]), por lo que debemos escaparlo con '\\[' en JS.
        Lo mismo para ']': '\\]'. Así entonces estamos diciendo que vamos a
        asociar a la variable "y" cualquier cosa que no sea un ']' o un '\n',
        que esté dentro de dos corchetes '[ ]' (i.e. '[^\\n\\]]*')

  +' "POST':
        Esta parte de la consulta obliga que la request sea tipo POST.

  Ahora ya con la consulta escrita, podemos revisar los resultados con REmatchJS:
*/

let rgx = re.compile(consultaEjemplo);

for (let match of rgx.findIter(TEXT)) {
  let result = match.groupdict();
  // console.log(result);
}

/*
  En la variable "result" se entregará un objeto que tendrá por llave cada
  variable presente en la consulta, y su resultado asociado. Puedes probar
  imprimiendo la variable "result" para ver que funciona.
*/

/*
  ************************************
  *  IMPLEMENTACIÓN ACTIVIDAD BONUS  *
  ************************************

  A continuación encontrará una serie de variables con un valor por defecto,
  cada una correspondiente a una consulta diferente respecto al archivo de logs.
  Su tarea será modificar los valores según lo indicado en cada caso
*/

/*
  CONSULTAS SIMPLES SOBRE LOGS:

  La primera parte de la actividad consiste en realizar consultas que permitirán
  extraer información general de los requests que se encuentran en el archivo de logs
*/

// Extrer todas las líneas con requests tipo POST:
const CONSULTA1 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

// Extraer sólo la dirección IP en los requests tipo GET:
const CONSULTA2 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

// Extraer sólo las requests donde el servidor entrega código NOT FOUND (404):
const CONSULTA3 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

// Extraer IP de todos los requests que se redirigieron (código 302) y hacia dónde se
// redirigieron (asumir que es la 2da url):
const CONSULTA4 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

/*
  IDENTIFICAR UN POSIBLE ATAQUE AL SERVIDOR:

  Suponga que los logs que actualmente ud. está analizando corresponden a un
  servidor que sufrió un ataque cibernético. Lo único que ud. sabe es que
  el atacante desde una única dirección IP adquirió acceso de administrador
  al sitio de alguna manera.
*/

// Entregue una consulta que busque aquellas direcciones IPs que realizaron
// un request que contenga la palabra "admin" .
const CONSULTA5 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

// Si hace lo anterior de manera correcta, encontrará varias direcciones IPs.
// Necesitamos otra forma entonces de identificar al atacante. Intente entonces
// buscar todas las direcciones IPs que realizaron una request que contenga
// la palabra "SELECT".
// La idea es identificar si acaso el atacante obtuvo credenciales a partir de
// una SQL Injection.
const CONSULTA6 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

// Si realizó lo anterior con éxito, ya debería saber cuál es la dirección IP
// del atacante. Obtenga así entonces todas las líneas del archivo log
// correspondientes a requests realizados por el atacante
const CONSULTA7 = '^!x{.*}$'; // Esta consulta extrae todo el documento, debes modificarla

// FUNCIÓN PARA OBTENER EL OBJETO CON TODOS LOS RESULTADOS DE LAS CONSULTAS
// que será utilizado en la corrección:

const arrayConsultas = [
  CONSULTA1,
  CONSULTA2,
  CONSULTA3,
  CONSULTA4,
  CONSULTA5,
  CONSULTA6,
  CONSULTA7,
];

const getAllOutputs = (queriesArray) => {
  let result = [];
  for (let i = 0; i < queriesArray.length; i++) {
    let rgx = re.compile(queriesArray[i]);
    result.push(rgx.findall(TEXT));
  }
  return result;
};

const exportedResults = getAllOutputs(arrayConsultas);

// Puede probar sus resultados con sentencias como la siguiente
// console.log(exportedResults);

module.exports = exportedResults;
