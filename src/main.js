import { sidebar } from './components/sidebar.js';
import { loginView } from './views/login.js'; // Importamos la nueva pantalla
import { usuarioActual, usuariosPrueba, setUsuarioActual } from './data.js';
import { crearView } from './views/crear.js';

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
  crear: crearView(),
  gerencial: `
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Vista Gerencial</h2>
    <p class="text-gray-600">Panel de administración general.</p>
  `
};

const app = document.querySelector('#app');

// 2. FUNCIÓN PARA DIBUJAR LA PANTALLA
function renderApp() {
  // 1. VALIDACIÓN DE SESIÓN (El Patovica)
  // Si no hay usuario logueado, dibujamos la pantalla de login y frenamos acá.
  if (!usuarioActual) {
    app.innerHTML = loginView();
    
    // Capturamos el formulario después de dibujarlo
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Evitamos que la página se recargue sola
      
      const email = document.getElementById('email-input').value.toLowerCase();
      const errorMsg = document.getElementById('login-error');
      
      // Buscamos si el mail escrito coincide con alguno de nuestra 'base de datos'
      const usuarioEncontrado = Object.values(usuariosPrueba).find(u => u.email === email);
      
      if (usuarioEncontrado) {
        // Logueo exitoso
        setUsuarioActual(usuarioEncontrado); // Guardamos quién entró
        window.location.hash = '#/dashboard'; // Lo mandamos al dashboard
        renderApp(); // Volvemos a dibujar toda la app (ahora pasará al paso 2)
      } else {
        // Logueo fallido: Mostramos el mensaje rojo
        errorMsg.classList.remove('hidden');
      }
    });
    
    return; // Usamos 'return' para cortar la función y que NO dibuje el dashboard
  }

  // 2. RENDERIZADO DE LA APP PRIVADA
  // Si llegamos a esta línea, es porque el usuario SÍ pasó la validación.
  const hash = window.location.hash.slice(2) || 'dashboard';
  const contenidoVista = vistas[hash] || vistas.dashboard;

  app.innerHTML = `
    <div class="flex min-h-screen bg-[#f4f6f4]">
      ${sidebar(hash, usuarioActual)}
      <main class="flex-1 p-8 md:ml-[250px]">
        <div class="max-w-[1580px] mx-auto">
          ${contenidoVista}
        </div>
      </main>
    </div>
  `;
}

// 3. ESCUCHAMOS LOS CAMBIOS EN LA URL
// Cada vez que el usuario hace clic en un link (cambia el #), volvemos a dibujar la app.
window.addEventListener('hashchange', renderApp);

// ESCUCHAMOS EL CLIC EN "CERRAR SESIÓN"
// Usamos el contenedor principal 'app' para escuchar el clic sin importar cuándo se dibuje el botón
app.addEventListener('click', (e) => {
  const btnLogout = e.target.closest('#btn-logout'); // Buscamos si el clic fue en el botón o su ícono
  
  if (btnLogout) {
    setUsuarioActual(null); // Vaciamos el usuario
    window.location.hash = ''; // Limpiamos la ruta
    renderApp(); // Volvemos a dibujar (nos mandará al login)
  }
});

// 4. DIBUJAMOS LA APP POR PRIMERA VEZ AL CARGAR
renderApp();