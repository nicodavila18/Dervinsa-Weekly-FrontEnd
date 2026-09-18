import { headerComponent } from '../components/header.js';

/**
 * VISTA: Listado de Novedades
 * Tabla central operativa. Filtros completos sincronizados con la URL (HTMX-ready).
 */
export function novedadesView() {
  
  // 1. MOCK DATA: Alineada con el Flujo Funcional (RN-14 y RN-16)
  const novedadesMock = [
    { id: 1, titulo: "Demora en mantenimiento bomba P-204", tipo: "Seguimiento", fechaCreacion: "28/08/2026", gerencia: "Mantenimiento", prioridad: { texto: "Alta", clases: "text-orange-700 bg-orange-50 border-orange-200" }, estado: { texto: "Pendiente de colaboración", clases: "text-yellow-700 bg-yellow-50 border-yellow-200" }, fechaLimite: "05/09/2026", semaforo: "bg-yellow-400", colaboracion: "@Producción", actualizacion: "Hoy, 09:12", antiguedad: "5 días", alerta: false },
    { id: 2, titulo: "Pago pendiente a proveedor de transporte", tipo: "Seguimiento", fechaCreacion: "25/08/2026", gerencia: "Administración", prioridad: { texto: "Máxima", clases: "text-red-700 bg-red-50 border-red-200" }, estado: { texto: "En seguimiento", clases: "text-blue-700 bg-blue-50 border-blue-200" }, fechaLimite: "03/09/2026", semaforo: "bg-red-500", colaboracion: "@Comercio Exterior", actualizacion: "Hace 4 días", antiguedad: "18 días", alerta: true },
    { id: 3, titulo: "Llegada de contenedores importados", tipo: "Aviso", fechaCreacion: "31/08/2026", gerencia: "Depósito / Operaciones", prioridad: { texto: "Baja", clases: "text-gray-700 bg-gray-50 border-gray-200" }, estado: { texto: "Resuelta", clases: "text-gray-500 bg-gray-100 border-gray-200" }, fechaLimite: null, semaforo: "bg-[#298c71]", colaboracion: "—", actualizacion: "Hoy, 08:45", antiguedad: "1 día", alerta: false },
    { id: 4, titulo: "Nuevas normativas de seguridad patrimonial", tipo: "Aviso", fechaCreacion: "30/08/2026", gerencia: "SSHEQ", prioridad: { texto: "Media", clases: "text-blue-700 bg-blue-50 border-blue-200" }, estado: { texto: "Abierta", clases: "text-[#298c71] bg-[#ebf2ee] border-[#298c71]/30" }, fechaLimite: null, semaforo: "bg-[#298c71]", colaboracion: "—", actualizacion: "Hoy, 10:05", antiguedad: "Nueva", alerta: false }
  ];

  // ============================================================================
  // 2. LÓGICA DE FILTRADO POR URL (Combinando múltiples filtros)
  // ============================================================================
  const hashParts = window.location.hash.split('?');
  const queryParams = new URLSearchParams(hashParts[1] || '');
  
  const filtroGerencia = queryParams.get('gerencia');
  const filtroTipo = queryParams.get('tipo');
  const filtroPrioridad = queryParams.get('prioridad');
  const filtroEstado = queryParams.get('estado');

  // Cadena de filtros reactiva
  let novedadesFiltradas = novedadesMock;

  if (filtroGerencia) novedadesFiltradas = novedadesFiltradas.filter(n => n.gerencia === filtroGerencia);
  if (filtroTipo) novedadesFiltradas = novedadesFiltradas.filter(n => n.tipo === filtroTipo);
  if (filtroPrioridad) novedadesFiltradas = novedadesFiltradas.filter(n => n.prioridad.texto === filtroPrioridad);
  if (filtroEstado) novedadesFiltradas = novedadesFiltradas.filter(n => n.estado.texto === filtroEstado);

  // ============================================================================
  // 3. EVENT LISTENERS PARA LOS SELECTS
  // ============================================================================
  setTimeout(() => {
    const selectsFiltros = document.querySelectorAll('.filtro-dinamico');
    
    selectsFiltros.forEach(select => {
      select.addEventListener('change', (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        const currentParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        
        if (paramValue) {
          currentParams.set(paramName, paramValue);
        } else {
          currentParams.delete(paramName);
        }
        
        window.location.hash = `#/novedades?${currentParams.toString()}`; 
      });
    });
  }, 100);

  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      ${headerComponent('Novedades', [{ texto: 'Dervinsa', url: '#/dashboard' }])}

      <div class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <div class="flex justify-between items-end mb-6">
          <div>
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">SEGUIMIENTO OPERATIVO</div>
            <h2 class="text-4xl font-extrabold text-[#0a2319] mb-1">Novedades</h2>
            <p class="text-gray-500 text-sm">Buscá, filtrá y gestioná los temas de todas las gerencias.</p>
          </div>
          <a href="#/crear" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-md flex items-center gap-2 active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            Nueva novedad
          </a>
        </div>

        <!-- ÁREA DE FILTROS -->
        <div class="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
          <div class="flex flex-wrap items-center gap-3 mb-5">
            
            <div class="relative flex-1 min-w-[200px]">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Buscar por título o gerencia..." class="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#298c71] focus:border-[#298c71] transition-all">
            </div>
            
            <select name="gerencia" class="filtro-dinamico w-36 px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none focus:border-[#298c71] appearance-none bg-white cursor-pointer font-medium">
              <option value="">Gerencia (Todas)</option>
              <option value="Administración" ${filtroGerencia === 'Administración' ? 'selected' : ''}>Administración</option>
              <option value="Comercio Exterior" ${filtroGerencia === 'Comercio Exterior' ? 'selected' : ''}>Comercio Exterior</option>
              <option value="Comercio Local" ${filtroGerencia === 'Comercio Local' ? 'selected' : ''}>Comercio Local</option>
              <option value="Depósito / Operaciones" ${filtroGerencia === 'Depósito / Operaciones' ? 'selected' : ''}>Depósito</option>
              <option value="Mantenimiento" ${filtroGerencia === 'Mantenimiento' ? 'selected' : ''}>Mantenimiento</option>
              <option value="Producción" ${filtroGerencia === 'Producción' ? 'selected' : ''}>Producción</option>
              <option value="SSHEQ" ${filtroGerencia === 'SSHEQ' ? 'selected' : ''}>SSHEQ</option>
            </select>

            <select name="tipo" class="filtro-dinamico w-32 px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none focus:border-[#298c71] appearance-none bg-white cursor-pointer font-medium">
              <option value="">Tipo (Todos)</option>
              <option value="Seguimiento" ${filtroTipo === 'Seguimiento' ? 'selected' : ''}>Seguimiento</option>
              <option value="Aviso" ${filtroTipo === 'Aviso' ? 'selected' : ''}>Aviso</option>
            </select>
            
            <!-- Filtro de Prioridad (Alineado a RN-16) -->
            <select name="prioridad" class="filtro-dinamico w-32 px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none focus:border-[#298c71] appearance-none bg-white cursor-pointer font-medium">
              <option value="">Prioridad (Todas)</option>
              <option value="Baja" ${filtroPrioridad === 'Baja' ? 'selected' : ''}>Baja</option>
              <option value="Media" ${filtroPrioridad === 'Media' ? 'selected' : ''}>Media</option>
              <option value="Alta" ${filtroPrioridad === 'Alta' ? 'selected' : ''}>Alta</option>
              <option value="Máxima" ${filtroPrioridad === 'Máxima' ? 'selected' : ''}>Máxima</option>
            </select>
            
            <!-- Filtro de Estado (Alineado a RN-14) -->
            <select name="estado" class="filtro-dinamico w-36 px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-600 focus:outline-none focus:border-[#298c71] appearance-none bg-white cursor-pointer font-medium">
              <option value="">Estado (Todos)</option>
              <option value="Abierta" ${filtroEstado === 'Abierta' ? 'selected' : ''}>Abierta</option>
              <option value="En seguimiento" ${filtroEstado === 'En seguimiento' ? 'selected' : ''}>En seguimiento</option>
              <option value="Pendiente de colaboración" ${filtroEstado === 'Pendiente de colaboración' ? 'selected' : ''}>Pendiente de colab.</option>
              <option value="Resuelta" ${filtroEstado === 'Resuelta' ? 'selected' : ''}>Resuelta</option>
            </select>
            
            <button class="px-4 py-2 rounded-md border border-gray-300 text-sm font-bold text-gray-600 hover:border-gray-400 hover:text-gray-800 flex items-center gap-2 transition-colors shrink-0 bg-white" onclick="window.location.hash='#/novedades'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              Limpiar
            </button>
          </div>
          
          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#298c71] focus:ring-[#298c71] cursor-pointer">
                <span class="text-sm text-gray-700 font-medium select-none">Con fecha límite vencida</span>
              </label>
            </div>
            <!-- Contador Dinámico -->
            <span class="text-[11px] font-extrabold text-[#298c71] bg-[#ebf2ee] px-2 py-1 rounded tracking-widest uppercase">${novedadesFiltradas.length} Novedades Encontradas</span>
          </div>
        </div>

        <!-- TABLA DINÁMICA -->
        <div id="tabla-novedades" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-[30%]">Novedad</th>
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Tipo</th>
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Gerencia</th>
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Prioridad</th>
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Estado / Límite</th>
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Colaboración</th>
                <th class="py-3.5 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Actualización</th>
                <th class="py-3.5 px-4"></th>
              </tr>
            </thead>
            <tbody>
              <!-- ESTADO VACÍO -->
              ${novedadesFiltradas.length === 0 ? `
                <tr>
                  <td colspan="8" class="py-12 text-center text-gray-400 text-sm font-medium">
                    No se encontraron novedades aplicando estos filtros.
                  </td>
                </tr>
              ` : ''}

              <!-- MAPEO -->
              ${novedadesFiltradas.map(nov => `
                <tr onclick="window.location.hash='#/detalle?id=${nov.id}'" class="border-b border-gray-100 hover:bg-[#fbfcfb] transition-colors cursor-pointer group">
                  <td class="py-3.5 px-5">
                    <div class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full ${nov.semaforo} mt-2.5 shrink-0 shadow-sm border border-black/5"></div>
                      <div>
                        <div class="font-bold text-[#0a2319] text-sm group-hover:text-[#298c71] transition-colors leading-snug mb-0.5">${nov.titulo}</div>
                        <div class="text-[11px] text-gray-400 font-medium">Creada el ${nov.fechaCreacion}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-5 text-sm text-gray-500 font-medium">${nov.tipo}</td>
                  <td class="py-3.5 px-5 text-sm text-gray-700 font-medium">${nov.gerencia}</td>
                  <td class="py-3.5 px-5 text-center">
                    <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${nov.prioridad.clases}">${nov.prioridad.texto}</span>
                  </td>
                  <td class="py-3.5 px-5 text-center">
                    <div class="flex flex-col items-center gap-1">
                      <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${nov.estado.clases}">${nov.estado.texto}</span>
                      ${nov.fechaLimite ? `<span class="text-[10px] font-bold text-gray-400 flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${nov.fechaLimite}</span>` : ''}
                    </div>
                  </td>
                  <td class="py-3.5 px-5 text-sm font-bold text-[#298c71]">${nov.colaboracion}</td>
                  <td class="py-3.5 px-5 text-right">
                    <div class="text-sm font-medium text-gray-700">${nov.actualizacion}</div>
                    <div class="text-[11px] font-bold ${nov.alerta ? 'text-red-500' : 'text-gray-400'} mt-0.5">${nov.antiguedad}</div>
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <svg class="inline-block text-gray-300 group-hover:text-[#298c71] transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}