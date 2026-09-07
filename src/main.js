import { sidebar } from './components/sidebar.js';

// 1. CREAMOS LAS VISTAS "FALSAS" (Hasta que armemos las reales)
const vistas = {
  dashboard: `
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Dashboard Ejecutivo</h2>
    <p class="text-gray-600">Acá va a ir el resumen de las gerencias.</p>
  `,
  novedades: `
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Todas las Novedades</h2>
    <p class="text-gray-600">Acá va a ir la tabla grande con los filtros.</p>
  `,
  weekly: `
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Reunión Weekly</h2>
    <p class="text-gray-600">Pantalla para gestionar la reunión semanal.</p>
  `,
  crear: `
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Nueva Novedad</h2>
    <p class="text-gray-600">Acá irá el formulario.</p>
  `,
  gerencial: `
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Vista Gerencial</h2>
    <p class="text-gray-600">Panel de administración general.</p>
  `
};

const app = document.querySelector('#app');

// 2. FUNCIÓN PARA DIBUJAR LA PANTALLA
function renderApp() {
  // Leemos qué dice la URL (ej: "#/novedades"). Si está vacía, por defecto es "dashboard".
  const hash = window.location.hash.slice(2) || 'dashboard';
  
  // Buscamos el HTML de esa vista. Si escriben cualquier cosa, mostramos el dashboard.
  const contenidoVista = vistas[hash] || vistas.dashboard;

  app.innerHTML = `
    <div class="flex min-h-screen bg-[#f4f6f4]">
      
      <!-- Inyectamos el sidebar y le avisamos en qué ruta estamos para que pinte el botón -->
      ${sidebar(hash)}

      <main class="flex-1 p-8 md:ml-[250px]">
        <div class="max-w-[1580px] mx-auto">
          <!-- Inyectamos el contenido de la pantalla seleccionada -->
          ${contenidoVista}
        </div>
      </main>

    </div>
  `;
}

// 3. ESCUCHAMOS LOS CAMBIOS EN LA URL
// Cada vez que el usuario hace clic en un link (cambia el #), volvemos a dibujar la app.
window.addEventListener('hashchange', renderApp);

// 4. DIBUJAMOS LA APP POR PRIMERA VEZ AL CARGAR
renderApp();