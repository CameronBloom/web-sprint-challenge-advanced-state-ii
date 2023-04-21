import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { selectAnswer, setMessage } from '../state/action-creators';
import { fetchQuiz, postAnswer } from '../state/action-creators';

function Quiz(props) {

  // run fetchQuiz once on load
  useEffect(() => {
    console.log(`use effect triggered...`)
    { !props.quiz ? props.fetchQuiz() : console.log(props) }
  }, []);

  const handlePostAnswer = () => {
    const quizId = props.quiz.quiz_id;
    const answerId = props.quiz.answers[props.selectedAnswer]["answer_id"];
    props.postAnswer(quizId, answerId);
  }
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{ props.quiz.question }</h2>

            <div id="quizAnswers">
              { props.quiz.answers.map((answer, index) => {
                return (
                  <div 
                    key={index}
                    className={index === props.selectedAnswer ? "answer selected" : "answer"}
                    onClick={ () => { props.selectAnswer(index); props.setMessage(""); } }
                  >{answer.text}
                    {index === props.selectedAnswer ? <button>SELECTED</button> : <button>Select</button> }
                  </div>
                )
              })}
            </div>
            <button 
              id="submitAnswerBtn"
              disabled={ !props.selectedAnswer && props.selectedAnswer !== 0 }
              onClick={ () => handlePostAnswer() }
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  }
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer, setMessage })(Quiz)
