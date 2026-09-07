import { icon } from './icons.js';

export function sidebar(activeRoute = 'dashboard') {
  return `
    <!-- Agregamos 'fixed left-0 top-0 h-screen' para que flote y no empuje el contenido -->
    <aside class="fixed left-0 top-0 z-50 w-[250px] bg-[#1a4031] text-[#dbe9e1] flex flex-col h-screen border-r border-white/10">
      
      <!-- Logo y Marca -->
      <div class="flex items-center gap-3 h-20 px-6 border-b border-white/10">
        <div class="flex items-center justify-center w-10 h-10 bg-white rounded-full p-1 shrink-0">
           <!-- Recordá poner esta imagen en la carpeta 'public' -->
           <img src="/logo-redondo.png" alt="Dervinsa" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="text-white font-extrabold text-lg tracking-wide leading-none">DERVINSA</span>
          <span class="text-green-300 text-[9px] font-bold tracking-widest uppercase mt-1">Sistema Weekly</span>
        </div>
      </div>

      <!-- Navegación -->
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

        <!-- Separador para Administración -->
        <div class="h-px w-full bg-white/10 my-4"></div>
        <span class="px-2 pb-2 text-[#8ea79a] text-[10px] font-bold tracking-widest uppercase">Administración</span>

        <a href="#/gerencial" class="flex items-center gap-3 h-11 px-3 rounded-lg text-sm font-semibold transition-colors ${activeRoute === 'gerencial' ? 'bg-[#265b44] text-white' : 'text-[#c7d8ce] hover:bg-white/5 hover:text-white'}">
          ${icon('shield', 18)} Vista Gerencial
        </a>
      </nav>

      <!-- Usuario -->
      <div class="flex items-center gap-3 h-20 px-5 border-t border-white/10 shrink-0">
        <div class="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-[#d6e8a7] text-[#1a4031] text-xs font-extrabold">JP</div>
        <div class="flex flex-col min-w-0">
          <span class="text-[#81998c] text-[9px] tracking-widest uppercase mb-0.5">Usuario actual</span>
          <strong class="text-white text-sm truncate leading-none">Juan Pérez</strong>
        </div>
      </div>
    </aside>
  `;
}