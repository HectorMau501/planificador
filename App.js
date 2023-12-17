import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import Header from './src/components/Header.js';
import NuevoPresupuesto from './src/components/NuevoPresupuesto.js';
import ControlPresupuesto from './src/components/ControlPresupuesto.js';

const App = () => {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //Para poder validar presupuesto
  const [presupuesto, setPresupuesto] = useState(0) //Esta es la variable de para el presupuesto, se inicia en 0, para validar que no haya numeros negativos

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor');
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Header></Header>
        {isValidPresupuesto ? (
          <ControlPresupuesto 
            presupuesto={presupuesto}//le pasamos presupuesto
          />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            handleNuevoPresupuesto={handleNuevoPresupuesto}></NuevoPresupuesto>
        )}
      </View>
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
  },
});

export default App;
