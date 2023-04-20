import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Form(props) {
  const onChange = evt => {
    evt.preventDefault();
    props.inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(props.form.newQuestion, props.form.newTrueAnswer, props.form.newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      <button 
        id="submitNewQuizBtn"
        disabled={ 
          props.form.newQuestion.trim().length < 1 ||
          props.form.newTrueAnswer.trim().length < 1 ||
          props.form.newFalseAnswer.trim().length < 1 
        }
      >Submit new quiz</button>
    </form>
  )
}



export default connect(st => st, actionCreators)(Form)
