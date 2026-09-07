// 1. Importamos el componente que creamos en la otra carpeta
import { sidebar } from './components/sidebar.js';

const app = document.querySelector('#app');

function renderApp() {
  // 2. Inyectamos la función sidebar() directamente en el HTML
  app.innerHTML = `
    <div class="flex min-h-screen bg-[#f4f6f4]">
      
      <!-- Acá se dibuja todo el menú lateral automáticamente -->
      ${sidebar('dashboard')}

      <!-- ÁREA PRINCIPAL -->
      <main class="flex-1 p-8 md:ml-[250px]">
        <div class="max-w-[1580px] mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Pantalla Principal</h2>
          <p class="text-gray-600">Este es el espacio donde tu compañero va a poder armar el Dashboard.</p>
        </div>
      </main>

    </div>
  `;
}

renderApp();