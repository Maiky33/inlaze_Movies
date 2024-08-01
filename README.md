Documentación del Proyecto

Este proyecto está dividido en dos partes: un servidor (backend) y un cliente (frontend). A continuación, se describen los pasos necesarios para configurar y ejecutar ambos componentes.
Estructura del Proyecto

El repositorio contiene las siguientes carpetas:

    client: Carpeta del cliente (frontend).
    server: Carpeta del servidor (backend).

Configuración del Servidor (Backend)

    Clona el repositorio:

    bash

git clone <url-del-repositorio>

Navega a la carpeta del servidor:

bash

cd <nombre-del-repositorio>/server

Crea un archivo .env en la raíz de la carpeta del servidor con el siguiente contenido:

env

JWT_SECRET="jwt_secret"
JWT_SECRET_REFRESH="jwt_secret_refresh"

Verifica la configuración de la base de datos en app.module.ts:
Asegúrate de que la dirección de la base de datos sea correcta. La configuración ideal es:

typescript

MongooseModule.forRoot('mongodb://127.0.0.1:27017/inlaze_api')

Instala las dependencias del servidor:

bash

npm install

Inicia el servidor:

bash

    npm run start

Configuración del Cliente (Frontend)

    Navega a la carpeta del cliente:

    bash

cd <nombre-del-repositorio>/client

Crea un archivo .env en la raíz de la carpeta del cliente con el siguiente contenido:

env

REACT_APP_ACCESS_KEY="9d5ff5a105f369ecb52de2149bc6efbd"

Instala las dependencias del cliente:

bash

npm install

Inicia el cliente:

bash

    npm run start

Notas Adicionales

    Asegúrate de que tanto el servidor como el cliente estén en ejecución para que el proyecto funcione correctamente.
    Para cualquier duda o problema, revisa la documentación del proyecto o contacta al equipo de soporte.
