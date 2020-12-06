import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Finish (props) {
  const dispatch = useDispatch()

  const backtohome = () => {
    props.navigation.navigate('Sugoku by Agung Setya Pratama')
    dispatch({ type: 'RESET GAME'})
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
      <Image source={require('../assets/tenor.gif')} />
      <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 35, marginBottom: 10 }}>We Proud of you '{props.route.params.name}'</Text>
      <Text>You have complete Sugoku game with level {props.route.params.level}</Text>
      <TouchableOpacity onPress={backtohome} style={{ marginTop: 50, backgroundColor: 'blue', padding: 15, borderRadius: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}