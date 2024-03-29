import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, validate } from '../store';
import { Stopwatch } from 'react-native-stopwatch-timer';

export default function Home (props) {
  const { loading, board, falseInput, success, time } = useSelector(s => s)
  const [play, setPlay] = useState(board)
  const [penanda, setPenanda] = useState(false)
  const dispatch = useDispatch()
  let waktu = 0

  useEffect(_=> dispatch(getBoard(props.route.params.level)), [])
  
  useEffect(_=> {
    setPenanda(false)
    setPlay(board)
    waktu = time
    if (!loading) setPenanda(true)
  }, [loading])

  useEffect(_=> {
    const { name, level } = props.route.params
    if (success) {
      props.navigation.push('Result', { name, level })
      dispatch({ type: 'ADD WINNER', data: { name, level } })
    }
  }, [success])

  const otherBoard = _=> dispatch(getBoard(props.route.params.level))
  
  const backtohome = () => {
    dispatch({ type: 'RESET GAME'})
    props.navigation.navigate('Sugoku by Agung Setya Pratama')
  }

  const handleInput = (val, rowIndex, colIndex) => {
    play[rowIndex][colIndex] = +val
    setPlay(play) 
  }

  const handleValidate = () => {
    setPenanda(false)
    dispatch({ type: 'SET TIME', data: waktu })
    dispatch(validate(play))
  } 

  if (loading) return <ActivityIndicator size='large' style={{ flex: 1, justifyContent: 'center' }} color='blue'></ActivityIndicator>

  return (
    <View style={styles.container}>
      <Stopwatch start={penanda} startTime={time} getTime={t => waktu = t} options={options} ></Stopwatch>
      {/* <Timer tambahWaktu={tambahWaktu} waktu={waktu}></Timer> */}
      <Text style={{ fontSize: 30, marginBottom: 20, textTransform: "capitalize" }}>Level: {props.route.params.level}</Text>
      <View style={{ marginBottom: 20 }}>
        { play.map((el, rowIndex) => (
          <View style={{ display: "flex", flexDirection: "row" }} key={rowIndex}>
            {el.map((datum, colIndex) => {
              if (falseInput.find(wrong => (wrong[0] === rowIndex && wrong[1] === colIndex)))
                return (<TextInput
                  onChangeText={(text) => handleInput(text, rowIndex, colIndex)}
                  keyboardType="numeric"
                  maxLength={1} key={colIndex}
                  style={{ ...styles.kotak, fontWeight: "normal", backgroundColor: 'red' }}
                  >{(play[rowIndex][colIndex] !== 0) && play[rowIndex][colIndex]}</TextInput>)
              else if (play[rowIndex][colIndex] !== 0) return <Text key={colIndex} style={styles.kotak}>{datum}</Text>
              else return <TextInput onChangeText={(text) => handleInput(text, rowIndex, colIndex)} keyboardType="numeric" maxLength={1} key={colIndex} style={{ ...styles.kotak, fontWeight: "normal" }}></TextInput>
            })}
          </View>
        ))}
      </View>
      <Button title="Validate" onPress={handleValidate} />
      <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", marginTop: 80, width: 400 }}>
        <TouchableOpacity onPress={otherBoard} style={{ ...styles.tombol, backgroundColor: 'green' }}>
          <Text style={{ color: 'white' }}>Other Board</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={backtohome} style={{ ...styles.tombol, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const options = {
  container: {

  },
  text: {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kotak: {
    borderColor: 'black',
    borderWidth: 1,
    width: 60,
    height: 60,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  tombol: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10
  }
});
