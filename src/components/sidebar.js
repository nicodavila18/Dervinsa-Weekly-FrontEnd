import { icon } from './icons.js';

export function sidebar(activeRoute = 'dashboard', usuario) {
  
  // 1. VARIABLES DE PERMISOS
  // ¿Ve la sección Administración? (GG y Sistemas)
  const puedeVerAdministracion = usuario.rol === 'gerente_general' || usuario.rol === 'admin_it';
  
  // ¿Es de Sistemas? (Solo para el botón de Panel IT)
  const esAdminIT = usuario.rol === 'admin_it';

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
          ${icon('plus', 18)} Crear Novedad
        </a>

        <!-- SECCIÓN ADMINISTRACIÓN (Condicional) -->
        ${puedeVerAdministracion ? `
          <div class="h-px w-full bg-white/10 my-4"></div>
          <span class="px-2 pb-2 text-[#8ea79a] text-[10px] font-bold tracking-widest uppercase">Administración</span>

          <a href="#/gerencial" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'gerencial' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
            ${icon('shield', 18)} Vista Gerencial
          </a>

          <!-- BOTÓN PANEL IT (Doble Condicional: Solo Sistemas lo ve) -->
          ${esAdminIT ? `
            <a href="#/admin" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'admin' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Panel IT
            </a>
          ` : ''}

        ` : ''}
      </nav>

      <!-- SECCIÓN DEL USUARIO DINÁMICA Y CERRAR SESIÓN -->
      <div class="flex items-center justify-between h-20 px-5 border-t border-white/10 shrink-0">
        <div class="flex items-center gap-3 min-w-0">
          <div class="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-[#d6e8a7] text-[#1a4031] text-xs font-extrabold shadow-inner">
            ${usuario.nombre.split(' ').map(n => n[0]).join('')}
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-[#81998c] text-[9px] tracking-widest uppercase mb-0.5">${usuario.gerencia}</span>
            <strong class="text-white text-sm truncate leading-none">${usuario.nombre}</strong>
          </div>
        </div>
        <button id="btn-logout" class="text-[#298c71] hover:text-[#d4e6a1] transition-all duration-200 p-2.5 rounded-full hover:bg-white/10 active:scale-90 shadow-sm" title="Cerrar sesión">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
        </button>
      </div>
    </aside>
  `;
}