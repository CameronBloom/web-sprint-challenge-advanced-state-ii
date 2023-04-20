// dispatched actions explicitly handle all state changes
// dispatched actions are processed by the reducer
import axios from "axios";
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, INPUT_CHANGE, RESET_FORM } from "./action-types";


// ❗ You don't need to add extra action creators to achieve MVP
// complete
export function moveClockwise(nextPosition) {
  console.log(`action: moving clockwise...`)
  return ({type: MOVE_CLOCKWISE, payload: nextPosition})
}

// complete
export function moveCounterClockwise(nextPosition) {
  console.log(`action: moving counter_clockwise...`)
  return ({type: MOVE_COUNTERCLOCKWISE, payload: nextPosition})
}


export function selectAnswer(selection) { 
  console.log(`action: selecting answer...`)
  return ({ type: SET_SELECTED_ANSWER, payload: selection})
}

export function setMessage(message) { 
  console.log(`action: setting message...`)
  return ({ type: SET_INFO_MESSAGE, payload: message })
}

export function setQuiz(quiz) { 
  console.log(`action: setting quiz...`)
  return ({ type: SET_QUIZ_INTO_STATE, payload: quiz })
}

export function inputChange(field, value) { 
  return ({ type: INPUT_CHANGE, payload: {"field": field, "value": value} })
}

export function resetForm() { 
  return ({ type: RESET_FORM })
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    console.log(`async action: fetching quiz...`)
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => dispatch(setQuiz(res.data)))
  }
}
export function postAnswer(quiz, answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    console.log(`async action: posting answer...`)
    console.log(`quiz_id: ${quiz}`)
    console.log(`answer: ${answer}`)

    axios.post("http://localhost:9000/api/quiz/answer", { "quiz_id": quiz, "answer_id": answer })
        .then(dispatch(selectAnswer(null)))
        .then(res => dispatch(setMessage(res.data.message)))
        .then(dispatch(setQuiz(null)))
        .then(dispatch(fetchQuiz()))
  }
}
export function postQuiz(question_text, true_text, false_text) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    console.log(`async action: posting quiz...`)
    axios.post("http://localhost:9000/api/quiz/new", { 
      "question_text": question_text, 
      "true_answer_text": true_text, 
      "false_answer_text": false_text })
      .then(res => {
        // console.log(res);
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(setQuiz(res.data));
      })
      .then(dispatch(resetForm()))

  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
