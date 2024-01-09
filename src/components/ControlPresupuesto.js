import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator' //Recuerda que se tienen que instalar unas dependencias de React Native Circular Progress Indicator y recuerda poner el codigo en babel.config.js

const ControlPresupuesto = ({presupuesto, gastos}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [ porcentaje, setPorcentaje] = useState(0)

  useEffect (() => {
    const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0) // Reduce es un Array-Method, tu le vas a pasar el arreglo y le vas a decir en que parte va encontrar el total
    //Otra cosa es que son dos variables que va a tomar una para el total que va a ir incrementando y otra para el gasto que son las cantidades, despues va a ser de tipo numerico, se le va a sumar a la variable de total y ademas va a iniciar en 0

    const totalDisponible = presupuesto - totalGastado

    //Para calcular el porcentaje en la grafia podermos hacer esto
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) * 100
    )

    //Esto es para que espera antes de realizar la animacion
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);
    
    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos])//Si le pasas una dependencia se va a h estar ejecutando cada ves que se requiera, esto nos sirve para la funcion de gastado en el cual se va a ir restando

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        {/* rquire para poner la url de la imagen */}
        {/* <Image style={styles.imagen} source={require('../img/grafico.jpg')} /> */}
        <CircularProgress
          value={porcentaje}
          //Se puede poner varios tipos de animacion
          duration={1000}//Son los segundos que se van a tardar en rellenar
          radius={100}//Tamaño del CircularProgress
          valueSuffix={'%'} //Para el tipo de dato
          title = 'Gastado'
          inActiveStrokeColor='#F5F5F5'//es el color que aun no se usa
          inActiveStrokeWidth={20} //El grosor
          activeStrokeColor='#3b82f6'//El color es lo que ya se esta usando
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20 }}
          titleColor='#64748B'
        />
      </View>

      <View style={styles.contenedorTexto}>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: {''}</Text>
          {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: {''}</Text>
          {formatearCantidad(disponible)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: {''}</Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor, //para importar el contenedor de globalStyles
  },
  centrarGrafica: {
    alignItems: 'center', //Es para centrar los item ya que ya tenemos un flex direction hacia abajo
  },
  imagen: {
    width: 250,
    height: 250,
  },
  contenedorTexto:{
    // marginTop: 50
  },
  valor:{
    fontSize: 24,
    textAlign: 'center',
    // marginBottom: 10
  },
  label:{
    fontWeight: '700',
    color: '#3B82F6'
  }
});

export default ControlPresupuesto;
