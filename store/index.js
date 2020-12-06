import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

export function getBoard (level) {
  return dispatch => {
    dispatch({ type: 'LOADING START' })
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + level)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'BOARD', data: [ ...data.board ] })
        dispatch({ type: 'BOARD CLEAR', data: JSON.parse(JSON.stringify(data.board)) })
        dispatch({ type: 'CLEAR FALSE INPUT' })
      })
      .catch(console.log)
      .finally(_=> dispatch({ type: 'LOADING END' }))
  }
}

export function validate (play) {
  return (dispatch, getState) => {
    const { boardClear, board } = getState()
    dispatch({ type: 'LOADING START' })

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({ board: boardClear }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        let falseInput = []
        response.solution.forEach((rowVal, rowIndex) => {
          rowVal.forEach((colVal, colIndex) => {
            if (play[rowIndex][colIndex] !== colVal) falseInput.push([rowIndex, colIndex])
          })
        })
        console.log(JSON.stringify(response.solution));
        if (falseInput.length === 0) dispatch({ type: 'SUCCESS' })
        else dispatch({ type: 'VALIDATE BOARD', falseInput })
      })
      .catch(console.warn)
      .finally(_=> dispatch({ type: 'LOADING END'}))
  }
}

const initState = { board: [], loading: false, falseInput: [], success: false, boardClear: [], winner: [] }

function reducer(state = initState, action) {
  switch (action.type) {
    case 'LOADING START':
      return { ...state, loading: true }
    case 'LOADING END':
      return { ...state, loading: false }
    case 'BOARD':
      return { ...state, board: action.data }
    case 'VALIDATE BOARD':
      return { ...state, falseInput: action.falseInput }
    case 'CLEAR FALSE INPUT':
      return { ...state, falseInput: [] }
    case 'SUCCESS':
      return { ...state, success: true }
    case 'BOARD CLEAR':
      return { ...state, boardClear: [ ...action.data] }
    case 'RESET GAME':
      return { ...state, falseInput: [], success: false }
    case 'ADD WINNER':
      const { name, level } = action.data
      return { ...state, winner: [ ...state.winner, { name, level} ]}
    default:
      break;
  }
  return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store