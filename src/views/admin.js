import { headerComponent } from '../components/header.js';

export function adminView() {
  
  // ==========================================
  // 1. MOCK DATA (Para poblar las tablas)
  // ==========================================
  
  const listaUsuarios = [
    { id: 1, nombre: "Juan Pérez", gerencia: "Gerencia General", rol: "Gerente General", acceso: "Hoy, 11:30", estado: "Activo" },
    { id: 2, nombre: "Lionel Messi", gerencia: "Sistemas", rol: "Admin", acceso: "Hoy, 09:15", estado: "Activo" },
    { id: 3, nombre: "Alejandro Sanz", gerencia: "Mantenimiento", rol: "Gerencia", acceso: "Ayer, 16:45", estado: "Activo" },
    { id: 4, nombre: "María Becerra", gerencia: "Producción", rol: "Gerencia", acceso: "Ayer, 10:20", estado: "Activo" },
    { id: 5, nombre: "Carlos Sanchez", gerencia: "Comercio Local", rol: "Gerencia", acceso: "Hace 5 días", estado: "Suspendido" }
  ];

  const listaGerencias = [
    { id: "GG", nombre: "Gerencia General", responsable: "Juan Pérez", usuarios: 2, estado: "Activa" },
    { id: "PR", nombre: "Producción", responsable: "María Becerra", usuarios: 4, estado: "Activa" },
    { id: "MT", nombre: "Mantenimiento", responsable: "Alejandro Sanz", usuarios: 3, estado: "Activa" },
    { id: "CL", nombre: "Comercio Local", responsable: "Carlos Sanchez", usuarios: 2, estado: "Activa" },
    { id: "IT", nombre: "Sistemas", responsable: "Lionel Messi", usuarios: 1, estado: "Activa" }
  ];

  const temarioEjemplo = [
    { id: 12, texto: "Calidades de materias primas y de productos terminados" },
    { id: 13, texto: "Producción de la semana previa por línea (cumplimiento de objetivos)" },
    { id: 14, texto: "Incidentes operativos (problemas técnicos) y acciones correctivas" },
    { id: 15, texto: "Programa de producción para la semana" }
  ];

  // ==========================================
  // 2. LÓGICA DE SOLAPAS (Se ejecuta tras renderizar)
  // ==========================================
  setTimeout(() => {
    window.cambiarTabAdmin = (tabName) => {
      // 1. Ocultar todos los contenidos
      document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('hidden'));
      // 2. Mostrar el seleccionado
      document.getElementById('tab-' + tabName).classList.remove('hidden');

      // 3. Resetear estilos de los botones
      document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('border-[#298c71]', 'text-[#1a4031]');
        btn.classList.add('border-transparent', 'text-gray-500');
      });
      // 4. Pintar el botón activo
      const btnActivo = document.getElementById('btn-tab-' + tabName);
      btnActivo.classList.remove('border-transparent', 'text-gray-500');
      btnActivo.classList.add('border-[#298c71]', 'text-[#1a4031]');
    };

    // Función para abrir e inyectar el contenido correcto
    window.abrirModalAdmin = (tipo, datoExtra = null) => {
      const overlay = document.getElementById('admin-modal-overlay');
      const container = document.getElementById('admin-modal-container');
      const titulo = document.getElementById('modal-titulo');
      const subtitulo = document.getElementById('modal-subtitulo');
      const contenido = document.getElementById('modal-contenido');
      const form = document.getElementById('form-admin-modal');
      const btnSubmit = document.getElementById('modal-btn-submit');
      
      // Inyección dinámica de HTML según el botón clickeado
      if (tipo === 'usuario') {
        titulo.textContent = 'Nuevo Usuario';
        subtitulo.textContent = 'Crear credenciales y asignar roles operativos.';
        btnSubmit.textContent = 'Guardar';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Nombre Completo</label>
            <input type="text" required placeholder="Ej: Ana López" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white font-bold text-gray-800">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Gerencia</label>
              <select required class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white text-gray-700">
                <option value="" disabled selected>Seleccionar...</option>
                <option>Gerencia General</option>
                <option>Sistemas</option>
                <option>Producción</option>
                <option>Mantenimiento</option>
                <option>Comercio Local</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Rol</label>
              <select required class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white text-gray-700">
                <option value="" disabled selected>Seleccionar...</option>
                <option value="admin">Admin</option>
                <option value="gerente_general">Gerente General</option>
                <option value="gerencia">Gerencia</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Email corporativo</label>
            <input type="email" required placeholder="nombre@dervinsa.com" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white text-gray-800">
          </div>
        `;
        form.dataset.tipo = 'usuario';

      } else if (tipo === 'editar_usuario') {
        titulo.textContent = 'Editar Usuario';
        subtitulo.textContent = `Actualizando la información de ${datoExtra}.`;
        btnSubmit.textContent = 'Actualizar Datos';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Nombre Completo</label>
            <input type="text" required value="${datoExtra}" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white font-bold text-gray-800">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Gerencia</label>
              <select required class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white text-gray-700">
                <option>Gerencia General</option>
                <option selected>Sistemas</option>
                <option>Producción</option>
                <option>Mantenimiento</option>
                <option>Comercio Local</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Rol</label>
              <select required class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white text-gray-700">
                <option value="admin" selected>Admin</option>
                <option value="gerente_general">Gerente General</option>
                <option value="gerencia">Gerencia</option>
              </select>
            </div>
          </div>
          <!-- Opcional: Podríamos poner acá un toggle para activarlo si está suspendido -->
        `;
        form.dataset.tipo = 'editar_usuario';

      } else if (tipo === 'gerencia') {
        titulo.textContent = 'Nueva Gerencia';
        subtitulo.textContent = 'Definir área.';
        btnSubmit.textContent = 'Guardar';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Nombre de la Gerencia / Área</label>
            <input type="text" required placeholder="Ej: Recursos Humanos" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white font-bold text-gray-800">
          </div>
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Responsable principal</label>
            <input type="text" required placeholder="Nombre del gerente" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white text-gray-800">
          </div>
        `;
        form.dataset.tipo = 'gerencia';
      } else if (tipo === 'confirmar_reset') {
        titulo.textContent = 'Restablecer Contraseña';
        subtitulo.textContent = 'Acción de seguridad';
        btnSubmit.textContent = 'Sí, enviar enlace';
        contenido.innerHTML = `
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
             ¿Estás seguro que deseas enviar un correo de recuperación a <strong>${datoExtra}</strong>? Su sesión actual no se cerrará hasta que efectúe el cambio.
          </div>
        `;
        form.dataset.tipo = 'confirmar_reset';
        form.dataset.usuario = datoExtra; // Guardamos a quién afectamos

      } else if (tipo === 'confirmar_baja') {
        titulo.textContent = 'Suspender Usuario';
        subtitulo.textContent = 'Revocar acceso al sistema';
        btnSubmit.textContent = 'Sí, suspender';
        contenido.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
             ¿Estás seguro que deseas suspender a <strong>${datoExtra}</strong>? Perderá el acceso inmediatamente. Podrás reactivarlo más adelante desde su perfil.
          </div>
        `;
        form.dataset.tipo = 'confirmar_baja';
        form.dataset.usuario = datoExtra; // Guardamos a quién afectamos
      } else if (tipo === 'editar_gerencia') {
        titulo.textContent = 'Editar Gerencia';
        subtitulo.textContent = `Actualizando configuración para ${datoExtra}.`;
        btnSubmit.textContent = 'Actualizar';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Nombre de la Gerencia / Área</label>
            <input type="text" required value="${datoExtra}" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white font-bold text-gray-800">
          </div>
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Responsable principal</label>
            <input type="text" required placeholder="Nombre del gerente" class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white text-gray-800">
          </div>
        `;
        form.dataset.tipo = 'editar_gerencia';

      } else if (tipo === 'confirmar_desactivar_area') {
        titulo.textContent = 'Desactivar Gerencia';
        subtitulo.textContent = 'Ocultar área del sistema';
        btnSubmit.textContent = 'Sí, desactivar';
        contenido.innerHTML = `
          <div class="p-4 bg-orange-50 border border-orange-200 rounded-md text-orange-800 text-sm">
             ¿Estás seguro que deseas desactivar <strong>${datoExtra}</strong>? Ya no se podrán cargar novedades bajo esta área ni mencionarla con su abreviatura, pero el historial de reportes se mantendrá intacto.
          </div>
        `;
        form.dataset.tipo = 'confirmar_desactivar_area';
        form.dataset.usuario = datoExtra; // Reutilizamos el dataset para pasar el nombre
      } else if (tipo === 'nuevo_punto') {
        titulo.textContent = 'Nuevo Punto de Temario';
        subtitulo.textContent = 'Se agregará al final de la lista de la gerencia seleccionada.';
        btnSubmit.textContent = 'Guardar Punto';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Texto del punto a reportar</label>
            <textarea required placeholder="Ej: Novedades sobre auditorías externas..." class="w-full h-24 p-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white text-gray-800 resize-none shadow-inner"></textarea>
          </div>
        `;
        form.dataset.tipo = 'nuevo_punto';

      } else if (tipo === 'editar_punto') {
        titulo.textContent = 'Editar Punto';
        subtitulo.textContent = 'Modificando la pregunta del temario.';
        btnSubmit.textContent = 'Actualizar';
        contenido.innerHTML = `
          <div>
            <label class="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Texto del punto a reportar</label>
            <textarea required class="w-full h-24 p-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#298c71] bg-white font-bold text-gray-800 resize-none shadow-inner">${datoExtra}</textarea>
          </div>
        `;
        form.dataset.tipo = 'editar_punto';
      } else if (tipo === 'confirmar_eliminar_punto') {
        titulo.textContent = 'Eliminar Punto';
        subtitulo.textContent = 'Quitar pregunta del temario';
        btnSubmit.textContent = 'Sí, eliminar';
        contenido.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
             ¿Estás seguro que deseas eliminar este punto? Ya no aparecerá en el formulario de creación de novedades.
          </div>
        `;
        form.dataset.tipo = 'confirmar_eliminar_punto';
      } else if (tipo === 'confirmar_mantenimiento') {
        titulo.textContent = 'Activar Modo Mantenimiento';
        subtitulo.textContent = 'Acción crítica del sistema';
        btnSubmit.textContent = 'Sí, activar ahora';
        contenido.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
             <strong>¡Atención!</strong> ¿Estás seguro que deseas activar el Modo Mantenimiento? 
             Se cerrarán todas las sesiones activas inmediatamente y nadie podrá ingresar, excepto los usuarios con rol de <em>Admin</em>.
          </div>
        `;
        form.dataset.tipo = 'confirmar_mantenimiento';
      }

      overlay.classList.remove('hidden');
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        container.classList.remove('scale-95');
      });
    };

    // Función para cerrar el modal suavemente
    window.cerrarModalAdmin = () => {
      const overlay = document.getElementById('admin-modal-overlay');
      const container = document.getElementById('admin-modal-container');
      
      // Proceso de salida
      overlay.classList.add('opacity-0');
      container.classList.add('scale-95');
      
      // Esperamos que termine la transición (aprox 300ms) para ocultarlo por completo
      setTimeout(() => {
        overlay.classList.add('hidden');
        document.getElementById('form-admin-modal').reset();
      }, 300);
    };

    // Función para seleccionar la gerencia en la vista de Temarios
    window.seleccionarGerenciaTemario = (btn, nombreGerencia) => {
      // 1. Buscamos todos los botones de esa lista y los "apagamos"
      const botones = document.querySelectorAll('.btn-gerencia-temario');
      botones.forEach(b => {
        b.classList.remove('bg-[#ebf2ee]', 'text-[#1a4031]', 'border-[#298c71]/30');
        b.classList.add('text-gray-600', 'border-transparent');
      });
      
      // 2. "Prendemos" el botón que fue clickeado
      btn.classList.remove('text-gray-600', 'border-transparent');
      btn.classList.add('bg-[#ebf2ee]', 'text-[#1a4031]', 'border-[#298c71]/30');
      
      // 3. Actualizamos el título de la derecha
      document.getElementById('titulo-temario-gerencia').textContent = `Temario: ${nombreGerencia}`;
    };

    // Interceptar el Guardado del formulario
    const formAdminModal = document.getElementById('form-admin-modal');
    if (formAdminModal) {
      formAdminModal.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tipo = formAdminModal.dataset.tipo;
        const usuarioNombre = formAdminModal.dataset.usuario;
        
        let tituloToast = 'Acción exitosa';
        let mensajeToast = 'Los cambios se han guardado.';
        let estiloToast = 'exito'; // Por defecto es verde

        // Evaluamos qué estábamos haciendo en el modal
        if (tipo === 'usuario') {
          mensajeToast = 'El nuevo usuario ha sido creado y se enviaron sus credenciales.';
        } else if (tipo === 'editar_usuario') {
          mensajeToast = 'Los datos del usuario se actualizaron correctamente.';
        } else if (tipo === 'gerencia') {
          mensajeToast = 'La nueva gerencia ya está habilitada para ser mencionada.';
        } else if (tipo === 'confirmar_reset') {
          tituloToast = 'Recuperación enviada';
          mensajeToast = `Se envió un email a ${usuarioNombre} para restablecer su acceso.`;
          estiloToast = 'info'; // Azul
        } else if (tipo === 'confirmar_baja') {
          tituloToast = 'Usuario suspendido';
          mensajeToast = `Se ha revocado el acceso de ${usuarioNombre} al sistema.`;
          estiloToast = 'alerta'; // Rojo/Naranja
        } else if (tipo === 'editar_gerencia') {
          mensajeToast = 'La estructura de la gerencia se actualizó correctamente.';
        } else if (tipo === 'confirmar_desactivar_area') {
          tituloToast = 'Área desactivada';
          mensajeToast = `La gerencia ${usuarioNombre} ha pasado a estado inactivo.`;
          estiloToast = 'info'; // Naranja/Azul
        } else if (tipo === 'nuevo_punto') {
          mensajeToast = 'El nuevo punto se agregó al temario de la gerencia.';
        } else if (tipo === 'editar_punto') {
          mensajeToast = 'El punto del temario se actualizó correctamente.';
        } else if (tipo === 'confirmar_eliminar_punto') {
          tituloToast = 'Punto eliminado';
          mensajeToast = 'La pregunta se quitó del temario exitosamente.';
          estiloToast = 'alerta'; // Rojo
        } else if (tipo === 'confirmar_mantenimiento') {
          tituloToast = 'Modo Mantenimiento Activado';
          mensajeToast = 'El sistema se encuentra bloqueado para el personal general.';
          estiloToast = 'alerta'; // Rojo
          
          // Activamos visualmente el interruptor que habíamos frenado
          document.getElementById('toggle-mantenimiento').checked = true;
        }
          
        cerrarModalAdmin();
        
        // Disparamos nuestro componente global de notificaciones
        import('../components/toast.js').then(module => {
          module.emitirNotificacion(tituloToast, mensajeToast, '#', estiloToast);
        });
      });
    }
  }, 100);

  // ==========================================
  // 3. RENDERIZADO HTML
  // ==========================================
  return `
    <div class="bg-[#fbfcfb] min-h-full flex flex-col relative w-full">
      
      ${headerComponent('Administración', [{ texto: 'Dervinsa', url: '#/dashboard' }])}

      <div class="flex-1 flex flex-col w-full max-w-[2560px] mx-auto px-8 lg:px-12 2xl:px-24 py-8">
        
        <div class="mb-8">
          <div class="text-[#298c71] font-bold text-xs tracking-widest uppercase mb-1">SISTEMA Y SEGURIDAD</div>
          <h2 class="text-4xl font-extrabold text-[#0a2319] mb-1">Panel de Administración</h2>
          <p class="text-gray-500 text-sm">Gestioná accesos, estructura y configuraciones globales de la plataforma.</p>
        </div>

        <!-- BOTONERA DE SOLAPAS (Tabs) -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="flex gap-8">
            <button id="btn-tab-usuarios" onclick="cambiarTabAdmin('usuarios')" class="admin-tab-btn py-3 px-1 border-b-2 border-[#298c71] text-[#1a4031] font-bold text-sm transition-colors">
              Usuarios y Accesos
            </button>
            <button id="btn-tab-gerencias" onclick="cambiarTabAdmin('gerencias')" class="admin-tab-btn py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors">
              Estructura (Gerencias)
            </button>
            <button id="btn-tab-temarios" onclick="cambiarTabAdmin('temarios')" class="admin-tab-btn py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors">
              Temarios Semanales
            </button>
            <button id="btn-tab-configuracion" onclick="cambiarTabAdmin('configuracion')" class="admin-tab-btn py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors">
              Configuración
            </button>
          </nav>
        </div>

        <!-- ========================================== -->
        <!-- TAB 1: USUARIOS (Visible por defecto)      -->
        <!-- ========================================== -->
        <div id="tab-usuarios" class="admin-tab-content bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div class="flex justify-between items-center mb-5 pb-5 border-b border-gray-100">
            <div class="relative w-80">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Buscar usuario..." class="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] focus:ring-1 focus:ring-[#298c71] transition-all">
            </div>
            <button onclick="abrirModalAdmin('usuario')" class="px-5 py-2.5 rounded-md text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nuevo Usuario
            </button>
          </div>

          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest rounded-tl-md">Usuario</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Gerencia</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Rol</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Estado</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Último Acceso</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right rounded-tr-md">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${listaUsuarios.map(user => `
                <tr class="hover:bg-gray-50/50 transition-colors group">
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded bg-[#ebf2ee] text-[#1a4031] text-[11px] font-extrabold flex items-center justify-center border border-[#298c71]/20">${user.nombre.split(' ').map(n => n[0]).join('')}</div>
                      <span class="font-bold text-sm text-gray-800">${user.nombre}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 text-sm text-gray-600 font-medium">${user.gerencia}</td>
                  <td class="py-3.5 px-4"><span class="text-[11px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm">${user.rol}</span></td>
                  <td class="py-3.5 px-4 text-center">
                    ${user.estado === 'Activo' 
                      ? `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 bg-green-50 border border-green-200"><div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Activo</span>`
                      : `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 bg-gray-100 border border-gray-200"><div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> Suspendido</span>`
                    }
                  </td>
                  <td class="py-3.5 px-4 text-sm text-gray-500 text-right">${user.acceso}</td>
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      
                      <!-- 1. CANDADO (Reset de clave por email) -->
                      <button type="button" onclick="abrirModalAdmin('confirmar_reset', '${user.nombre}')" class="p-1.5 text-gray-400 hover:text-[#298c71] hover:bg-[#ebf2ee] rounded transition-colors" title="Restablecer clave">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      </button>
                      
                      <!-- 2. LÁPIZ (Editar) -->
                      <button type="button" onclick="abrirModalAdmin('editar_usuario', '${user.nombre}')" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar datos">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>

                      <!-- 3. DAR DE BAJA (Soft Delete) -->
                      <button type="button" onclick="abrirModalAdmin('confirmar_baja', '${user.nombre}')" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Dar de baja">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5c-2.2 0-4 1.8-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
                      </button>

                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- ========================================== -->
        <!-- TAB 2: GERENCIAS (Oculta por defecto)      -->
        <!-- ========================================== -->
        <div id="tab-gerencias" class="admin-tab-content hidden bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div class="flex justify-between items-center mb-5 pb-5 border-b border-gray-100">
            <div>
              <h3 class="text-lg font-bold text-gray-800">Estructura Organizacional</h3>
              <p class="text-sm text-gray-500">Administrá las áreas que pueden cargar novedades.</p>
            </div>
            <button onclick="abrirModalAdmin('gerencia')" class="px-5 py-2.5 rounded-md text-sm font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nueva Gerencia
            </button>
          </div>

          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <!-- SE ELIMINÓ LA COLUMNA DE ABREVIATURA, "Nombre del Área" ahora es el primer th -->
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest rounded-tl-md">Nombre del Área</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Responsable Principal</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Usuarios</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-center">Estado</th>
                <th class="py-3 px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest text-right rounded-tr-md">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              ${listaGerencias.map(ger => `
                <tr class="hover:bg-gray-50/50 transition-colors group">
                  <td class="py-3.5 px-4 font-bold text-sm text-gray-800">${ger.nombre}</td>
                  <td class="py-3.5 px-4 text-sm text-gray-600 font-medium">${ger.responsable}</td>
                  <td class="py-3.5 px-4 text-center">
                    <span class="text-[11px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm">${ger.usuarios}</span>
                  </td>
                  <td class="py-3.5 px-4 text-center">
                    ${ger.estado === 'Activa' 
                      ? `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-green-700 bg-green-50 border border-green-200"><div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Activa</span>`
                      : `<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200"><div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> ${ger.estado}</span>`
                    }
                  </td>
                  <td class="py-3.5 px-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onclick="abrirModalAdmin('editar_gerencia', '${ger.nombre}')" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar área">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button type="button" onclick="abrirModalAdmin('confirmar_desactivar_area', '${ger.nombre}')" class="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors" title="Desactivar área">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- ========================================== -->
        <!-- TAB 3: TEMARIOS (Oculta por defecto)       -->
        <!-- ========================================== -->
        <div id="tab-temarios" class="admin-tab-content hidden grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <!-- Lista de Gerencias para seleccionar -->
          <div class="md:col-span-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col h-[500px]">
            <h3 class="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Seleccionar Gerencia</h3>
            <div class="flex-1 overflow-y-auto space-y-1 pr-2">
              <button onclick="seleccionarGerenciaTemario(this, 'Producción')" class="btn-gerencia-temario w-full text-left px-3 py-2.5 rounded-md border border-[#298c71]/30 bg-[#ebf2ee] text-[#1a4031] font-bold text-sm transition-colors">Producción</button>
              <button onclick="seleccionarGerenciaTemario(this, 'Mantenimiento')" class="btn-gerencia-temario w-full text-left px-3 py-2.5 rounded-md border border-transparent text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">Mantenimiento</button>
              <button onclick="seleccionarGerenciaTemario(this, 'Comercio Local')" class="btn-gerencia-temario w-full text-left px-3 py-2.5 rounded-md border border-transparent text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">Comercio Local</button>
              <button onclick="seleccionarGerenciaTemario(this, 'Comercio Exterior')" class="btn-gerencia-temario w-full text-left px-3 py-2.5 rounded-md border border-transparent text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">Comercio Exterior</button>
              <button onclick="seleccionarGerenciaTemario(this, 'SSHEQ')" class="btn-gerencia-temario w-full text-left px-3 py-2.5 rounded-md border border-transparent text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">SSHEQ</button>
            </div>
          </div>

          <!-- Puntos del Temario -->
          <div class="md:col-span-3 bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-[500px] flex flex-col">
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 id="titulo-temario-gerencia" class="text-lg font-bold text-gray-800">Temario: Producción</h3>
                <p class="text-sm text-gray-500">Estos puntos aparecerán en el formulario al "Crear Novedad".</p>
              </div>
              <button onclick="abrirModalAdmin('nuevo_punto')" class="px-4 py-2 rounded-md text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-sm flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Agregar Punto
              </button>
            </div>
            
            <div class="flex-1 overflow-y-auto space-y-3 pr-2">
              ${temarioEjemplo.map(punto => `
                <div class="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#298c71]/40 transition-colors group bg-white shadow-sm">
                  <div class="w-8 h-8 rounded bg-gray-100 text-gray-500 font-bold text-xs flex items-center justify-center shrink-0 border border-gray-200">${punto.id}</div>
                  <div class="flex-1 pt-1.5">
                    <p class="text-sm font-bold text-gray-800 leading-snug">${punto.texto}</p>
                  </div>
                  <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    
                    <!-- LÁPIZ -->
                    <button onclick="abrirModalAdmin('editar_punto', '${punto.texto}')" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    
                    <!-- BASURERO -->
                    <button onclick="abrirModalAdmin('confirmar_eliminar_punto')" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                    
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- ========================================== -->
        <!-- TAB 4: CONFIGURACIÓN (Oculta por defecto)  -->
        <!-- ========================================== -->
        <!-- Aplicamos Grid: 1 columna en móvil, 2 en pantallas grandes -->
        <div id="tab-configuracion" class="admin-tab-content hidden grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px]">
          
          <!-- TARJETA 1: Cierre de Weekly -->
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit">
            <h3 class="text-lg font-bold text-gray-800 mb-1">Cierre de Weekly</h3>
            <p class="text-sm text-gray-500 mb-6">Define cuándo el sistema "corta" la semana para armar la consolidación gerencial.</p>
            
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Día de corte</label>
                <select class="w-full px-4 py-2.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white font-medium text-gray-800">
                  <option>Martes</option>
                  <option selected>Miércoles</option>
                  <option>Jueves</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] font-extrabold text-gray-500 uppercase tracking-widest mb-2">Hora límite</label>
                <input type="time" value="13:00" class="w-full px-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-[#298c71] bg-white font-bold text-gray-800">
              </div>
            </div>
            
            <div class="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <span class="text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded border border-amber-200 flex items-center gap-1.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Cambiar con previo aviso.</span>
              
              <!-- Agregamos notificación de éxito al guardar -->
              <button onclick="import('../components/toast.js').then(m => m.emitirNotificacion('Configuración guardada', 'Los parámetros de cierre semanal se han actualizado.', '#', 'exito'))" class="px-5 py-2 rounded-md text-sm font-bold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                Guardar cambios
              </button>
            </div>
          </div>

          <!-- TARJETA 2: Mantenimiento del Sistema -->
          <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit">
            <h3 class="text-lg font-bold text-gray-800 mb-1">Mantenimiento del Sistema</h3>
            <p class="text-sm text-gray-500 mb-6">Controles técnicos y notificaciones.</p>
            
            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3 hover:bg-gray-50 transition-colors">
              <div>
                <strong class="text-sm text-gray-800 block">Notificaciones por Email</strong>
                <span class="text-xs text-gray-500">Enviar alertas automáticas cuando un área es mencionada.</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <!-- Toggle simple (Aviso verde) -->
                <input type="checkbox" class="sr-only peer" checked onclick="import('../components/toast.js').then(m => m.emitirNotificacion('Notificaciones actualizadas', 'Preferencia guardada exitosamente.', '#', 'exito'))">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#298c71]"></div>
              </label>
            </div>

            <div class="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50/30 hover:bg-red-50/50 transition-colors">
              <div>
                <strong class="text-sm text-red-700 block">Modo Mantenimiento</strong>
                <span class="text-xs text-red-600/80">Bloquea el acceso a todos los usuarios excepto SuperAdmin.</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <!-- Hacemos que el clic prevenga el cambio inmediato y abra el Modal -->
                <input type="checkbox" id="toggle-mantenimiento" class="sr-only peer" onclick="event.preventDefault(); abrirModalAdmin('confirmar_mantenimiento')">
                <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL GENÉRICO (Oculto por defecto)        -->
    <!-- ========================================== -->
    <div id="admin-modal-overlay" class="fixed inset-0 z-[100] hidden flex items-center justify-center bg-[#0a2319]/40 backdrop-blur-sm transition-opacity opacity-0">
  
      <!-- CONTENEDOR DEL MODAL (Borde acentuado superior) -->
      <div id="admin-modal-container" class="bg-white w-full max-w-md mx-4 rounded-lg shadow-2xl border-t-4 border-[#298c71] transform scale-95 transition-transform duration-300">
    
        <!-- ENCABEZADO -->
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div>
            <h3 id="modal-titulo" class="text-lg font-extrabold text-[#0a2319]">Título del Modal</h3>
            <p id="modal-subtitulo" class="text-xs text-gray-500 mt-0.5">Descripción breve de la acción.</p>
          </div>
          <button type="button" onclick="cerrarModalAdmin()" class="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- CUERPO DEL FORMULARIO -->
        <form id="form-admin-modal" class="flex flex-col">
      
          <!-- CONTENIDO DINÁMICO (Los inputs van acá) -->
          <div id="modal-contenido" class="px-6 py-5 space-y-4">
             <!-- Este contenido se inyectará mediante JS dependiendo de si es Usuario o Gerencia -->
          </div>

          <!-- FOOTER / BOTONERA -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-lg">
            <button type="button" onclick="cerrarModalAdmin()" class="px-4 py-2 rounded-md text-sm font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2 rounded-md text-sm font-bold text-white bg-[#1a4031] hover:bg-[#122e23] transition-colors shadow-sm flex items-center gap-2 active:scale-95">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              <span id="modal-btn-submit">Guardar</span>
            </button>
          </div>
      
        </form>
      </div>
    </div>
  `;
}

