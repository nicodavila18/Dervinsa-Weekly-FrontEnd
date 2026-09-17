// 1. Agregamos los emails a nuestros perfiles
export const usuariosPrueba = {
  gerenteGeneral: {
    id: 1,
    nombre: "Roberto Gómez",
    rol: "gerente_general", 
    gerencia: "Gerencia General", // Juan debería ser Gral.
    email: "gerentegeneral@gmail.com"
  },
  gerenteSsheq: { // Clave única para Pablo
    id: 2,
    nombre: "Juan Perez",
    rol: "gerencia",
    gerencia: "SSHEQ",
    email: "ssheq@gmail.com"
  },
  gerenteProduccion: { // Clave única para Roberto
    id: 3,
    nombre: "Roberto Peral",
    rol: "gerencia",
    gerencia: "Producción",
    email: "produccion@gmail.com"
  },
  gerenteMantenimiento: {
    id: 4,
    nombre: "Manuel Belgrano",
    rol: "gerencia",
    gerencia: "Mantenimiento", // Debe ser idéntico al nombre en bancoDePreguntas
    email: "mantenimiento@gmail.com"
  },
  gerenteDeposito: {
    id: 5,
    nombre: "Daniel del Favero",
    rol: "gerencia",
    gerencia: "Depósito", // Debe ser idéntico al nombre en bancoDePreguntas
    email: "deposito@gmail.com"
  },
  gerenteComercioLocal: {
    id: 6,
    nombre: "Gustavo Salinas",
    rol: "gerencia",
    gerencia: "Comercio Local", // Debe ser idéntico al nombre en bancoDePreguntas
    email: "comerciolocal@gmail.com"
  },
  gerenteComercioExterior: {
    id: 7,
    nombre: "Miriam Rodriguez",
    rol: "gerencia",
    gerencia: "Comercio Exterior", // Debe ser idéntico al nombre en bancoDePreguntas
    email: "comercioexterior@gmail.com"
  },
  gerenciaAdministracion: {
    id: 8,
    nombre: "Carmen Gandolfo",
    rol: "gerencia",
    gerencia: "Administración", // Debe ser idéntico al nombre en bancoDePreguntas
    email: "administracion@gmail.com"
  },
  gerenciaRRHH: {
    id: 9,
    nombre: "Rodrigo Mateo",
    rol: "gerencia",
    gerencia: "RRHH", // Debe ser idéntico al nombre en bancoDePreguntas
    email: "rrhh@gmail.com"
  },
  gerenciaIT: {
    id: 10,
    nombre: "Lionel Messi",
    rol: "admin_it",
    gerencia: "Sistemas",
    email: "it@gmail.com"
  }
};

// 2. SIMULADOR DE SESIÓN ACTUAL (Forzado para desarrollo)
export let usuarioActual = null;

// 3. Creamos una función para actualizar el usuario cuando inicie sesión
export function setUsuarioActual(usuario) {
  usuarioActual = usuario;
}