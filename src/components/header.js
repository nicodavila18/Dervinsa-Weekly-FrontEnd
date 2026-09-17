export function headerComponent(vistaActual, breadcrumbs = []) {
  
  // 1. INICIALIZAMOS LA "MEMORIA" DE NOTIFICACIONES (Solo si no existe)
  if (!window.notificaciones) {
    window.notificaciones = [
      { id: 1, tipo: 'mencion', titulo: 'Mantenimiento te mencionó', mensaje: '@GG Necesitamos aprobación para repuestos P-204', leida: false, url: '#/detalle' },
      { id: 2, tipo: 'respuesta', titulo: 'Nueva respuesta', mensaje: 'Producción comentó en "Acopio de materias"', leida: false, url: '#/detalle' },
      { id: 3, tipo: 'aviso', titulo: 'Novedad publicada', mensaje: 'Tu reporte semanal se guardó correctamente', leida: true, url: '#/novedades' }
    ];
  }

  // Calculamos cuántas faltan leer
  const noLeidas = window.notificaciones.filter(n => !n.leida);
  const cantidad = noLeidas.length;

  const linksHtml = breadcrumbs.map(link => `
    <a href="${link.url}" class="hover:text-[#1a4031] transition-colors font-medium">${link.texto}</a>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 18 6-6-6-6"/></svg>
  `).join('');

  return `
    <div class="bg-white border-b border-gray-200 px-10 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm shrink-0">
      
      <div class="flex items-center gap-2 text-sm text-gray-500">
        ${linksHtml}
        <span class="font-bold text-gray-800">${vistaActual}</span>
      </div>
      
      <div class="flex items-center gap-4 relative">
        <span class="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-bold flex items-center gap-1.5">
          <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Prototipo
        </span>
        
        <!-- CONTENEDOR DE LA CAMPANITA Y EL DROPDOWN -->
        <div class="relative">
          
          <!-- BOTÓN CAMPANITA -->
          <button id="btn-campanita" onclick="toggleCampanita(event)" class="relative p-1.5 bg-white rounded border border-gray-200 text-gray-500 hover:text-[#1a4031] hover:border-[#1a4031] transition-colors shadow-sm">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
             
             <!-- EL CONTADOR DINÁMICO -->
             ${cantidad > 0 ? `
               <span class="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white shadow-sm">${cantidad}</span>
             ` : ''}
          </button>

          <!-- EL MODAL / DROPDOWN (Oculto por defecto) -->
          <div id="dropdown-notificaciones" class="hidden absolute top-10 right-0 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-[70] flex flex-col cursor-default origin-top-right" onclick="event.stopPropagation()">
            
            <div class="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
               <span class="text-[10px] font-extrabold text-gray-700 uppercase tracking-widest">Notificaciones</span>
               ${cantidad > 0 ? `<button onclick="marcarTodasLeidas()" class="text-[10px] text-[#298c71] hover:underline font-bold">Marcar leídas</button>` : ''}
            </div>
            
            <div class="max-h-80 overflow-y-auto">
               ${window.notificaciones.length === 0 ? `
                  <div class="p-6 text-center text-sm text-gray-400 font-medium">No hay notificaciones</div>
               ` : window.notificaciones.map(n => `
                  <div onclick="leerNotificacion(${n.id}, '${n.url}')" class="p-4 border-b border-gray-100 hover:bg-[#ebf2ee]/50 cursor-pointer transition-colors ${n.leida ? 'opacity-60' : 'bg-[#fbfcfb]'} group">
                     <div class="flex items-start gap-3">
                        <div class="mt-1 w-2 h-2 rounded-full shrink-0 ${n.leida ? 'bg-transparent' : 'bg-red-500 shadow-sm'}"></div>
                        <div>
                           <h4 class="text-xs font-bold text-[#0a2319] group-hover:text-[#298c71] transition-colors">${n.titulo}</h4>
                           <p class="text-[11px] text-gray-600 mt-1 leading-snug">${n.mensaje}</p>
                        </div>
                     </div>
                  </div>
               `).join('')}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  `;
}