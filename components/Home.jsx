import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Home (props) {
  
  const playButton = () => {
    props.navigation.push('Game')
  }

  return (
    <View>
      <Button onPress={playButton} title='Play' />
    </View>
  )
}