import { icon } from './icons.js';

/**
 * COMPONENTE: Sidebar (Barra de Navegación Lateral)
 * @param {string} activeRoute - La ruta actual de la URL para pintar el botón activo.
 * @param {object} usuario - El objeto del usuario logueado para validar permisos.
 */
export function sidebar(activeRoute = 'dashboard', usuario) {
  
  // LOGICA DE PERMISOS: Solo el Gerente General y el Admin de IT pueden ver la Vista Gerencial.
  const puedeVerAdministracion = usuario.rol === 'gerente_general' || usuario.rol === 'admin_it';

  return `
    <aside class="fixed left-0 top-0 z-50 w-[250px] bg-[#1a4031] text-[#dbe9e1] flex flex-col h-screen border-r border-white/10">
      
      <div class="flex items-center gap-3 h-20 px-6 border-b border-white/10">
        <div class="flex items-center justify-center w-10 h-10 bg-white rounded-full p-1 shrink-0">
           <img src="/logo-redondo.png" alt="Dervinsa" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="text-white font-extrabold text-lg tracking-wide leading-none">DERVINSA</span>
          <span class="text-green-300 text-[9px] font-bold tracking-widest uppercase mt-1">Sistema Weekly</span>
        </div>
      </div>

      <nav class="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
        <span class="px-2 pb-2 text-[#8ea79a] text-[10px] font-bold tracking-widest uppercase">Espacio de trabajo</span>
        
        <a href="#/dashboard" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'dashboard' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
          ${icon('dashboard', 18)} Dashboard
        </a>
        
        <a href="#/novedades" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'novedades' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
          ${icon('list', 18)} Novedades
        </a>

        <a href="#/weekly" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'weekly' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
          ${icon('calendar', 18)} Weekly
        </a>

        <a href="#/crear" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'crear' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
          ${icon('plus', 18)} Crear novedad
        </a>

        <!-- RENDERIZADO CONDICIONAL DE PERMISOS -->
        <!-- Si 'puedeVerAdministracion' es true, dibuja el HTML. Si es false, dibuja un texto vacío ('') -->
        ${puedeVerAdministracion ? `
          <div class="h-px w-full bg-white/10 my-4"></div>
          <span class="px-2 pb-2 text-[#8ea79a] text-[10px] font-bold tracking-widest uppercase">Administración</span>

          <a href="#/gerencial" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'gerencial' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
            ${icon('shield', 18)} Vista Gerencial
          </a>
        ` : ''}
      </nav>

      <!-- SECCIÓN DEL USUARIO DINÁMICA Y CERRAR SESIÓN -->
      <div class="flex items-center justify-between h-20 px-5 border-t border-white/10 shrink-0">
        
        <!-- Info del usuario -->
        <div class="flex items-center gap-3 min-w-0">
          <div class="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-[#d6e8a7] text-[#1a4031] text-xs font-extrabold shadow-inner">
            ${usuario.nombre.split(' ').map(n => n[0]).join('')}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-[#81998c] text-[9px] tracking-widest uppercase mb-0.5">${usuario.gerencia}</span>
            <strong class="text-white text-sm truncate leading-none">${usuario.nombre}</strong>
          </div>
        </div>

        <!-- Botón de Encendido / Cerrar Sesión -->
        <button 
          id="btn-logout" 
          class="text-[#298c71] hover:text-[#d4e6a1] transition-all duration-200 p-2.5 rounded-full hover:bg-white/10 active:scale-90 shadow-sm" 
          title="Cerrar sesión"
        >
          <!-- Ícono de Power (Consola) -->
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </button>

      </div>
    </aside>
  `;
}