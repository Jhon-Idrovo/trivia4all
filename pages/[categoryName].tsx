import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import Question from '../components/Question';
import {
    calcPoints, Category, getCategoryCode, IClientQuestion, IServerQuestion
} from '../lib/trivia';

function Trivia({ questions }: { questions: IClientQuestion[] }) {
  const [question, setQuestion] = useState(0);
  const [bar, setBar] = useState(questions.map(() => " "));
  const [time, setTime] = useState(0); //in seconds
  const [isPlaying, setIsPlaying] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const pointsRef = useRef<null | number>(null);
  // Start the timer once the page loads
  useEffect(() => {
    intervalRef.current = setInterval(() => setTime((time) => time + 1), 1000);
    return () => {
      clearInterval(intervalRef.current as unknown as number);
    };
  }, []);

  const handleClick = (e: MouseEvent<HTMLInputElement>, selection: number) => {
    /*if the user doesn't select any option
      false will be passed as selection. 
    */
    selection === questions[question].answerIndex
      ? updatePgrsBar("correct")
      : updatePgrsBar("incorrect");

    if (question < questions.length - 1) {
      setQuestion((question) => question + 1);
    } else {
      //if the user has ended the trivia
      clearInterval(intervalRef.current as unknown as number);
      setIsPlaying(false);
    }
  };

  const updatePgrsBar = (signal: string) => {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const diff = "easy";
  const code = getCategoryCode(params?.categoryName as Category);
  const url = `https://opentdb.com/api.php?amount=20&category=${code}&difficulty=${diff}&type=multiple`;

  const questions = await axios.get(url).then((res) => {
    const questions = res.data.results as IServerQuestion[];

    const formattedQuestions = questions.map((q) => {
      let options = q.incorrect_answers;
      //to render them randomly
      const len = options.length;
      const randIndex = Math.floor(Math.random() * (len + 1));

      options.splice(randIndex, 0, q.correct_answer);

      return {
        question: q.question,
        options: options,
        answerIndex: randIndex,
      } as IClientQuestion;
    });

    return formattedQuestions;
  });

  return { props: { questions } };
};
