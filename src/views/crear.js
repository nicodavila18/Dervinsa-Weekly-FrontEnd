import { usuarioActual } from '../data.js';

/**
 * VISTA: Crear Novedad
 * Paso 3 completado: Sistema de Tags (Choice Chips) de selección múltiple.
 */
export function crearView() {

  // 1. DICCIONARIO DE PREGUNTAS (Mantiene la numeración oficial)
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

  // Buscamos las preguntas del usuario logueado (Si no existe, mostramos un array vacío)
  const preguntasGerencia = bancoDePreguntas[usuarioActual?.gerencia] || [];
  
  // Lista de gerencias para dibujar los botones automáticamente
  const gerencias = [
    'SSHEQ', 'Comercio Exterior', 'Comercio Local', 
    'Administración', 'IT', 'Producción', 
    'RRHH', 'Depósito', 'Mantenimiento'
  ];

  setTimeout(() => {
    // Navegación de pasos (Wizard)
    window.cambiarPaso = (paso) => {
      document.querySelectorAll('.wizard-step').forEach(el => el.classList.add('hidden'));
      document.getElementById(`paso-${paso}`).classList.remove('hidden');
      window.scrollTo(0, 0); // Sube la pantalla al cambiar de paso
    };

    // Lógica del Acordeón (Solo uno abierto a la vez)
    window.toggleAcordeon = (id) => {
      const contenidoActual = document.getElementById(`contenido-${id}`);
      const iconoActual = document.getElementById(`icono-${id}`);
      const estaAbierto = !contenidoActual.classList.contains('hidden');

      // 1. Cerramos absolutamente todos los acordeones
      document.querySelectorAll('.acordeon-contenido').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.acordeon-icono').forEach(el => el.style.transform = 'rotate(0deg)');

      // 2. Si el que clickeamos NO estaba abierto, lo abrimos
      if (!estaAbierto) {
        contenidoActual.classList.remove('hidden');
        iconoActual.style.transform = 'rotate(180deg)';
      }
    };

    // NUEVA LÓGICA: Agregar Tema Personalizado
    window.agregarTemaLibre = () => {
      const contenedor = document.getElementById('contenedor-preguntas');
      const idTemporal = 'custom_' + Date.now(); 

      document.querySelectorAll('.acordeon-contenido').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.acordeon-icono').forEach(el => el.style.transform = 'rotate(0deg)');

      const htmlNuevoTema = `
        <div class="border border-dashed border-[#298c71] rounded-xl overflow-hidden bg-white shadow-sm transition-all mb-3">
          
          <div class="w-full flex justify-between items-center p-5 bg-[#ebf2ee] hover:bg-[#e0ece5] transition-colors cursor-pointer" 
               onclick="if(event.target.tagName !== 'INPUT' && !event.target.closest('button')) toggleAcordeon('${idTemporal}')">
            
            <div class="flex items-center gap-4 text-left w-full pr-4">
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-[#298c71] text-white shrink-0 shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </span>
              <input type="text" placeholder="Escribí el título de tu nuevo tema..." class="font-bold text-[#1a4031] text-[15px] bg-transparent border-b border-[#298c71]/30 focus:border-[#298c71] focus:outline-none w-full placeholder:font-normal placeholder:text-[#7a9387] py-1 transition-colors">
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button type="button" onclick="this.closest('.border-dashed').remove()" class="text-[#7a9387] hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-white/50" title="Eliminar tema">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
              <svg id="icono-${idTemporal}" class="acordeon-icono text-[#298c71] transform transition-transform duration-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          
          <div id="contenido-${idTemporal}" class="acordeon-contenido border-t border-[#298c71]/20 bg-white p-5">
            <textarea placeholder="Detallá los avances, novedades o problemas sobre este nuevo tema..." class="w-full h-32 p-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] resize-y bg-gray-50 shadow-inner"></textarea>
          </div>
        </div>
      `;

      contenedor.insertAdjacentHTML('beforeend', htmlNuevoTema);
    };

    // 2. Selección única (Para Paso 2 - Tipo y Prioridad)
    window.seleccionarTarjeta = (botonClickeado, nombreGrupo) => {
      document.querySelectorAll('.' + nombreGrupo).forEach(btn => {
        btn.classList.remove('border-[#298c71]', 'bg-[#ebf2ee]');
        btn.classList.add('border-gray-200', 'bg-white');
        const texto = btn.querySelector('.texto-tarjeta');
        if (texto) {
          texto.classList.remove('text-[#1a4031]');
          texto.classList.add('text-gray-700');
        }
      });
      botonClickeado.classList.remove('border-gray-200', 'bg-white');
      botonClickeado.classList.add('border-[#298c71]', 'bg-[#ebf2ee]');
      const textoActivo = botonClickeado.querySelector('.texto-tarjeta');
      if (textoActivo) {
        textoActivo.classList.remove('text-gray-700');
        textoActivo.classList.add('text-[#1a4031]');
      }
    };

    // 3. Selección Múltiple (Para Paso 3 - Tags de Gerencias)
    window.toggleTag = (btn) => {
      const estaActivo = btn.classList.contains('border-[#298c71]');
      const icono = btn.querySelector('.tag-icon');

      if (estaActivo) {
        // Si estaba seleccionado, lo apagamos
        btn.classList.remove('border-[#298c71]', 'bg-[#ebf2ee]', 'text-[#1a4031]');
        btn.classList.add('border-gray-200', 'bg-white', 'text-gray-600');
        icono.innerHTML = '+'; // Volvemos al más
      } else {
        // Si estaba apagado, lo encendemos
        btn.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
        btn.classList.add('border-[#298c71]', 'bg-[#ebf2ee]', 'text-[#1a4031]');
        // Usamos el check (✓)
        icono.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      }
    };

  }, 100);

  return `
    <div class="bg-white min-h-screen -m-8 flex flex-col relative overflow-hidden">
      
      <!-- BARRA SUPERIOR -->
      <div class="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center shrink-0">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="hover:text-[#1a4031] cursor-pointer transition-colors font-medium">Dervinsa</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          <span class="font-bold text-gray-800">Crear novedad</span>
        </div>
        
        <div class="flex items-center gap-4">
          <span class="text-xs font-medium text-gray-400 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Borrador guardado 10:42
          </span>
          <button class="p-2 bg-gray-50 rounded-full border border-gray-200 text-gray-500 hover:text-[#1a4031] transition-colors shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
        </div>
      </div>

      <!-- ÁREA DEL FORMULARIO -->
      <form id="form-crear-novedad" class="flex-1 flex flex-col w-full max-w-5xl mx-auto px-10 py-8 min-h-0">
        
        <!-- PASO 1 y PASO 2 (Se mantienen igual) -->
        <!-- PASO 1: ACORDEÓN DINÁMICO -->
        <div id="paso-1" class="wizard-step flex-1 flex flex-col">
          <div class="mb-8">
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">Paso 1 de 3</div>
            <h3 class="text-3xl font-extrabold text-gray-800">Temario semanal: ${usuarioActual?.gerencia}</h3>
            <p class="text-gray-500 text-base mt-1">Desplegá los puntos que necesites reportar esta semana. Los espacios vacíos no se publicarán.</p>
          </div>
          
          <div id="contenedor-preguntas" class="flex flex-col gap-3 mb-4">
            <!-- Renderizamos la lista según la gerencia -->
            ${preguntasGerencia.map(p => `
              <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:border-gray-300">
                <button type="button" onclick="toggleAcordeon(${p.id})" class="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors">
                  <div class="flex items-center gap-4 text-left">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full bg-[#ebf2ee] text-[#1a4031] font-bold text-sm shrink-0">
                      ${p.id}
                    </span>
                    <span class="font-bold text-gray-700 text-[15px]">${p.texto}</span>
                  </div>
                  <svg id="icono-${p.id}" class="acordeon-icono text-gray-400 shrink-0 transform transition-transform duration-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                
                <div id="contenido-${p.id}" class="acordeon-contenido hidden border-t border-gray-100 bg-[#fbfcfb] p-5">
                  <textarea placeholder="Escribí los avances, novedades o problemas sobre este tema..." class="w-full h-32 p-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] resize-y bg-white shadow-inner"></textarea>
                </div>
              </div>
            `).join('')}
          </div> <!-- Fin del contenedor de preguntas -->

          <!-- Botón extra para agregar tema libre (AHORA ESTÁ AFUERA DEL CONTENEDOR) -->
          <button type="button" onclick="agregarTemaLibre()" class="mb-8 flex items-center justify-center gap-2 w-full p-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#298c71] hover:text-[#298c71] hover:bg-[#ebf2ee] transition-all font-bold text-sm group">
            <span class="text-xl leading-none group-hover:scale-110 transition-transform">+</span>
            Agregar tema personalizado
          </button>

          <div class="flex justify-between mt-auto pt-6 border-t border-gray-100">
            <button type="button" class="px-6 py-3 rounded-lg text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors">Guardar borrador y salir</button>
            <button type="button" onclick="cambiarPaso(2)" class="px-10 py-3 rounded-lg text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-lg active:scale-95">Siguiente paso</button>
          </div>
        </div>

        <!-- PASO 2 -->
        <div id="paso-2" class="wizard-step hidden flex-1 flex flex-col min-h-0">
          <div class="mb-6 shrink-0">
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">Paso 2 de 3</div>
            <h3 class="text-3xl font-extrabold text-gray-800">Clasificación</h3>
            <p class="text-gray-500 text-base mt-1">Ayudá a identificar cómo debe tratarse.</p>
          </div>
          <div class="flex-1 flex flex-col min-h-0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div class="flex flex-col gap-8">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">Tipo <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-2 gap-3">
                    <button type="button" onclick="seleccionarTarjeta(this, 'grupo-tipo')" class="grupo-tipo text-left p-4 rounded-xl border-2 border-[#298c71] bg-[#ebf2ee] transition-all">
                      <div class="texto-tarjeta font-bold text-[#1a4031] text-sm">Aviso</div>
                      <div class="text-[11px] text-[#298c71] mt-0.5 leading-tight">Información para compartir</div>
                    </button>
                    <button type="button" onclick="seleccionarTarjeta(this, 'grupo-tipo')" class="grupo-tipo text-left p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all">
                      <div class="texto-tarjeta font-bold text-gray-700 text-sm">Tema con seguimiento</div>
                      <div class="text-[11px] text-gray-500 mt-0.5 leading-tight">Requiere avances o resolución</div>
                    </button>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-end mb-2">
                    <label class="block text-sm font-semibold text-gray-700">Fecha límite</label>
                    <span class="text-xs text-gray-400">Opcional</span>
                  </div>
                  <input type="date" class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] transition-all bg-gray-50 hover:bg-white focus:bg-white shadow-inner">
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Prioridad <span class="text-red-500">*</span></label>
                <div class="grid grid-cols-2 gap-3">
                  <button type="button" onclick="seleccionarTarjeta(this, 'grupo-prioridad')" class="grupo-prioridad flex items-center gap-3 text-left p-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></div><div class="texto-tarjeta font-semibold text-gray-700 text-sm">Máxima</div>
                  </button>
                  <button type="button" onclick="seleccionarTarjeta(this, 'grupo-prioridad')" class="grupo-prioridad flex items-center gap-3 text-left p-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all">
                    <div class="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0"></div><div class="texto-tarjeta font-semibold text-gray-700 text-sm">Alta</div>
                  </button>
                  <button type="button" onclick="seleccionarTarjeta(this, 'grupo-prioridad')" class="grupo-prioridad flex items-center gap-3 text-left p-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all">
                    <div class="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div><div class="texto-tarjeta font-semibold text-gray-700 text-sm">Media</div>
                  </button>
                  <button type="button" onclick="seleccionarTarjeta(this, 'grupo-prioridad')" class="grupo-prioridad flex items-center gap-3 text-left p-3.5 rounded-xl border-2 border-[#298c71] bg-[#ebf2ee] transition-all">
                    <div class="w-2.5 h-2.5 rounded-full bg-gray-400 shrink-0"></div><div class="texto-tarjeta font-semibold text-[#1a4031] text-sm">Baja</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-6 pt-6 border-t border-gray-100 shrink-0">
            <button type="button" onclick="cambiarPaso(1)" class="px-6 py-3 rounded-lg text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors">Volver</button>
            <button type="button" onclick="cambiarPaso(3)" class="px-10 py-3 rounded-lg text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-lg active:scale-95">Siguiente paso</button>
          </div>
        </div>

        <!-- PASO 3: COLABORACIÓN NUEVO -->
        <div id="paso-3" class="wizard-step hidden flex-1 flex flex-col min-h-0">
          <div class="mb-8 shrink-0">
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">Paso 3 de 3</div>
            <h3 class="text-3xl font-extrabold text-gray-800">¿Necesitás colaboración de otra gerencia?</h3>
            <p class="text-gray-500 text-base mt-1">Podés mencionar una o más áreas involucradas.</p>
          </div>
          
          <div class="flex-1 flex flex-col min-h-0 overflow-y-auto">
            
            <!-- Contenedor de Tags generados dinámicamente -->
            <div class="flex flex-wrap gap-3 mb-8">
              ${gerencias.map(g => `
                <button type="button" onclick="toggleTag(this)" class="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-200 bg-white text-gray-600 text-sm font-medium hover:border-gray-300 transition-all select-none">
                  <span class="tag-icon font-bold text-lg leading-none">+</span>
                  @${g}
                </button>
              `).join('')}
            </div>

            <!-- Checkbox de Requiere Respuesta -->
            <div class="flex items-start gap-3 mb-6">
              <input type="checkbox" id="req-respuesta" class="mt-1 w-5 h-5 rounded border-gray-300 text-[#298c71] focus:ring-[#298c71] cursor-pointer">
              <div>
                <label for="req-respuesta" class="font-bold text-gray-800 cursor-pointer select-none">Requiere respuesta</label>
                <p class="text-sm text-gray-500 mt-0.5">La novedad quedará marcada como pendiente hasta recibir feedback.</p>
              </div>
            </div>

            <!-- Banner Informativo -->
            <div class="p-4 bg-[#f4f7f5] border-l-4 border-[#298c71] rounded-r-lg flex gap-3 items-center">
              <svg class="text-[#298c71] shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <p class="text-sm text-gray-600 font-medium">Las gerencias mencionadas podrán responder y realizar seguimiento desde la novedad.</p>
            </div>

          </div>

          <div class="flex justify-between mt-6 pt-6 border-t border-gray-100 shrink-0">
            <button type="button" onclick="cambiarPaso(2)" class="px-6 py-3 rounded-lg text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors">
              Volver
            </button>
            <button type="submit" class="px-10 py-3 rounded-lg text-sm font-bold text-white bg-[#298c71] hover:bg-[#1a4031] transition-colors shadow-lg active:scale-95">
              Publicar Novedad
            </button>
          </div>
        </div>

      </form>
    </div>
  `;
}