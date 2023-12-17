import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import globalStyles from '../styles';

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto,
  handleNuevoPresupuesto

}) => { //Se para por parametro handleNuevoPresupuesto ya que va hacer 


  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
      keyboardType='numeric'
      placeholder='Agrega tu presupuesto: Ej. 300'
      style={styles.input}
      value={presupuesto.toString()} // para pasar el valor a String
      onChangeText={setPresupuesto} //Es para que pueda cambiar el input
      ></TextInput>

      <Pressable 
      style={styles.boton}
      onPress={() => handleNuevoPresupuesto(presupuesto)}
      >
        <Text style={styles.botonTexto}>Agregar Presupuerto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor
  },
  label:{
    textAlign: 'center',
    fontSize: 24,
    color:'#3B82F6',
  },
  input:{
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30
  },
  boton:{
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10
  },
  botonTexto:{
    textAlign: 'center',
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});

export default NuevoPresupuesto;
