import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Dimensions
} from 'react-native';
import {Button} from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;

class Home extends Component{
  constructor(props){
      super(props);
      this.state={
         isloading:false,
         newsData:[],
         page:0,
         EndReached:true,
         searchText:''
      }
  }
  componentDidMount(){
    this.setState({isloading:true})
      this.getData();
      setInterval(()=>{
          this.getData()
      },10000)
  }
  searchfilter=(text)=>{
    this.setState({EndReached:false})
     let searchData = this.state.newsData.filter((ele)=>{
         return(
             ele.author.toLowerCase().includes(text.toLowerCase()) ||
             ele.title.toLowerCase().includes(text.toLowerCase())
         )
     })
     this.setState({newsData:searchData});
     if(!text){
         alert("Data Not Found");
     }
  } 
  getData(){
      return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+this.state.page)
      .then((response) => response.json())
      .then((responseJson)=>{
          this.setState({newsData: responseJson.hits})
          this.setState({isloading:false})
      })
      .catch((error)=>{
        console.log(error);
      })
  }
  changeText=(text)=>{
    this.setState({searchText:text})
  }
  searchbyDate=()=>{
      var sorted = this.state.newsData;
      sorted.sort((a,b)=>(a.created_at > b.created_at ? 1 : -1))
      this.setState({newsData:sorted})
  }
  searchbyTitle=()=>{
    var sorted = this.state.newsData;
    sorted.sort((a,b)=>(a.title > b.title ? 1 : -1))
    this.setState({newsData:sorted})
 }
  updateData(){
    let pageUpdate = this.state.page + 1;
    console.log(this.state.page);
    this.setState({page:pageUpdate})
    return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+pageUpdate)
    .then((response) => response.json())
    .then((responseJson)=>{
        this.setState({newsData: [...this.state.newsData , ...responseJson.hits]})
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  navigateToInfo(item){
    this.props.navigation.navigate("Info", {jsonData: item})
  }
  renderItem(data){
      return(
          <TouchableOpacity style={styles.listBox} onPress={()=>this.navigateToInfo(data.item)}>
              <Text style={styles.title}>{data.item.title}</Text>
                <Text style={styles.infoText}><Text style={styles.infoTextTitle}>URL:</Text>{" "}{data.item.url}</Text>
                <Text style={styles.infoText}><Text style={styles.infoTextTitle}>Created_at:</Text>{" "}{data.item.created_at}</Text>
                <Text style={styles.infoText}><Text style={styles.infoTextTitle}>Author:</Text>{" "}{data.item.author}</Text>
          </TouchableOpacity>
      )
  }
  render(){
      return(
          <View style={styles.container}>
              <View>
                  <TextInput
                   onChangeText={(text)=>this.changeText(text)}
                   placeholder="search by author or title"
                   value={this.state.searchText}
                   style={styles.textBox}
                  />
                  <Button block 
                  disabled={this.state.searchText == "" ? true : false} 
                  onPress={()=>this.searchfilter(this.state.searchText)}>
                      <Text style={styles.textButton}>
                          Submit
                      </Text>
                  </Button>
                  <View style={{padding:8}}/>
                  <Button block 
                  onPress={()=>this.searchbyDate()}>
                      <Text style={styles.textButton}>
                          Search By Created_at
                      </Text>
                  </Button>
                  <View style={{padding:5}}/>
                  <Button block 
                  onPress={()=>this.searchbyTitle()}>
                      <Text style={styles.textButton}>
                          Search By Title
                      </Text>
                  </Button>
              </View>
              {
                  this.state.isloading &&
                  <ActivityIndicator size={"large"} color="#000"></ActivityIndicator>
              }
              <View style={styles.listContainer}>
                <FlatList 
                data={this.state.newsData}
                renderItem= {item=> this.renderItem(item)}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.03}
                onEndReached={this.state.EndReached ? ()=>this.updateData() : null}
                />
              </View>
              
          </View>
      )
  }
}
export default Home;

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    listBox:{
        borderWidth:1,
        borderColor:'#ccc',
        marginVertical:10,
        padding:10
    },
    title:{
        fontSize:18,
        color:"#444",
        fontWeight:'bold',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        margin:3,
        paddingBottom:10
    },
    infoText:{
        fontSize:16,
        color:'#000',
        margin:5
    },
    infoTextTitle:{
        fontWeight:'bold'
    },
    listContainer:{
       height:viewportHeight - 350,
       marginTop:20
    },
    textButton:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16
    },
    textBox:{
        marginBottom:10
    }
})