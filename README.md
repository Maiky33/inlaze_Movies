Documentación del Proyecto

Este proyecto está dividido en dos partes: el cliente (client) y el servidor (server). A continuación, se detallan los pasos necesarios para configurar y ejecutar ambos componentes.
Configuración del Servidor

    Clona el Repositorio

    bash

git clone <URL_DEL_REPOSITORIO>

Navega a la Carpeta del Servidor

bash

cd server

Crea el Archivo de Configuración
En la raíz de la carpeta server, crea un archivo .env con los siguientes parámetros:

plaintext

JWT_SECRET="jwt_secret"
JWT_SECRET_REFRESH="jwt_secret_refresh"

Verifica la Configuración de la Base de Datos
Asegúrate de que la dirección de la base de datos en app.module.ts esté configurada correctamente. La configuración ideal es:

typescript

mongodb://127.0.0.1:27017/inlaze_api

Instala las Dependencias del Servidor

bash

    npm install


    

Configuración del Cliente

    Navega a la Carpeta del Client

    bash

cd ../client

Crea el Archivo de Configuración
En la raíz de la carpeta client, crea un archivo .env con el siguiente parámetro:

plaintext

REACT_APP_ACCESS_KEY="9d5ff5a105f369ecb52de2149bc6efbd"

Instala las Dependencias del Cliente

bash

    npm install

Ejecución del Proyecto

    Inicia el Servidor

    bash

cd server
npm run start

Inicia el Cliente

bash

    cd ../client
    npm run start

Notas Adicionales

    Asegúrate de tener MongoDB en ejecución antes de iniciar el servidor.
    Los parámetros de configuración (.env) deben ser tratados de manera segura y no deben compartirse públicamente.
