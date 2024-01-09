import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad, formatearFecha} from '../helpers';

//Este diccionario son para identificar las imagenes con los categoria gasto
const diccionarioIconos = {
  ahorro: require('../img/icono_ahorro.png'),
  comida: require('../img/icono_comida.png'),
  casa: require('../img/icono_casa.png'),
  gastos: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

const Gasto = ({gasto, setModal, setGasto}) => {
  const {nombre, categoria, cantidad, fecha} = gasto //Es para extraer los atributos del objeto gasto

  const handleAcciones = () => {
    setModal(true)
    setGasto(gasto)//Realizamos un state nuevo en app para guardar el objeto de los atributos que vayamos a editar
  }

  return (
    <Pressable
      onLongPress={handleAcciones}
    >
      <View style={styles.contenedor}>
        <View style={styles.contenido}>
          <View style={styles.contenedorImagen}>
            <Image
              style={styles.imagen}
              source={diccionarioIconos[categoria]} //Esta mapeado las categorias asi que se van asociar
            />
            <View style={styles.contenedorTexto}>
              <Text style={styles.categoria}>{categoria}</Text>
              <Text style={styles.nombre}>{nombre}</Text>
              <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>
            </View>
          </View>

          <Text style={styles.cantidad}>{formatearCantidad(cantidad)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20,
  },
  contenido:{
    flexDirection: 'row',//Aplicamos flex Direction para poder poner la cantidad hacia la izquierda
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contenedorImagen:{
    flexDirection: 'row', //Aplicar flexDirection para poder a un lado lo que es el texto y la imagen
    alignItems: 'center',
    flex: 1//Esto es para que crezca proporcionalmente al padre
  },
  imagen:{
    height: 80,
    width: 80,
    marginRight: 20
  },
  contenedorTexto:{
    flex: 1
  },
  categoria:{
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 5
  },
  nombre:{
    fontSize: 15,
    color: '#64748B',
    marginBottom: 5
  },
  cantidad:{
    fontSize: 16,
    fontWeight: '700'
  },
  fecha:{
    fontWeight: '700',
    color: '#DB2777'
  }
});

export default Gasto;
