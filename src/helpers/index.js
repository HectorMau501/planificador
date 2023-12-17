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
