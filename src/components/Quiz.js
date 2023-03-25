import React, { useState, useEffect } from "react";
import "../index.css"
// import { QuizData } from "../Data/QuizData";
import QuizResult from "./QuizResult";
import { NextSvg, PrevSvg } from "./svg"

export default function Quiz() {
    const [currentQue, setCurrentQue] = useState(0)
    const [score, setScore] = useState(0)
    const [clickOption, setClickOption] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        fetch("https://script.google.com/macros/s/AKfycbzc92DH_GawKg8f5rYkt14S_wSnU7_2a9F6Q29jsPy3NxX_ngEbvkL5_pOVJiiG-6k5Tw/exec").then((res) => res.json()).then((data) => {
            setQuizData(data.data)
            console.log(data.data)
        })
    }, [])
    const changeQue = () => {
        updateScore()
        if (currentQue < quizData.length - 1) {
            setCurrentQue(currentQue + 1)
            setClickOption(false)
        } else {
            setShowResult(true)
        }
    }
    const prevQuestion = () => {
        if (currentQue > 0)
            setCurrentQue(currentQue - 1)
    }
    const updateScore = () => {
        if (clickOption === quizData[currentQue].answer) {
            setScore(score + 1)
        }
    }
    const resetAll = () => {
        setShowResult(false)
        setCurrentQue(0)
        setClickOption(0)
        setScore(0)
    }

    return (
        <div className="w-80vw">
        {quizData.length &&<>
            {!showResult && <p className="heading-text">Quiz</p>}
            <div className="que-container">
                {showResult ? <QuizResult score={score} totalScore={quizData.length} resetAll={resetAll} /> :
                    <>
                        <section className="question-wrapper">
                            <span className="que-number">{currentQue + 1}.</span>
                            <span className="question">{quizData[currentQue].question}</span>
                        </section>
                        <section className="option">
                            {quizData[currentQue].options.map((option, index) => {
                                return (
                                    <>
                                        <div className="ans-option">
                                            <div class={`triangle-left ${clickOption == index + 1 ? "clickedTriangleLeft" : null}`}></div>
                                            <button key={index} className={`option-btn ${clickOption == index + 1 ? "clicked" : null}`} onClick={() => setClickOption(index + 1)}>{option}</button>
                                            <div class={`triangle-right ${clickOption == index + 1 ? "clickedTriangleRight" : null}`}></div>
                                        </div>
                                    </>
                                )
                            })}
                        </section>
                        <section className="submit-btn">
                            <div className="svg-circle" title="Previous question" onClick={prevQuestion}><PrevSvg /></div>
                            <div className="svg-circle" title="Next question" onClick={changeQue}><NextSvg /></div>
                            {/* <input type="button" value="Next >>" className="next-btn" onClick={changeQue} /> */}
                        </section>
                    </>}
            </div></>
}
        </div>
    )
}