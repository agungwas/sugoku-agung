import React, { useState } from 'react';
import { Alert, Button, Modal, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default function Home (props) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('random')
  const [error, setError] = useState(false)
  const [errMsg, setErrmsg] = useState('')
  
  const customButton = () => {
    if (!name || !level) setError(true)
    if (!name) setErrmsg('Name is required')
    else if (!level) setErrmsg('Level is required')
    else if (!level && !name) setErrmsg('Name & Level is required')
    else props.navigation.push('Game', { name, level })
  }
  const closeModal = () => setError(false)
  const handleName = (val) => setName(val)

  const difficulty = [
    {
      label: 'Easy',
      value: 'easy'
    },
    {
      label: 'Medium',
      value: 'medium'
    },
    {
      label: 'Hard',
      value: 'hard'
    },
    {
      label: 'Random',
      value: 'random'
    },
  ]
  const handleDifficult = (val) => setLevel(val)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>      
      <Modal 
        visible={error}
        animationType='fade'
        transparent={true}
        onRequestClose={closeModal}
        >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: 'black', padding: 30, borderRadius: 10 }}>
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 50, color: 'red' }}>Error!</Text>
            <Text style={{ color: 'white', fontSize: 30, marginVertical: 20}}>{errMsg}</Text>
            <Button onPress={closeModal} title='Close' />
          </View>
        </View>
      </Modal>
      <Text style={{ fontSize: 30, marginBottom: 10 }}>Enter Your Name :</Text>
      <TextInput onChangeText={handleName} style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: 20, borderWidth: 3, borderColor: 'blue', width: 400, borderRadius: 10, fontSize: 20 }} />
      <Text style={{ fontSize: 30, marginBottom: 10 }}>Select Your Level :</Text>
      <RadioForm radio_props={difficulty} initial={0} onPress={handleDifficult} formHorizontal={true} labelStyle={{ marginRight: 10, fontSize: 20 }} buttonColor='blue' style={{ marginBottom: 20 }} />
      <TouchableOpacity onPress={customButton} style={{ backgroundColor: 'blue', borderRadius: 10, maxHeight: 50 , paddingHorizontal: 10, paddingBottom: 5 }}>
        <Text style={{ color: 'white', fontSize: 30 }} >Play</Text>
      </TouchableOpacity>
    </View>
  )
}