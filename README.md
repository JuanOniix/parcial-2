Nota sobre las ramas

⚠️ La rama principal del repositorio (main) contiene la configuración general del proyecto, pero el código fuente completo de la aplicación se encuentra en la rama master.
 
 
 
 Proyecto: API de Gestión de Tareas (Arquitectura Monolítica por Capas)

 Juan Felipe Osorio  
 407823  

1. Decisiones de diseño

El proyecto se desarrolló aplicando una arquitectura monolítica por capas, separando claramente la lógica del sistema en tres niveles:

Controller: maneja las peticiones HTTP y las respuestas. Se encarga de recibir las solicitudes del cliente y delegarlas al servicio correspondiente.  
Service: contiene la lógica de negocio. Aquí se implementan las operaciones sobre los datos antes de enviarlos o recibirlos del repositorio.  
Repository: actúa como una capa de acceso a datos. En este caso se usa una estructura en memoria  que simula una base de datos real.  

Esta separación permite mantener un código modular, escalable y fácil de mantener, cumpliendo los principios de responsabilidad única y bajo acoplamiento.



 2. Cómo correr el proyecto

1. Clonar o descomprimir el proyecto.  
2. Abrir una terminal dentro de la carpeta del proyecto.  
3. Instalar las dependencias:
   npm install
   node index.js
   Veras en la consola :
   Servidor corriendo en el puerto 3000


   Link del video Explicativo :
   https://youtu.be/MVNwjo8bXSY


