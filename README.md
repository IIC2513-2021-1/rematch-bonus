# Actividad bonus REmatch
> Plazo de entrega: 16 de julio de 2021 hasta las 22:00 hrs

## Antecedentes

[REmatchJS](https://rematchcl.web.app/) es una librería que sirve para extraer información a partir de expresiones regulares. Puede revisar un tutorial de cómo usarla en Node.js siguiendo [este link](https://runkit.com/nicovsj/60e77d6f003217001a5d23a0).

En esta actividad deberá extraer información a partir de un archivo de logs de un servidor que ejecuta Apache. El archivo es un ejemplo construido para los propósitos de esta actividad, sin embargo, la sintaxis es igual a la de un archivo `access.log` real de Apache.

**Nota**: Se le recomienda fuertemente revisar el tutorial antes de desarrollar la actividad.

## Problemas a resolver

La actividad consiste en realizar 7 consultas para extraer información de diferente tipo, las cuales se dividen en dos grupos: (i) consultas simples sobre requests y (ii) consultas que permiten identificar un posible ataque

El detalle de cada consulta se encuentra a continuación:

1. Extrer todas las líneas con requests tipo `POST`
2. Extraer sólo la dirección IP en los requests tipo `GET`
3. Extraer sólo los requests donde el servidor entrega código NOT FOUND (`404`)
4. Extraer la IP de todos los requests que se redirigieron (código `302`), y hacia dónde se redirigieron
5. Buscar todas las direcciones IP que realizaron un request que contenga la palabra "admin"
6. Buscar todas las direcciones IP que realizaron una request que contenga la palabra `SELECT`
7. Teniendo la dirección IP del atacante, obtener todas las líneas del archivo de logs correspondientes a requests realizados por el atacante

## Desarrollo
Tendrá que utilizar el proyecto base que se encuentra en este repositorio para ejecutar el código correspondiente a esta actividad bonus.

Lo primero es verificar las dependencias:
- Node.js (v10 o v12)
- Yarn

Si está usando `nvm`, entonces puede seleccionar la versión de Node del proyecto con:
```bash
nvm use
```
(Si no, basta con que tenga instalada una de las versiones mencionadas más arriba)

Instalamos las dependencias del proyecto:
```bash
yarn install
```

Y ya estamos listos para ejecutar el proyecto:
```bash
yarn start
```

Eso ejecutará el script `src/index.js` una sola vez, sin embargo, si quiere que un proceso escuche por cambios en los archivos, para que así se ejecute el script `src/index.js` cada vez que guarda algo, puede ejecutar:
```bash
yarn dev
```

## Consideraciones
- Para implementar su solución, **sólo debe modificar** el valor de las variables `CONSULTAX`, con `X ∈ {1, ..., 7}`
- **NO debe modificar** la función `getAllOutputs`, la variable `exportedResults`, ni tampoco la última línea con `module.exports`. Estas líneas serán utilizadas para la corrección de la actividad.

## Forma de entrega

Se habilitará un formulario único para ambas secciones, el cual [pueden encontrar en este link](https://forms.gle/xUWW3NqjVRWWeJf7A). Debe adjuntar en este formulario **sólo** un archivo comprimido en formato `zip` que contenga el script `index.js`.


Cualquier duda, no dude en preguntar en las [issues del proyecto](https://github.com/IIC2513-2021-1/projects/issues).

### ¡Éxito!
