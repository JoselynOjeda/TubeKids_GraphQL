# TubeKids Frontend

Este repositorio contiene el componente frontend del proyecto TubeKids, elaborado para el curso de **Programación en Ambiente Web II** de la Universidad Técnica Nacional. El objetivo principal es proporcionar una plataforma segura y personalizable donde los padres pueden gestionar y controlar el contenido audiovisual que sus hijos visualizan.

## Backend con GraphQL

El backend de TubeKids está diseñado utilizando GraphQL, una tecnología avanzada para la gestión de consultas y manipulación de datos. Esta elección permite una interacción más eficiente y precisa entre el servidor y los clientes, facilitando el desarrollo de una plataforma altamente responsiva y adaptativa.

### Ventajas de Usar GraphQL en el Backend

- **Consultas Eficientes**: GraphQL permite a los clientes solicitar exactamente los datos que necesitan, nada más y nada menos. Esto reduce el sobreenvío de información y la carga en la red.

- **Desarrollo Ágil**: Con GraphQL, los desarrolladores pueden agregar nuevas características y tipos de datos sin afectar las operaciones existentes, lo que hace que las iteraciones del producto sean más rápidas y menos propensas a errores.

- **Integración Sencilla con Frontend**: Dado que GraphQL ofrece una especificación clara y robusta para las interacciones entre el cliente y el servidor, facilita la sincronización entre el equipo de frontend y backend, mejorando la colaboración y la coherencia en el desarrollo.

### Implementación

La implementación de GraphQL en nuestro backend se realiza a través de un servidor GraphQL que expone un único endpoint. Este servidor es responsable de procesar las consultas, realizar las operaciones necesarias en la base de datos y devolver los resultados en el formato solicitado.

### Seguridad

El backend también implementa medidas de seguridad robustas para garantizar que solo los usuarios autorizados puedan realizar consultas y mutaciones específicas. Se utilizan técnicas como la autenticación, la autorización y la validación de consultas para proteger los datos y las funcionalidades del sistema.

### Tecnologías Utilizadas

- **Node.js**: Como entorno de ejecución para el servidor.
- **Apollo Server**: Una popular implementación de servidor GraphQL que se integra bien con diversas bases de datos y tiene un amplio soporte para middleware y herramientas de desarrollo.

Este enfoque con GraphQL nos permite construir un backend que no solo es potente y flexible, sino también optimizado para ofrecer la mejor experiencia posible a los usuarios finales y a los desarrolladores que trabajan en el proyecto.


### Prerrequisitos

Antes de iniciar, asegúrate de tener instalado **Node.js** en tu sistema. Puedes descargarlo desde [Node.js official website](https://nodejs.org/).

### Clonación e Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tubekids-frontend.git
   cd tubekids-frontend

## Uso de GraphQL
El proyecto utiliza GraphQL para permitir consultas eficientes y específicas, mejorando la carga de datos y la experiencia del usuario al interactuar con la plataforma. Esto asegura que solo se transfieran los datos necesarios y relevantes, optimizando así el rendimiento y la velocidad de la aplicación.

