/**
 * VISTA: Crear Novedad
 * Paso 3 completado: Sistema de Tags (Choice Chips) de selección múltiple.
 */
export function crearView() {
  
  // Lista de gerencias para dibujar los botones automáticamente
  const gerencias = [
    'SSHEQ', 'Comercio Exterior', 'Comercio Local', 
    'Administración', 'IT', 'Producción', 
    'RRHH', 'Depósito', 'Mantenimiento'
  ];

  setTimeout(() => {
    // 1. Navegación entre pasos
    window.cambiarPaso = (paso) => {
      document.querySelectorAll('.wizard-step').forEach(el => el.classList.add('hidden'));
      document.getElementById(`paso-${paso}`).classList.remove('hidden');
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
    <div class="bg-white h-screen -m-8 flex flex-col relative overflow-hidden">
      
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
        <!-- PASO 1 -->
        <div id="paso-1" class="wizard-step flex-1 flex flex-col min-h-0">
          <div class="mb-6 shrink-0">
            <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">Paso 1 de 3</div>
            <h3 class="text-3xl font-extrabold text-gray-800">Información principal</h3>
            <p class="text-gray-500 text-base mt-1">Explicá el tema de manera breve y concreta.</p>
          </div>
          <div class="flex-1 flex flex-col gap-6 min-h-0">
            <div class="shrink-0">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Título de la novedad <span class="text-red-500">*</span></label>
              <input type="text" placeholder="Ej. Confirmar disponibilidad de materia prima" class="w-full px-5 py-4 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#298c71] transition-all bg-gray-50 hover:bg-white focus:bg-white shadow-inner">
            </div>
            <div class="flex-1 flex flex-col min-h-0">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Descripción <span class="text-red-500">*</span></label>
              <textarea placeholder="¿Qué está pasando y qué se necesita resolver?" class="w-full flex-1 p-5 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#298c71] transition-all resize-none bg-gray-50 hover:bg-white focus:bg-white shadow-inner"></textarea>
            </div>
          </div>
          <div class="flex justify-between mt-6 pt-6 border-t border-gray-100 shrink-0">
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