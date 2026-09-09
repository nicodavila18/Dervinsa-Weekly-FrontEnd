# Dervinsa - Sistema Weekly (Frontend)

Plataforma web para la gestión, seguimiento y colaboración de novedades semanales entre las distintas gerencias de Dervinsa.

## 🛠️ Tecnologías y Frameworks utilizados

Este proyecto es un frontend ligero construido con:
* **HTML5 y JavaScript (ES6 Modules):** Lógica y estructura nativa sin frameworks pesados.
* **Tailwind CSS:** Framework de estilos utilitarios para el diseño responsivo.
* **Node.js y npm:** Entorno utilizado exclusivamente para la gestión de dependencias y el servidor de desarrollo.

## 📋 Requisitos Previos para el Servidor

Para compilar y correr el proyecto en un entorno local o servidor, es necesario tener instalado:
* [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
* Git

## 🚀 Instalación y Despliegue

Siga estos pasos para levantar el proyecto:

1. **Instalar las dependencias (Tailwind, etc.):**
   \`\`\`bash
   npm install
   \`\`\`

2. **Ejecutar en entorno de desarrollo:**
   \`\`\`bash
   npm run dev
   \`\`\`
   *(Esto levantará un servidor local, generalmente en http://localhost:5173 o similar).*

3. **Compilar para Producción (Deploy):**
   \`\`\`bash
   npm run build
   \`\`\`
   *(Este comando generará una carpeta `dist` o `build` con los archivos estáticos HTML, CSS y JS listos para ser subidos a cualquier servidor web como Apache, Nginx, etc).*
