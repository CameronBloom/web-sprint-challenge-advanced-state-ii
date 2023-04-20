// the reducer accepts the previous state and the action and returns the next state of your application

// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types'
import { SET_INFO_MESSAGE } from "./action-types";
import { SET_SELECTED_ANSWER, SET_QUIZ_INTO_STATE } from "./action-types";
import { INPUT_CHANGE, RESET_FORM } from "./action-types";

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return action.payload
    case MOVE_COUNTERCLOCKWISE:
      return action.payload
    default:
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE:
      console.log(`reducer: setting quiz into state...`)
      return action.payload
    default:
      return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case SET_SELECTED_ANSWER:
      console.log(`reducer: setting selected answer into state...`)
      return action.payload
    default:
      return state
  }
}


const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  console.log(`reducer: setting message into state...`)
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  console.log(`reducer: setting form into state...`)
  switch(action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload["field"]]: action.payload["value"]
      }
    case RESET_FORM:
      return {
        ...state,
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      }
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
