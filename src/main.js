import { sidebar } from './components/sidebar.js';
import { loginView } from './views/login.js'; // Importamos la nueva pantalla
import { usuarioActual, usuariosPrueba, setUsuarioActual } from './data.js';
import { crearView } from './views/crear.js';

// 1. CREAMOS LAS VISTAS "FALSAS" (Hasta que armemos las reales)
const vistas = {
  dashboard: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Dashboard Ejecutivo</h2>`,
  novedades: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Todas las Novedades</h2>`,
  weekly: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Reunión Weekly</h2>`,
  gerencial: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Vista Gerencial</h2>`
};

const app = document.querySelector('#app');

// 2. FUNCIÓN PARA DIBUJAR LA PANTALLA
function renderApp() {
  
  if (!usuarioActual) {
    app.innerHTML = loginView();
    
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email-input').value.toLowerCase();
      const errorMsg = document.getElementById('login-error');
      
      const usuarioEncontrado = Object.values(usuariosPrueba).find(u => u.email === email);
      
      if (usuarioEncontrado) {
        setUsuarioActual(usuarioEncontrado);
        window.location.hash = '#/dashboard';
        renderApp();
      } else {
        errorMsg.classList.remove('hidden');
      }
    });
    return;
  }

  const hash = window.location.hash.slice(2) || 'dashboard';
  
  // 2. ACÁ ESTÁ EL TRUCO: GENERAMOS LA VISTA EN EL MOMENTO EXACTO
  let contenidoVista;
  if (hash === 'crear') {
    // Si la URL dice "crear", recién AHORA ejecutamos la función, 
    // cuando ya sabemos seguro quién está logueado.
    contenidoVista = crearView(); 
  } else {
    // Si es otra vista, usamos los textos de prueba
    contenidoVista = vistas[hash] || vistas.dashboard;
  }

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