// Este sirve para cuando tengamos el mismo estilo para varios componentes reutilizarlos aqui y si queremos cambiar algo aqui, pues que solo sea en esta parte.
const globalStyles = {
    contenedor:{
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 20,
        transform: [{translateY: 50}], //React-native tiene una sintaxis especial para el transform donde se ponde dentro de un arreglo un objeto, este es para mover de la posicion original
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    
        elevation: 4,
    }
}

export default globalStyles