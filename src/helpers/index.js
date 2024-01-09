//Son funciones que se pueden reutilizar

//Y esto lo que va hacer es que nos va a cambiar una cantidad a representacion de dinero
export const formatearCantidad = cantidad => {
  //Tiene que ser Number para que este disponible para los demas componentes
  //LocaleString es una API para la definicion de la moneda de tu pais
  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

//Es para que la fecha salga bien en Gastos
export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha)
  const opciones = {
    // Hay mas formas de poner la fecha solo es de cambiar el numeric o short
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return fechaNueva.toLocaleDateString('es-Es',opciones)
}

export const generarId = () => {
  const random = Math.random().toString(36).substring(2,11) //Asi se hace una variable de tipo random, el toString hasta 36 es para que genere un numero ya con numeros, su maximo es 36 y el substring 2,11 es para quitar el 0. que te genera al inicio
  const fecha = Date.now.toString(36)

  return random + fecha
}