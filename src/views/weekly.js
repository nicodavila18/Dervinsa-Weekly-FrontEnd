import { headerComponent } from '../components/header.js';

/**
 * VISTA: Reunión Gerencial (Weekly)
 * Tablero consolidado por gerencias. Botones, modales y enlaces 100% funcionales.
 */
export function weeklyView() {
  
  // ============================================================================
  // 1. MOCK DATA (Actualizado a objetos para soportar IDs y textos en el Modal)
  // ============================================================================
  const gerenciasWeekly = [
    {
      id: "produccion",
      iniciales: "PR",
      nombre: "Producción",
      temasCount: 3,
      estaSemana: [
        { id: 101, texto: "Optimizar el rendimiento de la línea de proceso", tipo: "Aviso" },
        { id: 102, texto: "Coordinar disponibilidad de materia prima", tipo: "Seguimiento" }
      ],
      problemas: [
        { id: 1, texto: "Demora en el mantenimiento de la bomba P-204", tipo: "Seguimiento" }
      ],
      colaboracion: {
        activa: true,
        gerencia: "@Mantenimiento",
        detalle: "Confirmar ventana de intervención",
        tiempo: "Espera 2d",
        urgente: false
      }
    },
    {
      id: "admin-finanzas",
      iniciales: "AF",
      nombre: "Administración", 
      temasCount: 3,
      estaSemana: [
        { id: 201, texto: "Programación de pagos de la semana", tipo: "Aviso" },
        { id: 202, texto: "Actualizar proyección de flujo financiero", tipo: "Aviso" }
      ],
      problemas: [
        { id: 2, texto: "Documentación pendiente de un proveedor de transporte", tipo: "Seguimiento" }
      ],
      colaboracion: {
        activa: true,
        gerencia: "@Comercio Exterior",
        detalle: "Enviar respaldo de recepción",
        tiempo: "Espera 1d",
        urgente: false
      }
    },
    {
      id: "deposito-operaciones",
      iniciales: "DO",
      nombre: "Depósito / Operaciones",
      temasCount: 3,
      estaSemana: [
        { id: 301, texto: "Ordenar zona de expedición", tipo: "Aviso" },
        { id: 302, texto: "Preparar capacidad para despachos del viernes", tipo: "Seguimiento" }
      ],
      problemas: [
        { id: 3, texto: "Diferencias de stock en envases retornables", tipo: "Seguimiento" }
      ],
      colaboracion: {
        activa: true,
        gerencia: "@Producción",
        detalle: "Validar consumos informados",
        tiempo: "Nuevo",
        urgente: true
      }
    },
    {
      id: "it",
      iniciales: "IT",
      nombre: "Sistemas",
      temasCount: 3,
      estaSemana: [
        { id: 401, texto: "Completar pruebas de conectividad en planta", tipo: "Seguimiento" },
        { id: 402, texto: "Actualizar equipos de la sala de reuniones", tipo: "Aviso" }
      ],
      problemas: [
        { id: 4, texto: "Enlace secundario sin redundancia activa", tipo: "Seguimiento" }
      ],
      colaboracion: {
        activa: true,
        gerencia: "@Administración",
        detalle: "Aprobar orden de compra",
        tiempo: "Espera 4d",
        urgente: false
      }
    },
    {
      id: "ssheq",
      iniciales: "SQ",
      nombre: "SSHEQ",
      temasCount: 2,
      estaSemana: [
        { id: 501, texto: "Recorrida de seguridad en sector de carga", tipo: "Aviso" },
        { id: 502, texto: "Actualizar matriz de riesgos operativos", tipo: "Seguimiento" }
      ],
      problemas: [],
      colaboracion: {
        activa: false
      }
    }
  ];

  // ============================================================================
  // 2. LÓGICA DE FILTRADO POR URL Y EVENTOS DEL MODAL
  // ============================================================================
  const hashParts = window.location.hash.split('?');
  const queryParams = new URLSearchParams(hashParts[1] || '');
  const filtroActual = queryParams.get('filtro') || 'todas';

  let gerenciasMostradas = gerenciasWeekly;
  if (filtroActual === 'problemas') gerenciasMostradas = gerenciasWeekly.filter(g => g.problemas.length > 0);
  if (filtroActual === 'feedback') gerenciasMostradas = gerenciasWeekly.filter(g => g.colaboracion.activa);
  if (filtroActual === 'urgentes') gerenciasMostradas = gerenciasWeekly.filter(g => g.colaboracion.urgente);

  const btnInactivo = "bg-white border border-gray-200 hover:bg-gray-50 text-gray-600";
  const btnActivo = "bg-[#1a4031] border border-[#1a4031] text-white";

  // Lógica del Modal Resumen (Se ejecuta tras renderizar)
  setTimeout(() => {
    window.abrirResumenWeekly = (gerenciaId) => {
      const gerencia = gerenciasWeekly.find(g => g.id === gerenciaId);
      if (!gerencia) return;

      const overlay = document.getElementById('weekly-modal-overlay');
      const container = document.getElementById('weekly-modal-container');
      const titulo = document.getElementById('modal-weekly-titulo');
      const contenido = document.getElementById('modal-weekly-contenido');
      
      titulo.innerHTML = `Resumen: <span class="text-[#298c71]">${gerencia.nombre}</span>`;
      
      // Armamos la lista para el modal
      let listaHtml = '<div class="space-y-2">';
      
      // Agregamos Problemas primero (Destacados)
      gerencia.problemas.forEach(p => {
        listaHtml += `
          <a href="#/detalle?id=${p.id}" class="flex items-start gap-3 p-3 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors group">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
            <div class="flex-1">
              <span class="text-sm font-bold text-gray-800 group-hover:text-orange-800 transition-colors">${p.texto}</span>
              <span class="block text-[10px] font-extrabold text-orange-600 uppercase mt-1">Requiere atención</span>
            </div>
            <svg class="text-orange-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        `;
      });

      // Luego agregamos el resto de temas
      gerencia.estaSemana.forEach(t => {
        listaHtml += `
          <a href="#/detalle?id=${t.id}" class="flex items-start gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-[#298c71]/50 hover:shadow-sm transition-all group">
            <div class="w-1.5 h-1.5 rounded-full bg-[#298c71]/40 mt-1.5 shrink-0"></div>
            <div class="flex-1">
              <span class="text-sm font-semibold text-gray-700 group-hover:text-[#1a4031] transition-colors">${t.texto}</span>
              <span class="block text-[10px] font-extrabold text-gray-400 uppercase mt-1">${t.tipo === 'Aviso' ? 'AVISO / INFORMATIVO' : 'TEMA CON SEGUIMIENTO'}</span>
            </div>
            <svg class="text-gray-300 group-hover:text-[#298c71] group-hover:translate-x-1 transition-all" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        `;
      });
      listaHtml += '</div>';

      contenido.innerHTML = listaHtml;

      // Mostrar modal
      overlay.classList.remove('hidden');
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        container.classList.remove('scale-95');
      });
    };

    window.cerrarModalWeekly = () => {
      const overlay = document.getElementById('weekly-modal-overlay');
      const container = document.getElementById('weekly-modal-container');
      overlay.classList.add('opacity-0');
      container.classList.add('scale-95');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    };
  }, 100);

  // ============================================================================
  // 3. RENDERIZADO HTML
  // ============================================================================
  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      ${headerComponent('Weekly', [{ texto: 'Dervinsa', url: '#/dashboard' }])}

      <div class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">REUNIÓN GERENCIAL</div>
            <h2 class="text-4xl font-extrabold text-[#0a2319] mb-1">Weekly</h2>
            <p class="text-gray-500 text-sm">Temas principales de la semana agrupados por gerencia.</p>
          </div>

          <div class="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm hover:border-gray-300 transition-colors cursor-pointer group">
            <div class="text-gray-400 group-hover:text-[#298c71] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="text-left">
              <span class="text-[10px] uppercase font-bold text-gray-400 block leading-tight">Semana seleccionada</span>
              <span class="text-sm font-extrabold text-gray-800">31 AGO — 6 SEP <span class="text-[#298c71]">2026</span></span>
            </div>
            <svg class="text-gray-400 ml-2 group-hover:translate-y-0.5 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>

        <!-- BARRA DE FILTROS -->
        <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
           <div class="flex flex-wrap items-center gap-2">
            <a href="#/weekly" class="px-4 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm ${filtroActual === 'todas' ? btnActivo : btnInactivo}">
              Todas <span class="${filtroActual === 'todas' ? 'opacity-80' : 'text-gray-400'} font-semibold ml-1">${gerenciasWeekly.length}</span>
            </a>
            <a href="#/weekly?filtro=problemas" class="px-4 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm ${filtroActual === 'problemas' ? btnActivo : btnInactivo}">
              Con problemas <span class="${filtroActual === 'problemas' ? 'opacity-80' : 'text-gray-400'} font-semibold ml-1">${gerenciasWeekly.filter(g => g.problemas.length > 0).length}</span>
            </a>
            <a href="#/weekly?filtro=feedback" class="px-4 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm ${filtroActual === 'feedback' ? btnActivo : btnInactivo}">
              Esperando feedback <span class="${filtroActual === 'feedback' ? 'opacity-80' : 'text-gray-400'} font-semibold ml-1">${gerenciasWeekly.filter(g => g.colaboracion.activa).length}</span>
            </a>
            <a href="#/weekly?filtro=urgentes" class="px-4 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm ${filtroActual === 'urgentes' ? btnActivo : btnInactivo}">
              Atención Urgente <span class="${filtroActual === 'urgentes' ? 'opacity-80' : 'text-gray-400'} font-semibold ml-1">${gerenciasWeekly.filter(g => g.colaboracion.urgente).length}</span>
            </a>
          </div>
          <div class="text-xs text-gray-400 font-medium flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Última consolidación: hoy, 08:30
          </div>
        </div>

        <!-- GRILLA DE GERENCIAS -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          ${gerenciasMostradas.map(g => `
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
              <div class="p-6">
                
                <div class="flex items-center justify-between pb-5 border-b border-gray-100 mb-5">
                  <div class="flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-lg bg-[#ebf2ee] text-[#1a4031] font-extrabold text-sm flex items-center justify-center border border-[#298c71]/20">
                      ${g.iniciales}
                    </div>
                    <div>
                      <h3 class="text-base font-extrabold text-[#0a2319] leading-snug">${g.nombre}</h3>
                      <span class="text-xs text-gray-400 font-medium">${g.temasCount} temas esta semana</span>
                    </div>
                  </div>
                </div>

                <!-- Esta Semana -->
                <div class="mb-5">
                  <span class="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ESTA SEMANA
                  </span>
                  <ul class="space-y-1.5 pl-1">
                    <!-- ACÁ TAMBIÉN CORREGIMOS EL .texto PARA LA TARJETA PRINCIPAL -->
                    ${g.estaSemana.map(item => `
                      <li class="text-sm font-medium text-gray-700 flex items-start gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#298c71]/40 mt-2 shrink-0"></span>
                        <span>${item.texto}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <!-- Problemas Principales -->
                <div class="mb-5">
                  <span class="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    PROBLEMAS PRINCIPALES
                  </span>
                  ${g.problemas.length > 0 ? `
                    <ul class="space-y-1.5 pl-1">
                      <!-- ACÁ TAMBIÉN CORREGIMOS EL .texto PARA LA TARJETA PRINCIPAL -->
                      ${g.problemas.map(prob => `
                        <li class="text-sm font-semibold text-gray-800 flex items-start gap-2">
                          <span class="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                          <span>${prob.texto}</span>
                        </li>
                      `).join('')}
                    </ul>
                  ` : `
                    <p class="text-sm italic text-gray-400 pl-1">Sin problemas reportados.</p>
                  `}
                </div>

                <!-- Requiere Colaboración (ACTUALIZADO AL NUEVO ESTADO) -->
                <div>
                  ${g.colaboracion.activa ? `
                    <a href="#/novedades?estado=Pendiente de colaboración&gerencia=${encodeURIComponent(g.nombre)}" class="block p-3.5 rounded-lg border border-amber-200/70 bg-[#fffcf5] hover:bg-[#fff9e6] hover:border-amber-300 transition-colors flex justify-between items-center gap-3">
                      <div>
                        <span class="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block mb-0.5">REQUIERE COLABORACIÓN</span>
                        <div class="text-xs text-gray-700">
                          <strong class="text-[#0a2319]">${g.colaboracion.gerencia}</strong>
                          <span class="text-gray-500 ml-1">${g.colaboracion.detalle}</span>
                        </div>
                      </div>
                      <span class="text-[11px] font-bold ${g.colaboracion.urgente ? 'text-amber-800' : 'text-amber-700'} shrink-0 px-2 py-0.5 rounded bg-amber-100/60 border border-amber-200">
                        ${g.colaboracion.tiempo}
                      </span>
                    </a>
                  ` : `
                    <div class="p-3.5 rounded-lg border border-emerald-200/60 bg-[#f7fbf8] flex items-center gap-2 text-xs font-semibold text-[#1a4031]">
                      <svg class="text-[#298c71]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Sin colaboraciones pendientes
                    </div>
                  `}
                </div>

              </div>

              <!-- Botón que abre el modal -->
              <button onclick="abrirResumenWeekly('${g.id}')" class="w-full px-6 py-3.5 bg-gray-50/50 hover:bg-gray-100/70 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-600 hover:text-[#1a4031] transition-colors group">
                <span>Abrir resumen de la semana</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </button>

            </div>
          `).join('')}
        </div>

      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL DE RESUMEN WEEKLY                    -->
    <!-- ========================================== -->
    <div id="weekly-modal-overlay" class="fixed inset-0 z-[100] hidden flex items-center justify-center bg-[#0a2319]/40 backdrop-blur-sm transition-opacity opacity-0">
      <div id="weekly-modal-container" class="bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl border-t-4 border-[#298c71] transform scale-95 transition-transform duration-300 flex flex-col max-h-[80vh]">
        
        <div class="flex justify-between items-center px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h3 id="modal-weekly-titulo" class="text-xl font-extrabold text-[#0a2319]">Resumen</h3>
            <p class="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Semana: 31 AGO — 6 SEP 2026
            </p>
          </div>
          <button type="button" onclick="cerrarModalWeekly()" class="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div id="modal-weekly-contenido" class="p-6 overflow-y-auto bg-[#fbfcfb]">
           <!-- La lista de novedades se inyecta acá vía JS -->
        </div>

      </div>
    </div>
  `;
}