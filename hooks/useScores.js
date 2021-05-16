import firebase from "firebase/app";
import "firebase/firestore";
import { useState, useEffect } from "react";
import useUser from "./useUser";

import { useQuery, useQueryClient } from "react-query";

function useScores() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const getScores = async () => {
    const userID = user.id;

    const query = firebase
      .firestore()
      .collection("scores")
      .where("userID", "==", userID)
      .get();
    const data = await query.then((snapshot) =>
      snapshot.forEach((doc) => doc.data())
    );
    console.log(data);
    return data;
  };

  const {
    data: scores,
    isLoading: isLoadingScores,
    isError: isErrorFetchigScores,
    error: fetchingError,
  } = useQuery("scores", getScores, { enabled: !!user });

  const writeScore = (score) => {
    try {
      return firebase
        .firestore()
        .collection("scores")
        .add({ userID: userID, score: score });
    } catch (error) {
      console.log(
        "An error happened while writing the score to the database",
        error
      );
    }
  };

  console.log({
    isErrorFetchigScores,
    isLoadingScores,
    fetchingError,
    scores,
    writeScore,
  });
  return {
    isErrorFetchigScores,
    isLoadingScores,
    fetchingError,
    scores,
    writeScore,
  };
}

export default useScores;
