# Corporation React Library

<h1 align="center">Construye tu aplicacion rapidamente ⚡️</h1>
<br />

<br />

Corporation es una libreria de facil acceso, reusable. Esta libreria ofrece
diversos componentes para la rapida creacion de aplicaciones, sus componentes
estan pensandos para que no tengas que preocuparte por implementar logica que 
no sea la de tu negocio.

## Tabla de contenido

- 📋 [Documentacion](#documentacion)
- 🚀 [Caracteristicas](#caracteristicas)
- 📦 [Instalacion](#instalacion)
- 💻 [Uso](#uso)

## Documentacion

- v1: https://www.npmjs.com/package/corporation-react-library?activeTab=readme

## Caracteristicas

- Facilidad de estilo: Corporation contiene un conjunto de componentes los cuales
podras customizar con clases
- Flexible y componible: los componentes te permiten construir una interfaz fluida
y armar tus propios componentes usando corporation
- Minimal: Corporation tiene un estilo minimalista en sus componentes.

## Instalacion

Para usar corporation-library, debes instalar el paquete
`corporation-react-library`, sus dependencias y estilos

```
$ npm i corporation-react-library

```

## Uso

1. Puedes empezar a usar tus componentes asi:

```jsx
import { Button } from "corporation-react-library"
import 'corporation-react-library/dist/assets/corporation.css'
import 'corporation-react-library/dist/css/index.css'
import { GlobalInputs } from 'corporation-react-library/src/types'

const forms: GlobalInputs  = [
    {
      key: 'nombre',
      placeholder: 'Nombre'
      type: 'text',
      value: null,
      name: 'nombre'
    },
    {
      key: 'apellido',
      placeholder: 'Apellido'
      type: 'text',
      value: null,
      name: 'apellido'
    }
]

function Example() {
  return  <Form
            inputs={forms}
          />
}
```
