import { usuarioActual } from '../data.js';
import { headerComponent } from '../components/header.js';

export function dashboardView() {
  
  const nombreUsuario = usuarioActual?.nombre.split(' ')[0] || 'Usuario';
  
  // ============================================================================
  // 1. MOCK DATA & ESTADOS GLOBALES
  // ============================================================================
  
  /* 
    NOTA PARA EL BACKEND (Django/HTMX):
    Los KPIs ahora tienen una propiedad 'url' que inyecta parámetros GET (ej: ?prioridad=Máxima).
    La vista de 'Novedades' lee estos parámetros automáticamente y filtra los resultados.
  */
  const kpisDashboard = [
    { titulo: "Novedades activas", valor: "27", subtitulo: "5 actualizadas hoy", top: "border-t-[#298c71]", dot: "bg-[#298c71]", url: "#/novedades" },
    { titulo: "Prioridad máxima", valor: "3", subtitulo: "1 con vencimiento hoy", top: "border-t-red-600", dot: "bg-red-500", url: "#/novedades?prioridad=Máxima" },
    { titulo: "Pendiente colaboración", valor: "6", subtitulo: "Entre 5 gerencias", top: "border-t-yellow-400", dot: "bg-yellow-500", url: "#/novedades?estado=Pendiente de colaboración" },
    { titulo: "En seguimiento", valor: "4", subtitulo: "Sin avances +3 días", top: "border-t-gray-400", dot: "bg-gray-400", url: "#/novedades?estado=En seguimiento" }
  ];

  /* 
    TABLA DE ATENCIÓN: Alineada al nuevo Flujo Funcional (5 estados core).
    Aquí solo mostramos novedades que requieran acción (Estancadas, Esperando feedback, etc).
  */
  const novedadesUrgentes = [
    { id: 1, semaforo: "bg-yellow-400", titulo: "Demora en mantenimiento bomba P-204", gerencia: "Mantenimiento", prioridad: { texto: "Alta", clases: "text-orange-700 border-orange-200 bg-orange-50" }, estado: { texto: "Pendiente de colaboración", clases: "text-yellow-700 border-yellow-200 bg-yellow-50" }, antiguedad: "5 días", alerta: false },
    { id: 2, semaforo: "bg-red-500", titulo: "Pago pendiente a proveedor de transporte", gerencia: "Administración / Finanzas", prioridad: { texto: "Máxima", clases: "text-red-700 border-red-200 bg-red-50" }, estado: { texto: "En seguimiento", clases: "text-blue-700 border-blue-200 bg-blue-50" }, antiguedad: "8 días", alerta: true },
    { id: 4, semaforo: "bg-[#298c71]", titulo: "Nuevas normativas de seguridad patrimonial", gerencia: "SSHEQ", prioridad: { texto: "Media", clases: "text-blue-700 border-blue-200 bg-blue-50" }, estado: { texto: "Abierta", clases: "text-[#298c71] border-[#298c71]/30 bg-[#ebf2ee]" }, antiguedad: "Nueva", alerta: false }
  ];

  const feedbackPendiente = [
    { id: 1, origen: "Mantenimiento", destino: "Producción", tema: "Ventana de parada técnica P-204", dias: 3 },
    { id: 2, origen: "Administración", destino: "Comercio Exterior", tema: "Comprobantes de recepción en puerto", dias: 1 },
    { id: 6, origen: "Sistemas", destino: "Administración", tema: "Aprobación de enlace redundante", dias: 4 }
  ];

  // ============================================================================
  // 2. RENDERIZADO DE LA VISTA
  // ============================================================================
  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      
      <!-- Componente Header -->
      ${headerComponent('Dashboard', [{ texto: 'Dervinsa', url: '#/dashboard' }])}

      <!-- CONTENEDOR PRINCIPAL DE LA PANTALLA -->
      <div class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <!-- BIENVENIDA -->
        <div class="flex justify-between items-end mb-6">
          <div>
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">MIÉRCOLES, 9 DE SEPTIEMBRE</div>
            <h2 class="text-4xl font-extrabold text-[#0a2319] mb-1">Buen día, ${nombreUsuario}</h2>
            <p class="text-gray-500 text-sm">Este es tu resumen operativo para la jornada.</p>
          </div>
          <a href="#/crear" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-md flex items-center gap-2 active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            Nueva novedad
          </a>
        </div>

        <!-- KPIs DINÁMICOS CON ENLACES A FILTROS -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          ${kpisDashboard.map(kpi => `
            <a href="${kpi.url}" class="bg-white border border-gray-200 border-t-4 ${kpi.top} rounded-lg p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col group cursor-pointer">
              <h3 class="text-xs font-bold text-gray-700 mb-2">${kpi.titulo}</h3>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-3xl font-extrabold text-[#0a2319]">${kpi.valor}</span>
                <div class="w-1.5 h-1.5 rounded-full ${kpi.dot}"></div>
              </div>
              <p class="text-[10px] font-medium text-gray-500 group-hover:text-gray-800 transition-colors">${kpi.subtitulo}</p>
            </a>
          `).join('')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- TABLA: REQUIEREN ATENCIÓN -->
          <div class="lg:col-span-2 flex flex-col">
            
            <!-- ACÁ ESTÁ EL TÍTULO QUE SE HABÍA PERDIDO -->
            <div class="flex flex-row justify-between items-end mb-4 px-1 gap-2">
              <div>
                <h3 class="text-lg font-bold text-gray-800 leading-tight">Requieren atención</h3>
                <p class="text-xs sm:text-sm text-gray-500 mt-1">Temas críticos o sin avances.</p>
              </div>
              <a href="#/novedades" class="text-sm font-bold text-[#298c71] hover:text-[#1a4031] flex items-center gap-1 transition-colors shrink-0 pb-0.5">
                Ver todas <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
            
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex-1">
              <!-- Le decimos a la tabla que se comporte como un bloque en móvil, y como tabla en lg: -->
              <table class="w-full text-left border-collapse block lg:table">
                
                <!-- Ocultamos los encabezados en celular -->
                <thead class="hidden lg:table-header-group">
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="py-3 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest w-[40%]">Novedad</th>
                    <th class="py-3 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Gerencia</th>
                    <th class="py-3 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Prioridad</th>
                    <th class="py-3 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Estado</th>
                    <th class="py-3 px-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Antigüedad</th>
                  </tr>
                </thead>

                <tbody class="block lg:table-row-group">
                  ${novedadesUrgentes.map(nov => `
                    <!-- Convertimos el tr en un bloque apilable en móvil -->
                    <tr onclick="window.location.hash='#/detalle?id=${nov.id}'" class="block lg:table-row border-b border-gray-100 hover:bg-[#fbfcfb] transition-colors cursor-pointer group p-4 lg:p-0">
                      
                      <!-- Columna 1: Título -->
                      <td class="block lg:table-cell py-1 lg:py-3.5 px-0 lg:px-5 mb-3 lg:mb-0">
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 rounded-full ${nov.semaforo} mt-1.5 shrink-0 shadow-sm border border-black/5"></div>
                          <div>
                            <div class="font-bold text-[#0a2319] text-sm group-hover:text-[#298c71] transition-colors leading-snug">${nov.titulo}</div>
                          </div>
                        </div>
                      </td>
                      
                      <!-- Columna 2: Gerencia -->
                      <td class="flex justify-between items-center lg:table-cell py-1.5 lg:py-3.5 px-0 lg:px-5 text-sm text-gray-700 font-medium border-t border-gray-50 lg:border-none mt-2 lg:mt-0 pt-2 lg:pt-0">
                        <span class="lg:hidden text-[10px] font-bold text-gray-400 uppercase">Gerencia</span>
                        <span>${nov.gerencia}</span>
                      </td>
                      
                      <!-- Columna 3: Prioridad -->
                      <td class="flex justify-between items-center lg:table-cell py-1.5 lg:py-3.5 px-0 lg:px-5 text-center">
                        <span class="lg:hidden text-[10px] font-bold text-gray-400 uppercase">Prioridad</span>
                        <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${nov.prioridad.clases}">${nov.prioridad.texto}</span>
                      </td>
                      
                      <!-- Columna 4: Estado -->
                      <td class="flex justify-between items-center lg:table-cell py-1.5 lg:py-3.5 px-0 lg:px-5 text-center">
                        <span class="lg:hidden text-[10px] font-bold text-gray-400 uppercase">Estado</span>
                        <span class="inline-flex px-2 py-0.5 rounded text-[11px] font-bold border ${nov.estado.clases}">${nov.estado.texto}</span>
                      </td>
                      
                      <!-- Columna 5: Antigüedad -->
                      <td class="flex justify-between items-center lg:table-cell py-1.5 lg:py-3.5 px-0 lg:px-5 text-right font-bold ${nov.alerta ? 'text-red-500' : 'text-gray-500'} text-sm">
                        <span class="lg:hidden text-[10px] font-bold text-gray-400 uppercase">Antigüedad</span>
                        <span>${nov.antiguedad}</span>
                      </td>
                      
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- PANEL LATERAL: ESPERANDO FEEDBACK -->
          <div class="lg:col-span-1 flex flex-col">
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-lg font-bold text-gray-800">Pendiente colaboración</h3>
                  <p class="text-sm text-gray-500">Colaboraciones requeridas sin respuesta.</p>
                </div>
                <span class="w-6 h-6 rounded bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center">6</span>
              </div>
              
              <div class="flex-1 flex flex-col gap-3">
                ${feedbackPendiente.map(fb => `
                  <div onclick="window.location.hash='#/detalle?id=${fb.id}'" class="p-3.5 rounded-lg border border-gray-200 bg-white hover:border-[#298c71]/50 hover:shadow-sm transition-all cursor-pointer group">
                    <div class="flex items-center gap-2 mb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                      <span class="text-gray-600">${fb.origen}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      <span class="text-[#298c71]">${fb.destino}</span>
                    </div>
                    <div class="text-sm font-bold text-[#0a2319] leading-snug mb-2 group-hover:text-[#298c71] transition-colors">${fb.tema}</div>
                    
                    <div class="flex items-center justify-between">
                      <div class="text-[11px] font-bold ${fb.dias > 2 ? 'text-red-500' : 'text-yellow-600'} flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ${fb.dias} ${fb.dias === 1 ? 'día' : 'días'} sin respuesta
                      </div>
                      <svg class="text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <!-- Redirige con el filtro "Esperando feedback" ya aplicado -->
              <a href="#/novedades?estado=Pendiente de colaboración" class="w-full mt-4 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors text-center block">
                Ver todos
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;
}