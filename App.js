import React , { useState,  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Button, TextInput } from 'react-native';

export default function App() {

  const [ txt , setTxt ] = useState("안녕하세요. ");

  return (
    <View style={{flex : 1, backgroundColor :'#fc0'}}>
    <SafeAreaView style={{flex: 1,  }}>
      {/* <StatusBar style='auto'/> */}
      <View style={{padding : 20, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
        <Button title="저장"></Button>
        <Text style={{textAlign : 'center' , fontSize : 18}}>메모장</Text>
        <Button title="불러오기"></Button>
      </View>
      <View style={{backgroundColor : '#eeeeee', flex :1, padding : 20}}>
        <TextInput 
        value={txt} 
        onChangeText={ txt => setTxt(txt)}
        // 줄바꿈 가능
        multiline
        
        ></TextInput>
      </View>
    </SafeAreaView>
    </View>
  );
}