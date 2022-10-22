import React , { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [ txt , setTxt ] = useState("안녕하세요. ");

  useEffect(() => {
    console.log('프로그램시작');
    loadData();
  }, [])


  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem('memoData', value)
      console.log('저장');
    } catch (e) {
      // saving error
    }
  }

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('memoData')
      if(value !== null) {
        // value previously stored
        setTxt(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  

  return (
    <View style={{flex : 1, backgroundColor :'#fc0'}}>
    <SafeAreaView style={{flex: 1,  }}>
      {/* <StatusBar style='auto'/> */}
      <View style={{padding : 20, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
        <Button title="저장" onPress={() => saveData(txt)}></Button>
        <Text style={{textAlign : 'center' , fontSize : 18}}>메모장</Text>
        <Button title="불러오기" onPress={() => loadData()}></Button>
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