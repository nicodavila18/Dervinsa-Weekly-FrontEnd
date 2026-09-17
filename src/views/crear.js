import { usuarioActual } from '../data.js';
import { headerComponent } from '../components/header.js';

/**
 * VISTA: Crear Novedades (Reporte Semanal)
 * Formulario dinámico basado en el temario de cada gerencia.
 * Cumple con RN-09, RN-16, RN-20, RN-22 y RN-23.
 */
export function crearView() {

  // ============================================================================
  // 1. DICCIONARIO DE PREGUNTAS (Base de datos local temporal)
  // ============================================================================
  // Mantenemos tu base de datos de preguntas intacta. (Oculto algunas por brevedad visual aquí, pero mantené tu lista completa)
  const bancoDePreguntas = {
    'SSHEQ': [
      { id: 1, texto: 'Incidentes de seguridad personal y patrimonial' },
      { id: 2, texto: 'Incidentes ambientales' },
      { id: 3, texto: 'Auditorías o inspecciones (agenda, acciones)' },
      { id: 4, texto: 'No conformidades en auditorías o inspecciones. Acciones correctivas' },
      { id: 5, texto: 'No conformidades de productos y reclamos de clientes. Acciones.' },
      { id: 6, texto: 'Estado de certificaciones' },
      { id: 7, texto: 'Relación con organismos reguladores y cumplimiento normativo' },
      { id: 8, texto: 'Avances estado de situación del Plan 100 Días' },
      { id: 9, texto: 'Acciones prioritarias de la semana' },
      { id: 10, texto: 'Necesidades puntuales de colaboración o articulación' },
      { id: 11, texto: 'Otros temas del área' }
    ],
    'Producción': [
      { id: 12, texto: 'Calidades de materias primas y de productos terminados' },
      { id: 13, texto: 'Producción de la semana previa por línea (cumplimiento de objetivos, rendimientos y desviaciones)' },
      { id: 14, texto: 'Incidentes operativos (problemas técnicos) y acciones correctivas' },
      { id: 15, texto: 'Programa de producción para la semana (por línea) (ajustes o restricciones)' },
      { id: 16, texto: 'Temas relacionados con el personal' },
      { id: 17, texto: 'Acciones prioritarias de la semana' },
      { id: 18, texto: 'Necesidades puntuales de colaboración o articulación' },
      { id: 19, texto: 'Otros relevantes del área' }
    ],
    'Mantenimiento': [
      { id: 20, texto: 'Estado de equipos críticos' },
      { id: 21, texto: 'Mantenimientos programados y correctivos' },
      { id: 22, texto: 'Obras y mejoras en curso: Avances, problemas, impactos operativos, cumplimiento de fechas' },
      { id: 23, texto: 'Proyectos de inversión (CAPEX): Formulación, ejecución, desvíos presupuestarios' },
      { id: 24, texto: 'Innovaciones tecnológicas y mejoras de infraestructura: Evaluaciones, implementación' },
      { id: 25, texto: 'Acciones prioritarias de la semana' },
      { id: 26, texto: 'Necesidades puntuales de colaboración o articulación' }
    ],
    'Depósito': [
      { id: 27, texto: 'Incidentes o problemas en el control de ingreso' },
      { id: 28, texto: 'Llegada de MP importadas acumulado mensual vs forecast' },
      { id: 29, texto: 'Calidades de MP recibidas importadas' },
      { id: 30, texto: 'Cumplimiento de despachos programados (retrasos o problemas)' },
      { id: 31, texto: 'Programa de despachos de la semana' },
      { id: 32, texto: 'Cumplimiento de volúmenes y plazos acordados para los productos tercerizados (Aceite, p.e.)' },
      { id: 33, texto: 'Capacidades de almacenamiento para la producción de planta' },
      { id: 34, texto: 'Repuestos e insumos críticos: retrasos o riesgo de rotura de stock que afecten la operación' },
      { id: 35, texto: 'Demoras o imprevistos en la logística que puedan afectar futuras entregas' },
      { id: 36, texto: 'Cambios normativos o administrativos que impacten nuestra operatoria' },
      { id: 37, texto: 'Acciones prioritarias de la semana' },
      { id: 38, texto: 'Necesidades puntuales de colaboración o articulación' }
    ],
    'Comercio Local': [
      { id: 39, texto: 'Acopio de materias primas (real vs forecast)' },
      { id: 40, texto: 'Novedades con respecto al acopio de materias primas' },
      { id: 41, texto: 'Avance de ventas mensual vs pronóstico' },
      { id: 42, texto: 'Nuevos pedidos ingresados y su impacto en la planificación operativa' },
      { id: 43, texto: 'Estado de negociaciones comerciales (cierres de contratos, acuerdos especiales)' },
      { id: 44, texto: 'Estado de cumplimiento de los compromisos de entrega (chequear con depósito)' },
      { id: 45, texto: 'Reclamos o problemas con clientes. Acciones correctivas (chequear con Calidad y CX)' },
      { id: 46, texto: 'Cambios en el mercado o regulaciones que puedan afectar las ventas' },
      { id: 47, texto: 'Acciones prioritarias de la semana' },
      { id: 48, texto: 'Necesidades puntuales de colaboración o articulación' }
    ],
    'Comercio Exterior': [
      { id: 49, texto: 'Pedidos confirmados' },
      { id: 50, texto: 'Nuevos pedidos ingresados y su impacto en la planificación operativa' },
      { id: 51, texto: 'Estado de negociaciones comerciales (cierres de contratos, acuerdos especiales)' },
      { id: 52, texto: 'Ventas de la semana pasada (vs objetivos)' },
      { id: 53, texto: 'Estado de cumplimiento de los compromisos de entrega (chequear con depósito)' },
      { id: 54, texto: 'Reclamos o problemas con clientes. Acciones correctivas (chequear con Calidad y CX)' },
      { id: 55, texto: 'Cambios en el mercado o regulaciones que puedan afectar las ventas' },
      { id: 56, texto: 'Novedades de ventas del grupo' },
      { id: 57, texto: 'Acciones prioritarias de la semana' },
      { id: 58, texto: 'Necesidades puntuales de colaboración o articulación' }
    ],
    'Administración': [
      { id: 59, texto: 'Breve informe resultados (una vez al mes) (Ventas, Margen Bruto y EBITDA vs Forecast)' },
      { id: 60, texto: 'Facturas por cobrar esta semana y riesgo de morosidad. Acciones previstas (Chequear EC)' },
      { id: 61, texto: 'Efectivamente cobrado acumulado mensual Vs. Proyectado. Acciones' },
      { id: 62, texto: 'Pagos a realizar en la semana (proveedores críticos, vencimientos)' },
      { id: 63, texto: 'Desvíos en costos operativos (incrementos inesperados, ajustes requeridos)' },
      { id: 64, texto: 'Obligaciones fiscales que deban atenderse en la semana' },
      { id: 65, texto: 'Novedades en fiscalizaciones, inspecciones o requerimientos de ARCA u otros' },
      { id: 66, texto: 'Novedades en normativas impositivas que puedan afectar al negocio' },
      { id: 67, texto: 'Inconsistencias o ajustes contables pendientes que puedan afectar los reportes financieros' },
      { id: 68, texto: 'Gestiones ante organismos públicos en curso que puedan afectar la operación' },
      { id: 69, texto: 'Necesidades de colaboración de otras áreas' }
    ],
    'RRHH': [
      { id: 70, texto: 'Incidentes laborales. Acciones y evolución' },
      { id: 71, texto: 'Estado de los procesos abiertos de contratación si los hubiera' },
      { id: 72, texto: 'Estado de los procesos de salida si los hubiera' },
      { id: 73, texto: 'Novedades en ausentismo y licencias (impacto operativo, reemplazos)' },
      { id: 74, texto: 'Clima laboral y conflictos (situaciones que requieren intervención)' },
      { id: 75, texto: 'Tensiones y/o negociaciones con el sindicato' },
      { id: 76, texto: 'Capacitaciones y entrenamientos (programas en marcha, asistencia)' },
      { id: 77, texto: 'Necesidades de colaboración de otras áreas' }
    ]
  };

  // Por si el usuario actual no tiene gerencia asignada en los mocks, le damos un fallback
  const preguntasGerencia = bancoDePreguntas[usuarioActual?.gerencia] || [];

  // ============================================================================
  // 2. LÓGICA DE INTERFAZ (Ejecutada tras el renderizado)
  // ============================================================================
  setTimeout(() => {
    
    // BACKEND INFO: Abrir acordeón y cerrar los demás
    window.toggleAcordeon = (id) => {
      const contenido = document.getElementById(`contenido-${id}`);
      const icono = document.getElementById(`icono-${id}`);
      const estaAbierto = !contenido.classList.contains('hidden');

      document.querySelectorAll('.acordeon-contenido').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.acordeon-icono').forEach(el => el.style.transform = 'rotate(0deg)');

      if (!estaAbierto) {
        contenido.classList.remove('hidden');
        icono.style.transform = 'rotate(180deg)';
      }
    };

    // BACKEND INFO (RN-16): Selector de prioridad
    window.seleccionarPrioridad = (btn, idPregunta, valor) => {
      const botones = document.querySelectorAll(`.prioridad-btn-${idPregunta}`);
      botones.forEach(b => {
        b.classList.remove('border-[#298c71]', 'bg-[#ebf2ee]', 'text-[#1a4031]');
        b.classList.add('border-gray-200', 'bg-white', 'text-gray-600');
      });
      btn.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
      btn.classList.add('border-[#298c71]', 'bg-[#ebf2ee]', 'text-[#1a4031]');
    };

    // BACKEND INFO (RN-09): Selector de tipo y lógica de visualización de colaboración
    window.seleccionarTipo = (btn, idPregunta, valor) => {
      const botones = document.querySelectorAll(`.tipo-btn-${idPregunta}`);
      botones.forEach(b => {
        b.classList.remove('border-[#298c71]', 'bg-[#ebf2ee]', 'text-[#1a4031]');
        b.classList.add('border-gray-200', 'bg-white', 'text-gray-600');
      });
      btn.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
      btn.classList.add('border-[#298c71]', 'bg-[#ebf2ee]', 'text-[#1a4031]');
      
      // Lógica de UI: Mostrar/Ocultar bloque de colaboración según el tipo
      const bloqueColaboracion = document.getElementById(`bloque-colaboracion-${idPregunta}`);
      if (bloqueColaboracion) {
        if (valor === 'Seguimiento') {
          bloqueColaboracion.classList.remove('hidden');
        } else {
          bloqueColaboracion.classList.add('hidden');
        }
      }
    };

    // Lógica UI: Mostrar los campos extra si tilda "Requerir colaboración"
    window.toggleCamposColaboracion = (checkbox, idPregunta) => {
      const campos = document.getElementById(`campos-colaboracion-${idPregunta}`);
      if (checkbox.checked) {
        campos.classList.remove('hidden');
        campos.classList.add('flex');
      } else {
        campos.classList.add('hidden');
        campos.classList.remove('flex');
      }
    };

    // BACKEND INFO (RN-23): Agregar múltiples áreas de colaboración
    window.agregarColaboracion = (idPregunta) => {
      const contenedor = document.getElementById(`lista-colaboraciones-${idPregunta}`);
      const rowHtml = `
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 relative items-end">
          <div class="xl:col-span-1">
            <label class="block text-[9px] font-extrabold text-amber-700/70 uppercase tracking-widest mb-1.5">Gerencia Requerida</label>
            <select class="w-full px-3 py-2 rounded-md border border-amber-200 text-sm focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium">
              <option value="" disabled selected>Seleccionar gerencia...</option>
              <option>Mantenimiento</option>
              <option>Producción</option>
              <option>Comercio Local</option>
              <option>Administración / Finanzas</option>
              <option>Sistemas</option>
            </select>
          </div>
          <div class="xl:col-span-2 flex gap-2">
            <div class="flex-1">
              <label class="block text-[9px] font-extrabold text-amber-700/70 uppercase tracking-widest mb-1.5">Necesidad concreta</label>
              <input type="text" placeholder="Ej: Confirmar fecha de disponibilidad de materia prima" class="w-full px-3 py-2 rounded-md border border-amber-200 text-sm focus:outline-none focus:border-amber-500 bg-white text-gray-800">
            </div>
            <!-- Botón para quitar esta fila extra -->
            <button type="button" onclick="this.closest('.grid').remove()" class="p-2 text-amber-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors mb-[1px]" title="Quitar área">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
      `;
      contenedor.insertAdjacentHTML('beforeend', rowHtml);
    };

    window.agregarTemaLibre = () => {
      const contenedor = document.getElementById('contenedor-preguntas');
      const idTemporal = 'custom_' + Date.now(); 
      contenedor.insertAdjacentHTML('beforeend', generarAcordeonHTML({ id: idTemporal, texto: '' }, true));
    };

    const formCrear = document.getElementById('form-crear-novedades');
    if (formCrear) {
      formCrear.addEventListener('submit', (e) => {
        e.preventDefault(); 
        import('../components/toast.js').then(module => {
           module.emitirNotificacion('Novedades publicadas', 'Tu reporte semanal se ha guardado correctamente.', '#/novedades', 'exito');
           setTimeout(() => {
              module.emitirNotificacion('Mención enviada', 'Notificamos a las áreas arrobadas en tu reporte.', '#/detalle', 'info');
           }, 800); 
           setTimeout(() => {
              window.location.hash = '#/dashboard';
           }, 2500);
        });
      });
    }
  }, 100);

  // ============================================================================
  // GENERADOR HTML DE ACORDEONES (Mantiene código DRY)
  // ============================================================================
  const generarAcordeonHTML = (p, esLibre = false) => `
    <div class="border ${esLibre ? 'border-dashed border-[#298c71]' : 'border-gray-200'} rounded-lg overflow-hidden bg-white shadow-sm transition-all mb-3">
      
      <!-- BOTÓN HEADER -->
      <button type="button" onclick="if(event.target.tagName !== 'INPUT' && !event.target.closest('.btn-delete')) toggleAcordeon('${p.id}')" class="w-full flex justify-between items-center p-4 ${esLibre ? 'bg-[#ebf2ee] hover:bg-[#e0ece5]' : 'bg-white hover:bg-gray-50'} transition-colors cursor-pointer">
        <div class="flex items-center gap-3 text-left w-full pr-4">
          <span class="flex items-center justify-center w-7 h-7 rounded ${esLibre ? 'bg-[#298c71] text-white' : 'bg-[#ebf2ee] text-[#1a4031]'} font-bold text-sm shrink-0 shadow-sm">
            ${esLibre ? '+' : p.id}
          </span>
          ${esLibre 
            ? `<input type="text" placeholder="Título del nuevo tema..." class="font-bold text-[#1a4031] text-sm bg-transparent border-b border-[#298c71]/30 focus:border-[#298c71] focus:outline-none w-full placeholder:font-normal placeholder:text-[#7a9387] py-1 transition-colors">` 
            : `<span class="font-bold text-gray-700 text-sm">${p.texto}</span>`
          }
        </div>
        <div class="flex items-center gap-3 shrink-0">
          ${esLibre ? `
            <div class="btn-delete text-[#7a9387] hover:text-red-500 transition-colors p-1 rounded hover:bg-white/50" title="Eliminar tema" onclick="this.closest('.border-dashed').remove()">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </div>
          ` : ''}
          <svg id="icono-${p.id}" class="acordeon-icono ${esLibre ? 'text-[#298c71]' : 'text-gray-400'} transform transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </button>
      
      <!-- CONTENIDO -->
      <div id="contenido-${p.id}" class="acordeon-contenido hidden border-t ${esLibre ? 'border-[#298c71]/20' : 'border-gray-100'} bg-[#fbfcfb] flex flex-col">
        
        <div class="p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2">
              <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Título de la novedad (Breve)</label>
              <input type="text" placeholder="Ej: Demora en mantenimiento bomba P-204" class="w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white shadow-inner font-bold text-gray-800">
            </div>
            <div class="md:col-span-1">
              <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Responsable</label>
              <select class="w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white text-gray-800 font-medium">
                <option value="yo" selected>Yo (${usuarioActual?.nombre})</option>
                <option value="otro">Delegar a miembro del equipo...</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Detalle y desarrollo</label>
            <textarea placeholder="Desarrollá los avances, el contexto o el problema aquí..." class="w-full h-24 p-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] resize-y bg-white shadow-inner"></textarea>
          </div>

          <!-- BLOQUE DINÁMICO DE COLABORACIÓN -->
          <div id="bloque-colaboracion-${p.id}" class="mt-2 p-4 bg-[#fffcf5] border border-amber-200/70 rounded-lg">
            
            <label class="flex items-center gap-2 cursor-pointer mb-1 w-fit group">
              <input type="checkbox" onchange="toggleCamposColaboracion(this, '${p.id}')" class="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600 cursor-pointer">
              <span class="text-xs font-bold text-amber-800 group-hover:text-amber-600 transition-colors select-none">Requerir colaboración formal de otra área</span>
            </label>
            
            <!-- CONTENEDOR MULTI-FILA -->
            <div id="campos-colaboracion-${p.id}" class="hidden flex-col gap-3 mt-4 pt-4 border-t border-amber-200/50">
              
              <!-- Lista de colaboraciones (Acá se inyectan las nuevas) -->
              <div id="lista-colaboraciones-${p.id}" class="space-y-4">
                
                <!-- Fila Base (No se borra) -->
                <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 relative">
                  <div class="xl:col-span-1">
                    <label class="block text-[9px] font-extrabold text-amber-700/70 uppercase tracking-widest mb-1.5">Gerencia Requerida</label>
                    <select class="w-full px-3 py-2 rounded-md border border-amber-200 text-sm focus:outline-none focus:border-amber-500 bg-white text-gray-800 font-medium">
                      <option value="" disabled selected>Seleccionar gerencia...</option>
                      <option>Mantenimiento</option>
                      <option>Producción</option>
                      <option>Comercio Local</option>
                      <option>Administración / Finanzas</option>
                      <option>Sistemas</option>
                    </select>
                  </div>
                  <div class="xl:col-span-2">
                    <label class="block text-[9px] font-extrabold text-amber-700/70 uppercase tracking-widest mb-1.5">Necesidad concreta</label>
                    <input type="text" placeholder="Ej: Confirmar fecha de disponibilidad de materia prima" class="w-full px-3 py-2 rounded-md border border-amber-200 text-sm focus:outline-none focus:border-amber-500 bg-white text-gray-800">
                  </div>
                </div>

              </div>

              <!-- Botón Sumar Gerencia -->
              <button type="button" onclick="agregarColaboracion('${p.id}')" class="text-[10px] font-extrabold text-amber-600 hover:text-amber-800 transition-colors flex items-center gap-1 w-fit mt-1 uppercase tracking-widest">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Sumar otra gerencia
              </button>

            </div>
          </div>

        </div>

        <div class="bg-gray-50 border-t border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
          
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mr-1">Tipo:</span>
            <button type="button" onclick="seleccionarTipo(this, '${p.id}', 'Seguimiento')" class="tipo-btn-${p.id} px-3 py-1.5 rounded border border-[#298c71] bg-[#ebf2ee] text-[#1a4031] text-xs font-bold transition-colors">Seguimiento</button>
            <button type="button" onclick="seleccionarTipo(this, '${p.id}', 'Aviso')" class="tipo-btn-${p.id} px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 hover:border-gray-400 text-xs font-bold transition-colors">Aviso</button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mr-1">Prioridad:</span>
            <button type="button" onclick="seleccionarPrioridad(this, '${p.id}', 'Baja')" class="prioridad-btn-${p.id} px-3 py-1.5 rounded border border-[#298c71] bg-[#ebf2ee] text-[#1a4031] text-xs font-bold transition-colors">Baja</button>
            <button type="button" onclick="seleccionarPrioridad(this, '${p.id}', 'Media')" class="prioridad-btn-${p.id} px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 hover:border-blue-300 text-xs font-bold transition-colors">Media</button>
            <button type="button" onclick="seleccionarPrioridad(this, '${p.id}', 'Alta')" class="prioridad-btn-${p.id} px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 hover:border-orange-300 text-xs font-bold transition-colors">Alta</button>
            <button type="button" onclick="seleccionarPrioridad(this, '${p.id}', 'Máxima')" class="prioridad-btn-${p.id} px-3 py-1.5 rounded border border-gray-200 bg-white text-gray-600 hover:border-red-300 text-xs font-bold transition-colors">Máxima</button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mr-1">Límite (Opcional):</span>
            <input type="date" class="px-2 py-1 rounded border border-gray-300 text-xs text-gray-700 focus:outline-none focus:border-[#298c71] bg-white">
          </div>

        </div>
      </div>
    </div>
  `;

  // ============================================================================
  // 3. RENDERIZADO HTML PRINCIPAL
  // ============================================================================
  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      ${headerComponent('Crear novedad', [{ texto: 'Dervinsa', url: '#/dashboard' }])}

      <form id="form-crear-novedades" class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <div class="mb-8">
          <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">REPORTE SEMANAL</div>
          <h3 class="text-4xl font-extrabold text-[#0a2319]">Temario: ${usuarioActual?.gerencia || ''}</h3>
          <p class="text-gray-500 text-sm mt-1">Desplegá los puntos que necesites reportar. Los espacios vacíos serán ignorados al publicar.</p>
        </div>
        
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
          
          <div class="xl:col-span-3 flex flex-col">
            
            <div id="contenedor-preguntas">
              ${preguntasGerencia.map(p => generarAcordeonHTML(p)).join('')}
            </div>

            <button type="button" onclick="window.agregarTemaLibre()" class="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#298c71] hover:text-[#298c71] hover:bg-[#ebf2ee] transition-all font-bold text-sm">
              <span class="text-lg leading-none">+</span> Agregar tema personalizado
            </button>

          </div> 

          <!-- COLUMNA DERECHA: MACHETE INFORMATIVO -->
          <div class="xl:col-span-1 sticky top-20">
            <div class="bg-white border-t-4 border-t-[#298c71] border-x border-b border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 class="text-xs font-extrabold text-[#0a2319] mb-2 uppercase tracking-wide flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                Sobre la Colaboración
              </h3>
              <p class="text-[11px] text-gray-600 mb-4 leading-relaxed font-medium">
                Si una novedad requiere acción o respuesta formal de otra área, activá la casilla <strong>"Requerir colaboración"</strong>. El sistema enviará la notificación y generará una alerta de estado <em>Pendiente de colaboración</em> para cada gerencia requerida.
              </p>
            </div>
          </div>

        </div> 

        <!-- BOTONERA FINAL -->
        <div class="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <button type="button" onclick="window.location.hash='#/dashboard'" class="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-500 hover:text-[#1a4031] hover:bg-gray-100 transition-colors border border-transparent flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Guardar borrador y salir
          </button>

          <button type="submit" class="px-8 py-3 rounded-lg text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-md active:scale-95 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 2 11 13"></path><path d="m22 2-7 20-4-9-9-4 20-7z"></path></svg>
            Publicar Novedades
          </button>
        </div>

      </form>
    </div>
  `;
}