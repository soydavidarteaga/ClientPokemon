import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator , FlatList, YellowBox, Image } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loading:false,
      pokemon:[],
      url:'https://pokeapi.co/api/v2/pokemon'
    }

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  componentDidMount(){
    this.getPokemons()
  }
	
FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

  getPokemons = () => {
    this.setState({loading:true})

    fetch(this.state.url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          pokemon: res.results,
          url:res.next,
          loading:false
        })
      })
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
          <ActivityIndicator size="large" />

        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <Image source={{uri:'https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png'}} style={styles.imageView}></Image>
          <Text style={{fontSize:25,padding:10,backgroundColor:'#000',color:'#fff',fontWeight:'bold'}}>Listado de pokemon!</Text>

          <View style={{flex:1,paddingTop:50,width:'100%'}}>
            <FlatList 
              data={this.state.pokemon}
              renderItem={({item}) => 
              <View style={{flex:1, padding:10 ,flexDirection: 'row',borderColor:'black'}}>
                <Text style={styles.textView}>{item.name}</Text> 
              </View>} 
              keyExtractor={(item,index) => item.toString()}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageView: {
 
    width: '50%',
    height: 100,
 
},
 
textView: {
 
    width:'100%', 
    textAlignVertical:'center',
    textAlign:'center',
    padding:10,
    color: '#3498db',
    backgroundColor:'#f1c40f',
    fontWeight:'bold',
    borderColor:'#000'
}  
});
