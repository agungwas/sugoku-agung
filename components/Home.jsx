import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default function Home (props) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
  const [error, setError] = useState(false)
  const [errMsg, setErrmsg] = useState('')
  
  // useEffect(() => {
  //   setName('')
  //   setLevel('')
  // }, [])

  const customButton = () => {
    if (!name || !level) setError(true)
    if (!level && !name) setErrmsg('Name & Level is required')
    else if (!name) setErrmsg('Name is required')
    else if (!level) setErrmsg('Level is required')
    else {
      console.log('sampai sini');
      setName('')
      setLevel('')
      props.navigation.push('Game', { name, level })
      // props.navigation.push('Game', { name, level })
    }
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
      <TextInput value={name} onChangeText={handleName} style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: 20, borderWidth: 3, borderColor: 'blue', width: 400, borderRadius: 10, fontSize: 20 }} />
      <Text style={{ fontSize: 30, marginBottom: 10 }}>Select Your Level :</Text>
      <RadioForm initial={-1} formHorizontal={true} style={{ marginBottom: 20 }}>
        {difficulty.map((el, index) => (
          <RadioButton key={index} style={{ marginRight: 10, padding: 10}}>
            <RadioButtonInput
              isSelected={level === el.value}
              obj={el}
              index={index}
              onPress={handleDifficult}
              buttonColor='blue'
              />
            <RadioButtonLabel
              labelStyle={{ fontSize: 20, marginLeft: 5 }} 
              obj={el}
              index={index}
              onPress={handleDifficult}
              />
          </RadioButton>
        ))}
      </RadioForm>
      <TouchableOpacity onPress={customButton} style={{ backgroundColor: 'blue', borderRadius: 10, maxHeight: 50 , paddingHorizontal: 10, paddingBottom: 5 }}>
        <Text style={{ color: 'white', fontSize: 30 }} >Play</Text>
      </TouchableOpacity>
    </View>
  )
}