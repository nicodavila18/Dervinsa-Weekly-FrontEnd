import { headerComponent } from '../components/header.js';

/**
 * VISTA: Gerencial (Nivel Dirección)
 * Foco ejecutivo sobre riesgos globales, bloqueos y colaboración entre áreas.
 */
export function gerencialView() {
  
  // ============================================================================
  // 1. MOCK DATA & KPIs (Alineados a los 5 estados core del sistema)
  // ============================================================================
  
  /* 
    BACKEND INFO (KPIs):
    Cada tarjeta tiene una 'url' que inyecta parámetros GET.
    La vista de 'Novedades' atrapará estos parámetros para mostrar la tabla pre-filtrada.
  */
  const kpis = [
    // Cambiamos el borde negro por rojo para dar sentido de urgencia
    { titulo: "Prioridad Máxima", valor: "5", subtitulo: "Requieren atención inmediata", top: "border-t-red-600", dot: "bg-red-500", url: "#/novedades?prioridad=Máxima" },
    // Reemplazamos "Bloqueadas" por "Estancadas" (Estado oficial)
    { titulo: "Estancadas", valor: "4", subtitulo: "Sin avances +3 días", top: "border-t-gray-500", dot: "bg-gray-500", url: "#/novedades?estado=Estancada" },
    { titulo: "Esperando feedback", valor: "6", subtitulo: "Cuellos de botella", top: "border-t-yellow-400", dot: "bg-yellow-500", url: "#/novedades?estado=Esperando feedback" },
    { titulo: "Vencen pronto", valor: "3", subtitulo: "Próximas 72 horas", top: "border-t-orange-400", dot: "bg-orange-500", url: "#/novedades" }, // (Opcional: sumar un filtro de fecha en novedades)
    { titulo: "Nuevas", valor: "12", subtitulo: "Ingresadas esta semana", top: "border-t-[#298c71]", dot: "bg-[#298c71]", url: "#/novedades?estado=Nueva" }
  ];

  /*
    BACKEND INFO (Colaboraciones):
    Esta lista busca en la DB todas las novedades donde 'gerenciaDestino' no sea null 
    y el estado sea 'Esperando feedback'. Agregamos 'id' para navegar al detalle.
  */
  const colaboraciones = [
    { id: 1, origen: { ini: "CL", nombre: "Comercio Local" }, destino: { ini: "PR", nombre: "Producción" }, estado: "espera respuesta de", dias: 3, alerta: true },
    { id: 2, origen: { ini: "PR", nombre: "Producción" }, destino: { ini: "MT", nombre: "Mantenimiento" }, estado: "espera respuesta de", dias: 2, alerta: true },
    { id: 4, origen: { ini: "IT", nombre: "Sistemas" }, destino: { ini: "AF", nombre: "Administración" }, estado: "espera respuesta de", dias: 4, alerta: true }
  ];

  const fechasLimite = [
    { id: 6, fecha: "HOY", texto: "Restablecer redundancia enlace", gerencia: "Sistemas", prioridad: "Máxima" },
    { id: 2, fecha: "03 SEP", texto: "Pago proveedor transporte", gerencia: "Administración", prioridad: "Máxima" },
    { id: 8, fecha: "04 SEP", texto: "Doc. de exportación", gerencia: "Comercio Ext.", prioridad: "Alta" },
    { id: 9, fecha: "05 SEP", texto: "Disponibilidad materia prima", gerencia: "Comercio Loc.", prioridad: "Alta" }
  ];

  /*
    BACKEND INFO (Temas Críticos):
    Acá el GG ve las novedades filtradas por prioridad "Máxima" o semáforo "Rojo".
    Se ajustaron los 'status' para que coincidan con los estados oficiales.
  */
  const temasCriticos = [
    { id: 2, semaforoEjecutivo: "Crítico", color: "bg-red-500", prioridad: "Máxima", pColor: "text-red-700 bg-red-50 border-red-200", titulo: "Pago pendiente a proveedor de transporte", gerencia: "Administración / Finanzas", status: "Estancada", sColor: "text-gray-600 bg-gray-100 border-gray-300", antiguedad: "8 días" },
    { id: 5, semaforoEjecutivo: "Atención", color: "bg-yellow-400", prioridad: "Alta", pColor: "text-orange-700 bg-orange-50 border-orange-200", titulo: "Regularizar documentación de exportación", gerencia: "Comercio Exterior", status: "Esperando feedback", sColor: "text-yellow-700 bg-yellow-50 border-yellow-200", antiguedad: "4 días" },
    { id: 6, semaforoEjecutivo: "Crítico", color: "bg-red-500", prioridad: "Máxima", pColor: "text-red-700 bg-red-50 border-red-200", titulo: "Restablecer redundancia del enlace de planta", gerencia: "Sistemas", status: "En curso", sColor: "text-blue-700 bg-blue-50 border-blue-200", antiguedad: "10 días" }
  ];

  // ============================================================================
  // 2. RENDERIZADO HTML
  // ============================================================================
  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      
      <!-- Componente Header -->
      ${headerComponent('Vista Gerencial', [{ texto: 'Dervinsa', url: '#/dashboard' }])}

      <div class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <div class="flex justify-between items-end mb-6">
          <div>
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">GERENCIA GENERAL</div>
            <h2 class="text-4xl font-extrabold text-[#0a2319] mb-1">Vista Gerencial</h2>
            <p class="text-gray-500 text-sm">Foco ejecutivo sobre riesgos, bloqueos y colaboración entre áreas.</p>
          </div>
          <div class="text-[11px] font-bold text-gray-500 flex items-center gap-1.5 bg-gray-50/50 border border-gray-200 px-3 py-1.5 rounded-md shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Información al 2 SEP, 11:30
          </div>
        </div>

        <!-- KPIs: DISEÑO CORPORATIVO (Ahora con links dinámicos) -->
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
          ${kpis.map(kpi => `
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

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          <!-- PANEL: COLABORACIÓN ENTRE GERENCIAS -->
          <div class="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-lg font-bold text-gray-800">Colaboración entre gerencias</h3>
                <p class="text-sm text-gray-500">Pedidos de respuesta abiertos o estancados.</p>
              </div>
              <a href="#/novedades?estado=Esperando feedback" class="px-3 py-1 bg-gray-50 text-gray-600 rounded text-xs font-bold border border-gray-200 hover:bg-gray-100 transition-colors">Ver todos</a>
            </div>
            
            <div class="flex-1 flex flex-col justify-center space-y-3">
              ${colaboraciones.map(col => `
                <!-- BACKEND INFO: Clickeando la fila viajamos al detalle de esa novedad -->
                <div onclick="window.location.hash='#/detalle?id=${col.id}'" class="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group bg-white">
                  <div class="flex items-center gap-3 w-44 shrink-0">
                    <div class="w-8 h-8 rounded bg-[#ebf2ee] text-[#1a4031] text-[11px] font-extrabold flex items-center justify-center border border-[#298c71]/20">${col.origen.ini}</div>
                    <span class="font-bold text-sm text-gray-800 group-hover:text-[#298c71] transition-colors">${col.origen.nombre}</span>
                  </div>
                  
                  <div class="flex-1 flex flex-col items-center px-2">
                    <span class="text-[10px] font-bold text-gray-400 mb-1">${col.estado}</span>
                    <div class="w-full h-px bg-gray-200 relative flex items-center justify-center">
                      <svg class="text-gray-300 absolute group-hover:translate-x-2 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 w-44 shrink-0">
                    <div class="w-8 h-8 rounded bg-gray-50 text-gray-600 text-[11px] font-extrabold flex items-center justify-center border border-gray-200">${col.destino.ini}</div>
                    <span class="font-bold text-sm text-gray-800">${col.destino.nombre}</span>
                  </div>

                  <div class="w-20 text-right shrink-0">
                    <span class="text-[11px] font-bold ${col.dias > 2 ? 'text-red-500' : 'text-yellow-600'} flex items-center justify-end gap-1.5"><div class="w-1.5 h-1.5 rounded-full ${col.dias > 2 ? 'bg-red-500' : 'bg-yellow-500'}"></div>${col.dias} días</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- PANEL: FECHAS LÍMITE -->
          <div class="xl:col-span-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
            <div class="mb-5">
              <h3 class="text-lg font-bold text-gray-800">Fechas límite</h3>
              <p class="text-sm text-gray-500">Próximos 7 días.</p>
            </div>
            
            <div class="space-y-3 flex-1 overflow-y-auto pr-1">
              ${fechasLimite.map(fl => `
                <div onclick="window.location.hash='#/detalle?id=${fl.id}'" class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-sm cursor-pointer transition-all bg-gray-50/30 group">
                  <div class="w-12 text-center shrink-0">
                    <span class="text-[9px] font-extrabold ${fl.fecha === 'HOY' ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-600 bg-white border-gray-200'} block py-1 border rounded shadow-sm">${fl.fecha}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-bold text-gray-800 truncate group-hover:text-[#298c71] transition-colors">${fl.texto}</h4>
                    <p class="text-[10px] font-bold text-gray-400 mt-0.5">${fl.gerencia}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          
        </div>

        <!-- PANEL: TEMAS CRÍTICOS -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-end mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 class="text-lg font-bold text-gray-800">Temas críticos</h3>
              <p class="text-sm text-gray-500">Prioridad máxima o semáforo rojo dictaminado por Dirección.</p>
            </div>
            <a href="#/novedades?prioridad=Máxima" class="text-sm font-bold text-[#298c71] hover:text-[#1a4031] flex items-center gap-1 transition-colors">
              Ver todas <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            ${temasCriticos.map(tc => `
              <div class="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-md transition-all flex flex-col bg-white">
                
                <div class="flex justify-between items-center mb-4">
                  <!-- Semáforo Ejecutivo (El que coloca el GG) -->
                  <div class="flex items-center gap-2" title="Semáforo Ejecutivo">
                    <div class="w-2 h-2 rounded-full ${tc.color}"></div>
                    <span class="text-xs font-bold text-gray-700">${tc.semaforoEjecutivo}</span>
                  </div>
                  <!-- Prioridad Operativa (La que colocó el creador) -->
                  <span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${tc.pColor}">${tc.prioridad}</span>
                </div>
                
                <h4 class="text-sm font-extrabold text-[#0a2319] leading-snug mb-1">${tc.titulo}</h4>
                <p class="text-[11px] font-bold text-gray-400 mb-5">${tc.gerencia}</p>
                
                <div class="flex justify-between items-center mb-5">
                  <span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${tc.sColor}">${tc.status}</span>
                  <span class="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    ${tc.antiguedad}
                  </span>
                </div>

                <!-- BACKEND INFO: El Gerente gestiona todo desde el Detalle. -->
                <div class="mt-auto pt-4 border-t border-gray-100">
                  <a href="#/detalle?id=${tc.id}" class="w-full py-2 rounded text-xs font-bold text-gray-600 border border-gray-200 bg-gray-50 hover:bg-white hover:border-[#298c71] hover:text-[#298c71] transition-colors text-center flex items-center justify-center gap-2 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    Ver y Gestionar
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}