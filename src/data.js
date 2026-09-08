// 1. Agregamos los emails a nuestros perfiles
export const usuariosPrueba = {
  gerenteGeneral: {
    id: 1,
    nombre: "Juan Pérez",
    rol: "gerente_general", 
    gerencia: "Gerencia General",
    email: "gerentegeneral@gmail.com"
  },
  gerenteArea: {
    id: 2,
    nombre: "Ana Gómez",
    rol: "gerencia",
    gerencia: "Comercio Local",
    email: "gerentearea@gmail.com"
  }
};

// 2. SIMULADOR DE SESIÓN ACTUAL (Forzado para desarrollo)
export let usuarioActual = usuariosPrueba.gerenteGeneral;

// 3. Creamos una función para actualizar el usuario cuando inicie sesión
export function setUsuarioActual(usuario) {
  usuarioActual = usuario;
}