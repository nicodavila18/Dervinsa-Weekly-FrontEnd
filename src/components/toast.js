// src/components/toast.js

export function emitirNotificacion(titulo, mensaje, url = '#/dashboard', tipo = 'exito') {
  
  // 1. GUARDAMOS EN LA MEMORIA GLOBAL
  if (!window.notificaciones) window.notificaciones = [];
  
  // unshift() empuja el nuevo elemento al PRINCIPIO de la lista
  window.notificaciones.unshift({
    id: Date.now(), // Generamos un ID único con la hora actual
    tipo: tipo,
    titulo: titulo,
    mensaje: mensaje,
    leida: false,
    url: url
  });

  // 2. ACTUALIZACIÓN QUIRÚRGICA DEL DOM (La Campanita)
  // Buscamos el botón sin recargar toda la App
  const btnCampanita = document.getElementById('btn-campanita');
  if (btnCampanita) {
    const noLeidas = window.notificaciones.filter(n => !n.leida).length;
    
    // Buscamos si ya existe la bolita roja adentro del botón
    let contadorVisual = btnCampanita.querySelector('.bg-red-500');
    
    if (contadorVisual) {
      // Si ya existe, solo le cambiamos el número
      contadorVisual.textContent = noLeidas;
    } else {
      // Si no existe (estaba en 0), se la inyectamos
      btnCampanita.innerHTML += `
        <span class="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white shadow-sm badge-contador">
          ${noLeidas}
        </span>
      `;
    }
  }

  // 3. MOSTRAR EL TOAST VISUAL
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex items-start gap-3 w-80 transform transition-all duration-300 translate-x-full opacity-0';
  
  const isExito = tipo === 'exito';
  // Si es éxito es verde, si es aviso/info lo hacemos azul corporativo
  const bordeSuperior = isExito ? 'border-t-4 border-t-[#298c71]' : 'border-t-4 border-t-blue-500';
  const colorTexto = isExito ? 'text-[#298c71]' : 'text-blue-500';
  
  const icono = isExito 
    ? `<svg class="${colorTexto} shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg class="${colorTexto} shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;

  toast.classList.add(...bordeSuperior.split(' '));

  // Ajustamos un poco el HTML interno para soportar título y mensaje
  toast.innerHTML = `
    ${icono}
    <div class="flex-1">
      <h4 class="text-sm font-bold text-gray-800 leading-tight">${titulo}</h4>
      <p class="text-xs text-gray-500 mt-0.5">${mensaje}</p>
    </div>
    <button class="text-gray-400 hover:text-gray-600 transition-colors shrink-0" onclick="this.parentElement.remove()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-x-full', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}