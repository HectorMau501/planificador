import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  // Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header.js';
import NuevoPresupuesto from './src/components/NuevoPresupuesto.js';
import ControlPresupuesto from './src/components/ControlPresupuesto.js';
import FormularioGasto from './src/components/FormularioGasto.js';
import {generarId} from './src/helpers/index.js';
import ListadoGastos from './src/components/ListadoGastos.js';
import Gasto from './src/components/Gasto.js';
import Filtro from './src/components/Filtro.js';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //Para poder validar presupuesto
  const [presupuesto, setPresupuesto] = useState(0); //Esta es la variable de para el presupuesto, se inicia en 0, para validar que no haya numeros negativos
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({}); //Objeto vacio
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]); //Objeto vacio

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try{
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto')
        console.log(presupuestoStorage) ?? 0

        if(presupuestoStorage > 0 ){
          setPresupuesto(presupuestoStorage) //lo pone en setPresupuesto
          setIsValidPresupuesto(true) //Para que si hay un presupuesto, lo envie directamente a presupuesto
        }
      }catch(error){
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  }, [])//este se ejecuta solo una vez

  //Es para guardar los datos, aunque nos salgamos de la app
  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect (() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')

        setGastos( gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  }, [])

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos) )//Para que guarde los gastos cada vez que se actualice
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  }, [gastos])

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor');
    }
  };

  //Funcion para cuando vayamos a registrar en el formulario gasto
  const handleGasto = gasto => {
    // Validar que hay campos varios o no
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return; // para que no se ejecute las siguientes lineas
    }

    if (gasto.id) {
      //Para actualizar, creamos un nuevo objeto
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizados);
    } else {
      //Añadir el  nuevo gasro al state
      gasto.id = generarId();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto]); //Para agregarlo al State
    }
    setModal(!modal);
  };

  const eliminarGasto = id => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            ); //Este codigo es el de eliminar, y funciona en que, nosotros le estamos dando un id, y retorna en el nuervo arreglo de gastosActualizados los que sean diferentes al id, va a buscar entre el arreglo al id para poder eliminarlo y retorna a los otros que queden

            setGastos(gastosActualizados);
            setModal(!modal); //Lo contrario, para poder cerrar el modal
            setGasto({}); //Para que vuelva hacer un objeto vacio
          },
        },
      ],
    );
  };

  const resetearApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esto eliminará presupuesto y gastos',
      [
        { text: 'No', style: 'cancel'},
        { text: 'Si, Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear() //Eliminara todo que este en Storage

            setIsValidPresupuesto(false)//Para que se envie a modal inicial
            setPresupuesto(0) //Para que el presupuesto lo reinicie a 0
            setGasto([]) //Para que el arreglo lo haga vacio
            
          } catch (error) {
            console.error
          }
        }}
      ]
    )
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              presupuesto={presupuesto} //le pasamos presupuesto
              gastos={gastos}
              resetearApp={resetearApp}
            />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={
                handleNuevoPresupuesto
              }></NuevoPresupuesto>
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 450,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute', //No cambia nada, pero nos sirve para poder hacer cambios con otras propiedades
    //Podemos utilizar estas propiedades por absolute
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
