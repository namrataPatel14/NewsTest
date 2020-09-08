import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {card, Card} from 'native-base'
class Info extends Component{
  constructor(props){
      super(props);
  }
  render(){
      const jsonContent = this.props.route.params.jsonData;
      console.log(jsonContent);
      return(
          <View style={styles.container}>
              <Card style={styles.cardStyle}>
                <Text>{JSON.stringify(jsonContent)}</Text>
              </Card>
          </View>
      )
  }
}
export default Info;

const styles = StyleSheet.create({
    container:{
        padding:15
    },
    text:{
        fontSize:16
    },
    cardStyle:{
        padding:15
    }
})