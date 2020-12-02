import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function Home (props) {
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(_=> {
    setLoading(true)
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
      .then(res => res.json())
      .then(data => {
        setBoard(data.board)
      })
      .finally(_=> setLoading(false))
  }, [])

  const handleInput = (val, rowIndex, colIndex) => {
    board[rowIndex][colIndex] = +val
    setBoard(board)
  }

  const handleValidate = () => {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        let salah = 0
        response.solution.forEach((rowVal, rowIndex) => {
          rowVal.forEach((colVal, colIndex) => {
            if (board[rowIndex][colIndex] !== colVal) salah++
          })
        })
        if (!salah) {
          alert('selesai')
          console.log('selesai');
        }
        else {
          console.log(response.solution);
          alert('semangat')
          console.log('semangat');
        }
      })
      .catch(console.warn)
  }

  if (loading) return <Text>Loading luur</Text>

  return (
    <View style={styles.container}>
      { board.map((el, rowIndex) => (
        <View style={{ display: "flex", flexDirection: "row" }} key={rowIndex}>
          {el.map((datum, colIndex) => {
            if (datum !== 0) return <Text key={colIndex} style={styles.kotak}>{datum}</Text>
            else return <TextInput onChangeText={(text) => handleInput(text, rowIndex, colIndex)} keyboardType="numeric" maxLength={1} key={colIndex} style={{ ...styles.kotak, fontWeight: "normal" }}></TextInput>
          })}
        </View>
      ))}
      <Button title="Validate" onPress={handleValidate} />
    </View>
  )

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
    width: 40,
    height: 40,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});
