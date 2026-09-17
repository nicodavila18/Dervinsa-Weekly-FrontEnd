import { usuarioActual } from '../data.js';
import { headerComponent } from '../components/header.js';

/**
 * VISTA: Detalle de Novedad
 * Muestra el hilo completo con renderizado condicional basado en ROLES y PERMISOS.
 */
export function detalleView() {
  
  // ============================================================================
  // 1. MOCK DATA & LÓGICA DE RUTEO INTERNO
  // ============================================================================
  
  const hashParts = window.location.hash.split('?');
  const queryParams = new URLSearchParams(hashParts[1] || '');
  const novedadId = queryParams.get('id') || '1';

  const baseDeDatos = {
    '1': {
      id: '1',
      tipo: 'Seguimiento',
      titulo: 'Demora en mantenimiento bomba P-204',
      ticket: '#NOV-0268',
      fechaCreacion: '28/08/2026',
      gerenciaOrigen: { tag: 'MT', nombre: 'Mantenimiento' },
      gerenciaDestino: { tag: 'PR', nombre: 'Producción' },
      prioridad: { texto: 'Alta', clases: 'text-orange-700 bg-orange-50 border-orange-200' },
      estado: { texto: 'Pendiente de colaboración', clases: 'text-yellow-700 bg-yellow-50 border-yellow-200', esResoluble: true },
      fechaLimite: '05/09/2026',
      puntoTemario: { num: 20, texto: 'Estado de equipos críticos' },
      descripcion: 'Se detectó un desgaste prematuro en los sellos de la bomba P-204 que abastece la línea principal. Necesitamos coordinar una parada de planta de 4 horas con Producción para realizar el cambio preventivo antes del fin de semana para evitar roturas mayores.',
      requiereColaboracion: true
    },
    '3': {
      id: '3',
      tipo: 'Aviso',
      titulo: 'Llegada de contenedores importados',
      ticket: '#NOV-0275',
      fechaCreacion: '31/08/2026',
      gerenciaOrigen: { tag: 'DO', nombre: 'Depósito / Operaciones' },
      gerenciaDestino: null,
      prioridad: { texto: 'Baja', clases: 'text-gray-700 bg-gray-50 border-gray-200' },
      estado: { texto: 'En seguimiento', clases: 'text-blue-700 bg-blue-50 border-blue-200', esResoluble: true },
      fechaLimite: null,
      puntoTemario: { num: 28, texto: 'Llegada de MP importadas acumulado mensual vs forecast' },
      descripcion: 'Confirmamos la recepción de 3 contenedores en aduana. Ingresarán a planta entre hoy a la tarde y mañana a primera hora. El espacio en el sector C ya fue liberado para la descarga.',
      requiereColaboracion: false
    }
  };

  const novedad = baseDeDatos[novedadId] || baseDeDatos['1']; 
  const esAviso = novedad.tipo === 'Aviso';

  // ============================================================================
  // 2. SISTEMA DE PERMISOS (RBAC + ABAC)
  // ============================================================================
  
  // ¿Es el Gerente General?
  const esGG = usuarioActual?.rol === 'gerente_general';
  
  // ¿Es la gerencia que creó la novedad?
  const esCreador = usuarioActual?.gerencia === novedad.gerenciaOrigen.nombre;
  
  // ¿Es la gerencia a la que le pidieron ayuda?
  const esInvolucrado = novedad.gerenciaDestino && usuarioActual?.gerencia === novedad.gerenciaDestino.nombre;

  // REGLA DE ORO: Solo comentan el GG, el creador o el involucrado directo
  const puedeComentar = esGG || esCreador || esInvolucrado;

  // ============================================================================
  // 3. EVENTOS DINÁMICOS (Ventanas de confirmación MVP)
  // ============================================================================
  setTimeout(() => {
    
    // Función para abrir el modal dinámico
    window.abrirModalDetalle = (tipo) => {
      const overlay = document.getElementById('detalle-modal-overlay');
      const container = document.getElementById('detalle-modal-container');
      const titulo = document.getElementById('modal-detalle-titulo');
      const subtitulo = document.getElementById('modal-detalle-subtitulo');
      const contenido = document.getElementById('modal-detalle-contenido');
      const form = document.getElementById('form-detalle-modal');
      const btnSubmit = document.getElementById('modal-detalle-btn-submit');
      
      form.dataset.tipo = tipo;

      if (tipo === 'resolver') {
        titulo.textContent = 'Resolver Novedad';
        subtitulo.textContent = 'Acción de cierre';
        btnSubmit.textContent = 'Sí, marcar resuelta';
        contenido.innerHTML = `
          <div class="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
            ¿Estás seguro que deseas marcar esta novedad como <strong>RESUELTA</strong>? <br><br>Esta acción cerrará el ticket y lo quitará de las vistas de urgencia.
          </div>
        `;
      } else if (tipo === 'cambiar_estado') {
        titulo.textContent = 'Cambiar Estado';
        subtitulo.textContent = 'Modificación manual del ticket';
        btnSubmit.textContent = 'Actualizar estado';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Nuevo Estado</label>
            <!-- BACKEND INFO (RN-14): Solo se permiten los estados del flujo oficial -->
            <select id="select-nuevo-estado" required class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white text-gray-700">
              <option value="" disabled selected>Seleccionar...</option>
              <option value="Abierta">Abierta</option>
              <option value="En seguimiento">En seguimiento</option>
              <option value="Pendiente de colaboración">Pendiente de colaboración</option>
            </select>
          </div>
        `;
      } else if (tipo === 'semaforo') {
        titulo.textContent = 'Prioridad Ejecutiva';
        subtitulo.textContent = 'Ajustar el semáforo del Dashboard';
        btnSubmit.textContent = 'Guardar semáforo';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Nivel de Alerta</label>
            <!-- BACKEND INFO (RN-17): El semáforo es independiente de la prioridad -->
            <select id="select-semaforo" required class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#0a2319] bg-white text-gray-700 font-bold">
              <option value="verde">Verde (Normal)</option>
              <option value="amarillo">Amarillo (Requiere atención)</option>
              <option value="rojo">Rojo (Crítico/Bloqueado)</option>
            </select>
            <p class="text-[11px] text-gray-500 mt-2">Esta acción solo afecta cómo se ordena la novedad en la vista gerencial, no modifica los datos operativos del área ni su historial general.</p>
          </div>
        `;
      }

      overlay.classList.remove('hidden');
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        container.classList.remove('scale-95');
      });
    };

    // Función para cerrar el modal suavemente
    window.cerrarModalDetalle = () => {
      const overlay = document.getElementById('detalle-modal-overlay');
      const container = document.getElementById('detalle-modal-container');
      
      overlay.classList.add('opacity-0');
      container.classList.add('scale-95');
      
      setTimeout(() => {
        overlay.classList.add('hidden');
        document.getElementById('form-detalle-modal').reset();
      }, 300);
    };

    // Interceptar el envío del formulario del modal
    const formDetalleModal = document.getElementById('form-detalle-modal');
    if (formDetalleModal) {
      formDetalleModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const tipo = formDetalleModal.dataset.tipo;
        
        cerrarModalDetalle();

        import('../components/toast.js').then(m => {
          if (tipo === 'resolver') {
            m.emitirNotificacion('Novedad Resuelta', 'El ticket ha sido cerrado exitosamente.', '#/novedades', 'exito');
            setTimeout(() => window.location.hash = '#/novedades', 1500);
          } else if (tipo === 'cambiar_estado') {
            const nuevoEstado = document.getElementById('select-nuevo-estado').value;
            m.emitirNotificacion('Estado actualizado', `La novedad pasó a estar: ${nuevoEstado}`, '#/detalle', 'info');
          } else if (tipo === 'semaforo') {
            // Nueva alerta para el semáforo
            m.emitirNotificacion('Semáforo actualizado', 'La prioridad ejecutiva se reflejará en el Dashboard.', '#/detalle', 'info');
          }
        });
      });
    }
  }, 100);

  // ============================================================================
  // 4. RENDERIZADO CONDICIONAL DE BLOQUES
  // ============================================================================

  const renderColaboracion = () => {
    if (esAviso || !novedad.requiereColaboracion) return '';
    return `
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-bold text-gray-800">Colaboración</h3>
            <p class="text-sm text-gray-500">Circuito de respuesta requerida.</p>
          </div>
          <span class="px-3 py-1 rounded text-xs font-bold border text-yellow-700 bg-yellow-50 border-yellow-200 flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
            Esperando respuesta
          </span>
        </div>
        
        <div class="flex items-center justify-between gap-4 max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg bg-[#ebf2ee] text-[#1a4031] font-extrabold flex items-center justify-center border border-[#298c71]/20 shadow-sm">${novedad.gerenciaOrigen.tag}</div>
            <div>
              <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-0.5">Solicita</span>
              <span class="font-bold text-gray-800 text-sm">${novedad.gerenciaOrigen.nombre}</span>
            </div>
          </div>
          
          <div class="flex-1 flex flex-col items-center px-4">
            <span class="text-[10px] font-bold text-gray-400 mb-1">espera respuesta de</span>
            <div class="w-full h-px bg-gray-300 relative flex items-center justify-center">
              <svg class="text-gray-400 absolute" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center border border-blue-100 shadow-sm">${novedad.gerenciaDestino.tag}</div>
            <div>
              <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-0.5">Debe responder</span>
              <span class="font-bold text-gray-800 text-sm">@${novedad.gerenciaDestino.nombre}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Bloque: Sidebar Responsables
  const renderSidebarResponsables = () => {
    let html = `
      <div class="flex items-center gap-3.5">
        <div class="w-10 h-10 rounded-lg bg-[#f7fbf8] border border-[#298c71]/10 text-[#1a4031] text-xs font-extrabold flex items-center justify-center shrink-0">${novedad.gerenciaOrigen.tag}</div>
        <div>
          <span class="text-[10px] font-extrabold text-gray-400 uppercase block mb-0.5">Creada por</span>
          <span class="text-sm font-bold text-gray-800 leading-none">${novedad.gerenciaOrigen.nombre}</span>
        </div>
      </div>
    `;

    if (!esAviso && novedad.gerenciaDestino) {
      html += `
        <div class="w-full h-px bg-gray-100"></div>
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center shrink-0">${novedad.gerenciaDestino.tag}</div>
          <div>
            <span class="text-[10px] font-extrabold text-gray-400 uppercase block mb-0.5">Colabora</span>
            <span class="text-sm font-bold text-gray-800 leading-none">${novedad.gerenciaDestino.nombre}</span>
          </div>
        </div>
      `;
    }
    return html;
  };

  // Bloque: Timeline Historial (Mockeado para ambos casos)
  const renderTimeline = () => {
    if (esAviso) {
      return `
        <!-- Ítem inicial (Creación del Aviso) -->
        <div class="relative flex items-start gap-5 -ml-[21px]">
          <div class="w-10 h-10 rounded-lg bg-[#f7fbf8] text-[#1a4031] text-xs font-extrabold flex items-center justify-center border-2 border-white shadow-sm shrink-0 z-10 mt-1">${novedad.gerenciaOrigen.tag}</div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-sm font-bold text-gray-800">${novedad.gerenciaOrigen.nombre}</span>
              <span class="text-[10px] font-extrabold text-gray-400 uppercase">${novedad.fechaCreacion.substring(0,5)}, 08:45</span>
            </div>
            <div class="bg-gray-50 border border-gray-200 p-4 rounded-lg rounded-tl-none text-sm text-gray-700">
              ${novedad.descripcion}
            </div>
          </div>
        </div>
      `;
    }

    // Timeline para Seguimiento
    return `
      <!-- Ítem más reciente (Respuesta Producción) -->
      <div class="relative flex items-start gap-5 -ml-[21px]">
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 text-xs font-extrabold flex items-center justify-center border-2 border-white shadow-sm shrink-0 z-10 mt-1">PR</div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-sm font-bold text-gray-800">Producción</span>
            <span class="text-[10px] font-extrabold text-gray-400 uppercase">29 AGO, 14:30</span>
          </div>
          <div class="bg-gray-50 border border-gray-200 p-4 rounded-lg rounded-tl-none text-sm text-gray-700">
            Entendido. Podemos hacer la ventana de mantenimiento este viernes de 14:00 a 18:00 hs. ¿Confirman si llegan con los repuestos?
          </div>
        </div>
      </div>

      <!-- Evento de sistema -->
      <div class="relative flex items-center gap-5 -ml-[17px]">
        <div class="w-8 h-8 rounded bg-gray-50 text-gray-400 flex items-center justify-center border-2 border-white shrink-0 z-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 12A10 10 0 0 0 12 2v0a10 10 0 0 0-10 10c0 4.4 2.8 8.1 6.8 9.5.8.3 1.2-.4 1.2-.8v-2.2c-2.8.6-3.4-1.4-3.4-1.4-.7-1.8-1.8-2.3-1.8-2.3-1.4-1 .1-1 .1-1 1.6.1 2.4 1.6 2.4 1.6 1.4 2.4 3.7 1.7 4.6 1.3.1-1 .6-1.7 1-2.1-3-.3-6.2-1.5-6.2-6.7 0-1.5.5-2.7 1.4-3.7-.1-.3-.6-1.7.1-3.6 0 0 1.2-.4 3.8 1.4a13.3 13.3 0 0 1 7 0c2.6-1.8 3.8-1.4 3.8-1.4.7 1.9.2 3.3.1 3.6.9 1 1.4 2.2 1.4 3.7 0 5.2-3.2 6.4-6.2 6.7.6.5 1.1 1.5 1.1 3v4.4c0 .4.4 1.1 1.2.8A10 10 0 0 0 22 12Z"/></svg>
        </div>
        <p class="text-xs font-bold text-gray-400">@Producción fue notificada automáticamente por el sistema.</p>
      </div>

      <!-- Ítem inicial (Creación) -->
      <div class="relative flex items-start gap-5 -ml-[21px]">
        <div class="w-10 h-10 rounded-lg bg-[#f7fbf8] text-[#1a4031] text-xs font-extrabold flex items-center justify-center border-2 border-white shadow-sm shrink-0 z-10 mt-1">MT</div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-sm font-bold text-gray-800">Mantenimiento</span>
            <span class="text-[10px] font-extrabold text-gray-400 uppercase">28 AGO, 10:15</span>
          </div>
          <div class="bg-gray-50 border border-gray-200 p-4 rounded-lg rounded-tl-none text-sm text-gray-700">
            Ticket creado. Se solicita intervención de @Producción para coordinar parada técnica.
          </div>
        </div>
      </div>
    `;
  };

  // ============================================================================
  // 5. ESTRUCTURA HTML PRINCIPAL
  // ============================================================================
  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      ${headerComponent('Detalle de novedad', [
        { texto: 'Dervinsa', url: '#/dashboard' },
        { texto: 'Novedades', url: '#/novedades' }
      ])}

      <div class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <!-- ENCABEZADO -->
        <div class="mb-8">
          <a href="#/novedades" class="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#1a4031] transition-colors mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Volver a Novedades
          </a>
          
          <div class="flex justify-between items-start gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 rounded-full ${esAviso ? 'bg-[#298c71]' : 'bg-yellow-400'} shadow-sm"></div>
                <span class="text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">${novedad.tipo}</span>
              </div>
              <h2 class="text-4xl font-extrabold text-[#0a2319] leading-tight mb-2">${novedad.titulo}</h2>
              <p class="text-sm text-gray-400 font-medium">${novedad.ticket} · Creado el ${novedad.fechaCreacion}</p>
            </div>
            
            <!-- BOTONERA SUPERIOR (Conectada a funciones JS) -->
            <div class="flex gap-3 shrink-0">
              
              <!-- El botón de Cambiar Estado lo ven los creadores y el GG -->
              ${esCreador || esGG ? `
                <button onclick="abrirModalDetalle('cambiar_estado')" class="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors bg-white shadow-sm">
                  Cambiar estado
                </button>
              ` : ''}

              <!-- El botón de Marcar Resuelto lo ven los creadores, el GG, SIEMPRE Y CUANDO la novedad sea resoluble -->
              ${(esCreador || esGG) && novedad.estado.esResoluble ? `
                <button onclick="abrirModalDetalle('resolver')" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#298c71] hover:bg-[#1a4031] transition-colors shadow-sm">
                  Marcar como resuelto
                </button>
              ` : ''}

              <!-- Un pequeño aviso si el usuario no tiene permisos sobre la novedad -->
              ${!(esCreador || esGG) ? `
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-bold text-gray-400 cursor-not-allowed">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Solo lectura
                </span>
              ` : ''}
              
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          <!-- COLUMNA IZQUIERDA -->
          <div class="xl:col-span-3">
            
            <!-- TARJETA 1: Detalles técnicos y Temario -->
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
              <div class="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 bg-[#fbfcfb]">
                <div class="p-5">
                  <span class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Prioridad</span>
                  <span class="inline-flex px-2 py-0.5 rounded text-xs font-bold border ${novedad.prioridad.clases}">${novedad.prioridad.texto}</span>
                </div>
                <div class="p-5">
                  <span class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Gerencia</span>
                  <span class="text-sm font-bold text-gray-800">${novedad.gerenciaOrigen.nombre}</span>
                </div>
                <div class="p-5">
                  <span class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Estado actual</span>
                  <span class="inline-flex px-2 py-0.5 rounded text-xs font-bold border ${novedad.estado.clases}">${novedad.estado.texto}</span>
                </div>
                <div class="p-5 ${novedad.fechaLimite ? 'bg-orange-50/20' : 'bg-gray-50/30'}">
                  <span class="block text-[10px] font-extrabold ${novedad.fechaLimite ? 'text-orange-400' : 'text-gray-400'} uppercase tracking-widest mb-1">Fecha Límite</span>
                  ${novedad.fechaLimite ? `
                    <span class="text-sm font-bold text-orange-700 flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      ${novedad.fechaLimite}
                    </span>
                  ` : `
                    <span class="text-sm font-medium text-gray-500">—</span>
                  `}
                </div>
              </div>
              
              <div class="p-8">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f7fbf8] rounded-md mb-4 border border-[#298c71]/20">
                  <span class="text-[11px] font-extrabold text-[#298c71] uppercase tracking-wide">Punto ${novedad.puntoTemario.num} del Temario</span>
                  <span class="text-[11px] font-bold text-[#1a4031] border-l border-[#298c71]/30 pl-2">${novedad.puntoTemario.texto}</span>
                </div>
                <p class="text-base text-gray-700 leading-relaxed max-w-4xl">
                  ${novedad.descripcion}
                </p>
              </div>
            </div>

            <!-- TARJETA 2: Circuito de Colaboración (Condicional) -->
            ${renderColaboracion()}

            <!-- TARJETA 3: ACTIVIDAD Y SEGUIMIENTO -->
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
              
              <div class="flex justify-between items-end mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 class="text-xl font-extrabold text-gray-800 mb-1">Actividad y Seguimiento</h3>
                  <p class="text-sm text-gray-500">Historial del tema, ordenado del más reciente al más antiguo.</p>
                </div>
                <div class="flex gap-2 bg-gray-50 p-1 rounded-md border border-gray-200">
                  <button class="px-3 py-1.5 text-xs font-bold bg-white text-gray-800 rounded shadow-sm">Todo</button>
                  <button class="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-800">Comentarios</button>
                </div>
              </div>

              <!-- LÓGICA DE PERMISOS: Solo mostramos la caja si tiene permisos -->
              ${puedeComentar ? `
                <div class="relative flex items-start gap-4 mb-10">
                  <div class="w-10 h-10 rounded-lg bg-gray-200 text-gray-500 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div class="flex-1">
                    <div class="bg-white border border-gray-300 focus-within:border-[#298c71] focus-within:ring-1 focus-within:ring-[#298c71] rounded-lg overflow-hidden transition-all shadow-sm">
                      <textarea placeholder="Escribí una actualización o respuesta..." class="w-full h-20 p-4 text-sm focus:outline-none resize-none bg-transparent"></textarea>
                      <div class="bg-gray-50 border-t border-gray-200 px-4 py-3 flex justify-between items-center">
                        <span class="text-[11px] text-gray-500 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                          Público
                        </span>
                        <button class="px-6 py-2 rounded-md text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-sm">
                          Comentar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ` : `
                <!-- ESTADO: Sin permisos para comentar -->
                <div class="mb-10 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center gap-3 text-gray-500 text-sm">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                   Solo las gerencias involucradas y la Dirección pueden agregar actualizaciones.
                </div>
              `}
              
              <!-- LÍNEA DE TIEMPO -->
              <div class="relative border-l-2 border-gray-100 ml-5 space-y-8">
                ${renderTimeline()}
              </div>
            </div>
            
          </div>

          <!-- COLUMNA DERECHA -->
          <div class="xl:col-span-1 space-y-6">
            
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-5">Responsables</h3>
              <div class="space-y-5">
                ${renderSidebarResponsables()}
              </div>
            </div>

            <!-- LÓGICA DE PERMISOS: Panel exclusivo para el GG -->
            ${esGG ? `
              <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm border-t-4 border-t-[#0a2319]">
                <h3 class="text-[11px] font-extrabold text-[#0a2319] uppercase tracking-widest mb-2">Control Directivo</h3>
                <p class="text-[11px] text-gray-500 mb-4 leading-relaxed">Sobrescribir la prioridad operativa con un semáforo personalizado.</p>
                
                <button onclick="abrirModalDetalle('semaforo')" class="w-full py-2.5 px-4 rounded-md border border-gray-200 text-sm font-bold text-gray-600 hover:border-[#0a2319] hover:text-[#0a2319] hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <!-- Ícono de ajuste / semáforo -->
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="8" r="2"></circle><circle cx="12" cy="16" r="2"></circle></svg>
                  Definir Semáforo
                </button>
              </div>
            ` : ''}
            
          </div>
        </div>
      </div>
    </div>
    <!-- ========================================== -->
    <!-- MODAL DINÁMICO DE DETALLES                 -->
    <!-- ========================================== -->
    <div id="detalle-modal-overlay" class="fixed inset-0 z-[100] hidden flex items-center justify-center bg-[#0a2319]/40 backdrop-blur-sm transition-opacity opacity-0">
      <div id="detalle-modal-container" class="bg-white w-full max-w-md mx-4 rounded-lg shadow-2xl border-t-4 border-[#298c71] transform scale-95 transition-transform duration-300">
        
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div>
            <h3 id="modal-detalle-titulo" class="text-lg font-extrabold text-[#0a2319]">Título</h3>
            <p id="modal-detalle-subtitulo" class="text-xs text-gray-500 mt-0.5">Subtítulo</p>
          </div>
          <button type="button" onclick="cerrarModalDetalle()" class="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form id="form-detalle-modal" class="flex flex-col">
          <div id="modal-detalle-contenido" class="px-6 py-5 space-y-4">
             <!-- Contenido inyectado por JS -->
          </div>
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-lg">
            <button type="button" onclick="cerrarModalDetalle()" class="px-4 py-2 rounded-md text-sm font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2 rounded-md text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-sm flex items-center gap-2 active:scale-95">
              <span id="modal-detalle-btn-submit">Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}