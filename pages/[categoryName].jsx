import React from "react";
import { getCategoryCode, calcPoints } from "../lib/trivia";
import Question from "../components/Question";

import { useState, useEffect, useRef } from "react";

import axios from "axios";

function Trivia({ questions }) {
  const [question, setQuestion] = useState(0);
  const [bar, setBar] = useState(questions.map(() => " "));
  const [time, setTime] = useState(0); //in seconds
  const [isPlaying, setIsPlaying] = useState(true);

  const intervalRef = useRef();
  const pointsRef = useRef();

  useEffect(() => {
    console.log("EFFECT");
    intervalRef.current = setInterval(() => setTime((time) => time + 1), 1000);
    return () => {
      console.log("EFFECT  CLEANUP");
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = (e, selection) => {
    /*if the user doesn't select any option
      false will be passed as selection. 
    */
    parseInt(selection) === questions[question].answerIndex
      ? updatePgrsBar("correct")
      : updatePgrsBar("incorrect");

    if (question < questions.length - 1) {
      setQuestion((question) => question + 1);
    } else {
      //if the user has ended the trivia
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
  };

  const updatePgrsBar = (signal) => {
    let newBar = [...bar];
    newBar[question] = signal;
    setBar(newBar);
  };

  let min = `0${Math.floor(time / 60)}`.slice(-2);
  let sec = `0${time % 60}`.slice(-2);

  if (isPlaying) {
    return (
      <div>
        <span className="timer">{`${min}:${sec}`}</span>
        <div className="pgrs-bar">
          {bar.map((status, index) => {
            return (
              <span className={`pgrs-bar-item ${status}`} key={index}></span>
            );
          })}
        </div>
        <Question {...questions[question]} handleClick={handleClick} />
      </div>
    );
  } else {
    pointsRef.current = calcPoints(bar);
    return (
      <div className="stats-container">
        <div className="stats">
          <h3>Stats</h3>
          <h5>Time:</h5>
          <p>{`${min}:${sec}`}</p>
          <h5>Points:</h5>
          <p>{pointsRef.current}</p>
        </div>
      </div>
    );
  }
}

export default Trivia;

export async function getServerSideProps({ params }) {
  const diff = "easy";
  const code = getCategoryCode(params.categoryName);
  const url = `https://opentdb.com/api.php?amount=20&category=${code}&difficulty=${diff}&type=multiple`;
  console.log(url);

  const questions = await axios.get(url).then((res) => {
    const questions = res.data.results;

    const formattedQuestions = questions.map((q) => {
      let options = q.incorrect_answers;
      //to render the randomly
      const len = options.length;
      const randIndex = Math.floor(Math.random() * (len + 1));

      options.splice(randIndex, 0, q.correct_answer);

      return { question: q.question, options: options, answerIndex: randIndex };
    });

    return formattedQuestions;
  });

  return { props: { questions } };
}
