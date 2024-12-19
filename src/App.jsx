import React,{ useRef, useEffect, useState } from 'react'
import './App.css'
import * as tf from "@tensorflow/tfjs"
import * as qna from "@tensorflow-models/qna"
import {InfinitySpin} from "react-loader-spinner"

function App() {

  const textRef = useRef(null);
  const questionRef = useRef(null);
  const [model, setModel] = useState();
  const [answer, setAnswer] = useState();

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model loaded");
  }

  const answerQuestion = async(e) => {
    if(e.which === 13 && model !== null){
      console.log("Question submitted");

    const text = textRef.current.value
    const question = questionRef.current.value

    const answers = await model.findAnswers(question, text);
    setAnswer(answers);
    console.log(answers)
    }
  }
  useEffect(()=>{loadModel()},[]);
  return (
     <div className='App'>
      <header className='App-header'>
        {model == null ?
        <div>
          <div>Model loading</div>
            <InfinitySpin
              color='black'
            />
        </div>
        :
        <React.Fragment>
          <div className='title'><h1>Drop a text <span className='hand_emoji'>&#128071;</span></h1></div>
          <textarea ref={textRef} cols={120} rows={30}></textarea>
          <div className='question_section'><h3>Ask your question <span className='face_emoji'>&#128522;</span></h3></div>
          <input ref={questionRef} onKeyPress={answerQuestion} size={105}/>
          <br/>

          <h2>Answers</h2>
          <div className='answers'>
            {answer ? answer.map((answer,idx) =><div><b> Answer {idx+1} </b> - {answer.text} ({Math.floor(answer.score*100)/100})</div>) : ""}
          </div>
        </React.Fragment>
        }
  
      </header>
  </div>

  )
}

export default App
