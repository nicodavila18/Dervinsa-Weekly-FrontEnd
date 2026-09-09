/**
 * VISTA: Listado de Novedades
 * Implementa filtros y tabla optimizada (alta densidad de datos).
 */
export function novedadesView() {
  
  const novedadesMock = [
    {
      id: 1,
      titulo: "Confirmar disponibilidad de materia prima",
      fechaCreacion: "28/08/2026",
      gerencia: "Comercio Local",
      prioridad: { texto: "Alta", clases: "text-orange-700 bg-orange-50 border-orange-200" },
      estado: { texto: "Esperando feedback", clases: "text-yellow-700 bg-yellow-50 border-yellow-200" },
      semaforo: "bg-yellow-400",
      colaboracion: "@Producción",
      actualizacion: "Hoy, 09:12",
      antiguedad: "5 días",
      alerta: false
    },
    {
      id: 2,
      titulo: "Pago pendiente a proveedor de transporte",
      fechaCreacion: "25/08/2026",
      gerencia: "Administración",
      prioridad: { texto: "Máxima", clases: "text-red-700 bg-red-50 border-red-200" },
      estado: { texto: "Bloqueada", clases: "text-red-700 bg-red-50 border-red-200" },
      semaforo: "bg-red-500",
      colaboracion: "@Comercio Exterior",
      actualizacion: "Ayer, 17:30",
      antiguedad: "8 días",
      alerta: true
    },
    {
      id: 3,
      titulo: "Mantenimiento preventivo bomba P-204",
      fechaCreacion: "27/08/2026",
      gerencia: "Mantenimiento",
      prioridad: { texto: "Media", clases: "text-blue-700 bg-blue-50 border-blue-200" },
      estado: { texto: "En seguimiento", clases: "text-[#298c71] bg-[#ebf2ee] border-[#298c71]/30" },
      semaforo: "bg-yellow-400",
      colaboracion: "@Producción",
      actualizacion: "Hoy, 08:45",
      antiguedad: "6 días",
      alerta: false
    },
    {
      id: 4,
      titulo: "Actualizar matriz de riesgos operativos",
      fechaCreacion: "30/08/2026",
      gerencia: "SSHEQ",
      prioridad: { texto: "Media", clases: "text-blue-700 bg-blue-50 border-blue-200" },
      estado: { texto: "En seguimiento", clases: "text-[#298c71] bg-[#ebf2ee] border-[#298c71]/30" },
      semaforo: "bg-green-500",
      colaboracion: "—",
      actualizacion: "Hoy, 10:05",
      antiguedad: "3 días",
      alerta: false
    }
  ];

  return `
    <div class="bg-white min-h-screen -m-8 flex flex-col relative overflow-hidden">
      
      <!-- BARRA SUPERIOR -->
      <div class="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center shrink-0">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="hover:text-[#1a4031] cursor-pointer transition-colors font-medium">Dervinsa</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          <span class="font-bold text-gray-800">Novedades</span>
        </div>
        
        <div class="flex items-center gap-4">
          <span class="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Prototipo
          </span>
          <button class="p-2 bg-gray-50 rounded-full border border-gray-200 text-gray-500 hover:text-[#1a4031] transition-colors shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
        </div>
      </div>

      <!-- CONTENEDOR PRINCIPAL -->
      <div class="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-10 py-8">
        
        <!-- ENCABEZADO Y BOTÓN NUEVA -->
        <div class="flex justify-between items-end mb-6">
          <div>
            <h2 class="text-3xl font-extrabold text-[#0a2319] mb-1">Novedades</h2>
            <p class="text-gray-500 text-sm">Seguimiento de temas y necesidades entre gerencias.</p>
          </div>
          <a href="#/crear" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Nueva novedad
          </a>
        </div>

        <!-- ÁREA DE FILTROS COMPACTA -->
        <div class="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            
            <!-- Búsqueda -->
            <div class="relative flex-1 min-w-[200px]">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Buscar por título o gerencia..." class="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] focus:border-transparent transition-all">
            </div>
            
            <!-- Desplegables ajustados -->
            <select class="w-40 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#298c71] appearance-none bg-white cursor-pointer">
              <option>Gerencia</option>
            </select>
            <select class="w-32 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#298c71] appearance-none bg-white cursor-pointer">
              <option>Prioridad</option>
            </select>
            <select class="w-36 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#298c71] appearance-none bg-white cursor-pointer">
              <option>Estado</option>
            </select>
            <select class="w-32 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#298c71] appearance-none bg-white cursor-pointer">
              <option>Semáforo</option>
            </select>
            
            <button class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
              Más filtros
            </button>
          </div>
          
          <!-- Toggles y Contador -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer group">
                <div class="relative">
                  <input type="checkbox" class="sr-only">
                  <div class="block bg-gray-200 w-9 h-5 rounded-full group-hover:bg-gray-300 transition-colors"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform"></div>
                </div>
                <span class="text-sm text-gray-600 font-medium">Esperando feedback</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <div class="relative">
                  <input type="checkbox" class="sr-only">
                  <div class="block bg-gray-200 w-9 h-5 rounded-full group-hover:bg-gray-300 transition-colors"></div>
                  <div class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform"></div>
                </div>
                <span class="text-sm text-gray-600 font-medium">Con fecha límite</span>
              </label>
            </div>
            <span class="text-xs text-gray-400 font-medium tracking-wide">10 NOVEDADES</span>
          </div>
        </div>

        <!-- TABLA DE NOVEDADES OPTIMIZADA -->
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="py-3 px-5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider w-[35%]">Novedad</th>
                <th class="py-3 px-5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Gerencia</th>
                <th class="py-3 px-5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-center">Prioridad</th>
                <th class="py-3 px-5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-center">Estado</th>
                <th class="py-3 px-5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">Colaboración</th>
                <th class="py-3 px-5 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider text-right">Actualización</th>
                <th class="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              ${novedadesMock.map(nov => `
                <tr class="border-b border-gray-100 hover:bg-[#fbfcfb] transition-colors cursor-pointer group">
                  
                  <td class="py-3 px-5">
                    <div class="flex items-start gap-3">
                      <div class="w-2.5 h-2.5 rounded-full ${nov.semaforo} mt-1.5 shrink-0 shadow-sm border border-black/5"></div>
                      <div>
                        <!-- Tipografía ajustada a text-sm para mayor densidad -->
                        <div class="font-bold text-[#0a2319] text-sm group-hover:text-[#298c71] transition-colors leading-snug mb-0.5">${nov.titulo}</div>
                        <div class="text-[11px] text-gray-400 font-medium">Creada ${nov.fechaCreacion}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td class="py-3 px-5 text-sm text-gray-600 font-medium">
                    ${nov.gerencia}
                  </td>
                  
                  <td class="py-3 px-5 text-center">
                    <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${nov.prioridad.clases}">
                      ${nov.prioridad.texto}
                    </span>
                  </td>
                  
                  <td class="py-3 px-5 text-center">
                    <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${nov.estado.clases}">
                      ${nov.estado.texto}
                    </span>
                  </td>
                  
                  <td class="py-3 px-5 text-sm font-bold text-[#298c71]">
                    ${nov.colaboracion}
                  </td>
                  
                  <td class="py-3 px-5 text-right">
                    <div class="text-sm font-medium text-gray-700">${nov.actualizacion}</div>
                    <div class="text-[11px] font-bold ${nov.alerta ? 'text-red-500' : 'text-gray-400'} mt-0.5">${nov.antiguedad}</div>
                  </td>
                  
                  <td class="py-3 px-4 text-right">
                    <svg class="inline-block text-gray-300 group-hover:text-[#298c71] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <!-- PAGINACIÓN COMPACTA -->
          <div class="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
            <span class="text-xs text-gray-500 font-medium">Mostrando <strong class="text-gray-700">4</strong> de <strong>10</strong> novedades</span>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-400 bg-gray-50 cursor-not-allowed">Anterior</button>
              <button class="w-8 h-8 rounded-md text-xs font-bold text-white bg-[#1a4031] flex items-center justify-center shadow-sm">1</button>
              <button class="px-3 py-1.5 rounded-md border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white hover:border-gray-300 transition-colors bg-white shadow-sm">Siguiente</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  `;
}