import React , { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Button, TextInput, FlatList , Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [ txt , setTxt ] = useState("안녕하세요. ");
  const [writeMode , setWriteMode ] = useState(false);

  const memoList = [
    {"id" : 1, "text" : '안녕하세요'},
    {"id" : 2, "text" : '홍길동입니다.'},
    {"id" : 3, "text" : '김철숩니다..!!!!!!!!!!!!!!!!!!!!!! \n안녕하세요'}
  ]

  const [ momos, setMemos ] = useState(memoList);
  const [ idx , setIdx ] = useState(4);

  const renderMemo = ({item}) => {
    return (
      <View style={{padding : 10, borderBottomColor : "#ddd" , borderBottomWidth : 1, flexDirection : 'row'}}>
        <Text style={{marginRight : 10}}>{item.id}</Text>
        <Text>{item.text}</Text>
      </View>
    )
  }

  const addMemo = () => {
    console.log(txt);

    const obj = { "id" : idx, "text" : txt};
    setMemos(prev => [...prev,obj]);
    //글쓰기 모드 변경
    setWriteMode(false);

    setIdx(prev => prev + 1);
    //alert 사용하기
    // Alert.alert(txt);
  }
  

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

  if(writeMode === false) {
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : "#9c0",}}>
      <View style={{}}>
        <Text style={{fontSize: 18, padding:15, textAlign: 'center'}}>메모장</Text>
      </View>

    <View style={{flex : 1, backgroundColor : "white", justifyContent :'center', }}>
      {/* <Text>리스트 나올곳</Text> */}
      <View style={{zIndex :10, position : 'absolute', right : 30, bottom : 50, width : 60 , backgroundColor : 'yellow'}}>
        <Button title="글쓰기" onPress={() => setWriteMode(true)}></Button>
      </View>
      {/* <StatusBar style='auto'></StatusBar> */}
    <View style={{flex : 1}}>
      <FlatList data={momos} renderItem={renderMemo} style={{flex : 1}}/>
    </View>
    </View>
    </SafeAreaView>
  );
  
  //글쓰기 영역
  } else {
  return (
    <View style={{flex : 1, backgroundColor :'#fc0'}}>
    <SafeAreaView style={{flex: 1,  }}>
      {/* <StatusBar style='auto'/> */}
      <View style={{padding : 20, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
        <Button title="글 저장" onPress={() => addMemo()} ></Button>
        {/* <Button title="임시저장" onPress={() => saveData(txt)}></Button> */}
        <Text style={{textAlign : 'center' , fontSize : 18}}>메모장</Text>
        {/* <Button title="불러오기" onPress={() => loadData()}></Button> */}
      </View>
      <View style={{backgroundColor : '#eeeeee', flex :1, padding : 20}}>
        <TextInput 
        value={txt} 
        onChangeText={ txt => setTxt(txt)}
        // 줄바꿈 가능
        multiline
        
        ></TextInput>
      </View>
      <View style={{position : 'absolute', right : 30, bottom : 50, width : 80 , backgroundColor : 'yellow'}}>
        <Button title="리스트보기" onPress={() => setWriteMode(false)}></Button>
      </View>
    </SafeAreaView>
    </View>
  );
  }
}