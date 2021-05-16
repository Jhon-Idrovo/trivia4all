import firebase from "firebase/app";
import "firebase/firestore";
//test score
const score = 0;
function WriteToFirestore() {
  const sendData = () => {
    try {
      firebase
        .firestore()
        .collection("scores")
        .doc("scores_doc")
        .set({
          score: score,
        })
        .then(console.log("data successfully sent to Firestore"));
    } catch (error) {
      console.log("an error happened while writing to Firestore", error);
    }
  };

  return <div></div>;
}

export default WriteToFirestore;
