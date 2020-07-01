import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: 5,
      marginLeft: 5,
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemImage: {
      height: 110,
      width: 110
    },
    searchBar: {
      margin: 20
    },
    rectangle1: {
      width: 100,
      height: 40,
      backgroundColor: '#303f9f',
      marginLeft: 10
    },
    rectText1: {
      fontSize: 16,
      color: '#fff',
      paddingTop: 8,
      alignSelf: 'center',
      alignContent: 'center'
    },
    tagsContainer: {
      flexDirection: 'row',
      marginLeft: 15
    }
  
  });

  export default styles;