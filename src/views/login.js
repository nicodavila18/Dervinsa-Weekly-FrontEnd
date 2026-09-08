/**
 * VISTA: Pantalla de Login
 * Usa el logo completo y unifica los colores corporativos.
 */
export function loginView() {
  return `
    <!-- 1. FONDO: Lo oscurecimos un poquito cambiando a #e2ebe6 -->
    <div class="min-h-screen bg-[#e2ebe6] flex flex-col items-center justify-center p-4">
      
      <div class="w-full max-w-[340px] flex flex-col items-center text-center">
        
        <!-- 2. LOGO: Borramos los textos (h1, h2, p) y dejamos solo el logo.png. 
             Le dimos un ancho de 220px para que las letras sean legibles. -->
        <img src="/logo.png" alt="Logo Dervinsa" class="w-[220px] h-auto mb-8 object-contain" />

        <!-- Formulario de Login -->
        <form id="login-form" class="w-full flex flex-col gap-3.5">
          
          <input 
            type="email" 
            id="email-input"
            placeholder="Usuario o correo electrónico" 
            class="w-full px-4 py-3 bg-white/90 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4031] focus:border-transparent transition-all shadow-sm"
            required
          />
          
          <input 
            type="password" 
            placeholder="Contraseña" 
            class="w-full px-4 py-3 bg-white/90 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4031] focus:border-transparent transition-all shadow-sm"
            required
          />
          
          <p id="login-error" class="text-red-500 text-xs font-bold hidden m-0">
            Correo no encontrado. Verificá los datos.
          </p>

          <!-- 3. BOTÓN: Unificamos el color al #1a4031 (el mismo del sidebar) -->
          <button 
            type="submit" 
            class="w-full mt-2 bg-[#298c71] hover:bg-[#1a4031] text-white font-bold py-3.5 px-4 rounded-lg text-sm transition-colors duration-300 shadow-md active:scale-95">
            Iniciar Sesión
          </button>
        </form>

        <a href="#" class="mt-6 text-xs font-medium text-[#7a9387] hover:text-[#1a4031] transition-colors">
          Recuperar contraseña
        </a>
      </div>
    </div>
  `;
}