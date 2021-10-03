import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';

import FirebaseAuth from '../components/auth/FirebaseAuth';
import useScores from '../hooks/useScores';
import useUser from '../hooks/useUser';

export default function Home() {
  const { user, logout } = useUser();
  const [scores, setScores] = useState([]);

  const router = useRouter();
  const [userInputs, setUserInputs] = useState<{ name: string, age:string }>({ name: "", age: "" });

  const handleClick:FormEventHandler = (e) => {
    e.preventDefault();
    //send the data to some API
    router.push("/categories");
  };
  const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserInputs({ ...userInputs, [inputName]: inputValue });
  };

  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>
      <form className=" form" action="">
        <p className="form-message">
          Por favor ingresa la siguiente información para mejorar la experiencia
        </p>
        <input
          type="text"
          name="name"
          id="name"
          className=" form-input name"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          id="age"
          className=" form-input age"
          placeholder="Edad"
          onChange={handleChange}
        />
        <button type="submit" className="form-btn" onClick={handleClick}>
          Continuar
        </button>
      </form>
    </>
  );
}
