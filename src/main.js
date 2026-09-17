import { sidebar } from './components/sidebar.js';
import { loginView } from './views/login.js'; // Importamos la nueva pantalla
import { usuarioActual, usuariosPrueba, setUsuarioActual } from './data.js';
import { crearView } from './views/crear.js';
import { novedadesView } from './views/novedades.js';
import { dashboardView } from './views/dashboard.js';
import { weeklyView } from './views/weekly.js';
import { detalleView } from './views/detalle.js';
import { gerencialView } from './views/gerencial.js';
import { adminView } from './views/admin.js';

// CREAMOS LAS VISTAS "FALSAS" (Hasta que armemos las reales)
const vistas = {
  dashboard: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Dashboard Ejecutivo</h2>`,
  novedades: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Todas las Novedades</h2>`,
  weekly: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Reunión Weekly</h2>`,
  gerencial: `<h2 class="text-3xl font-bold text-gray-800 mb-2">Vista Gerencial</h2>`
};

const app = document.querySelector('#app');

// --- LÓGICA DEL SISTEMA DE NOTIFICACIONES ---

// 1. Abrir/Cerrar el Dropdown
window.toggleCampanita = (e) => {
  e.stopPropagation(); // Evita que el clic se propague al documento y cierre instantáneamente el modal
  const dropdown = document.getElementById('dropdown-notificaciones');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
};

// 2. Hacer clic en una notificación
window.leerNotificacion = (id, url) => {
  // Buscamos la notificación y la marcamos como leída
  const noti = window.notificaciones.find(n => n.id === id);
  if (noti) noti.leida = true;
  
  // Cerramos el dropdown
  document.getElementById('dropdown-notificaciones').classList.add('hidden');
  
  // Viajamos a la URL y redibujamos para que el contador baje
  window.location.hash = url;
  renderApp(); 
};

// 3. Marcar todas como leídas
window.marcarTodasLeidas = () => {
  window.notificaciones.forEach(n => n.leida = true);
  renderApp();
};

// 4. Cerrar el modal al hacer clic afuera
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('dropdown-notificaciones');
  // Si el dropdown existe y no está oculto, lo ocultamos
  if (dropdown && !dropdown.classList.contains('hidden')) {
    dropdown.classList.add('hidden');
  }
});

// Función para dibujar la pantalla
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
        
        // Campana de notificaciones apenas ingresas
        import('./components/toast.js').then(module => {
            module.emitirNotificacion('¡Sesión iniciada!', 'Bienvenido al sistema', '#/dashboard', 'exito');
        });
      } else {
        errorMsg.classList.remove('hidden');
      }
    });
    return;
  }

  // 1. LEEMOS LA URL COMPLETA
  const rawHash = window.location.hash.slice(2); // Ej: "novedades?prioridad=Alta"
  
  // 2. SEPARAMOS LA RUTA BASE DE LOS PARÁMETROS
  const basePath = rawHash.split('?')[0] || 'dashboard'; // Se queda solo con "novedades"
  
  let contenidoVista;

  // 3. AHORA COMPARAMOS USANDO BASEPATH
  if (basePath === 'crear') {
    contenidoVista = crearView(); 
  } else if (basePath === 'novedades') { 
    contenidoVista = novedadesView(); 
  } else if (basePath === 'weekly') { 
    contenidoVista = weeklyView(); 
  } else if (basePath === 'detalle') {
    contenidoVista = detalleView();
  } else if (basePath === 'gerencial') {
    if (usuarioActual.rol === 'gerente_general' || usuarioActual.rol === 'admin_it') {
      contenidoVista = gerencialView();
    } else {
      window.location.hash = '#/dashboard'; 
      return; 
    }
  } else if (basePath === 'admin') {
    if (usuarioActual.rol === 'admin_it') {
      contenidoVista = adminView();
    } else {
      window.location.hash = '#/dashboard'; 
      return;
    }
  } else {
    contenidoVista = dashboardView(); 
  }

  // ACTUALIZAMOS EL SIDEBAR (Le pasamos basePath en vez de hash)
  app.innerHTML = `
    <div class="flex h-screen bg-white">
      ${sidebar(basePath, usuarioActual)}
      <main class="flex-1 bg-white h-screen overflow-y-auto md:ml-[250px]">
        ${contenidoVista}
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