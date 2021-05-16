import useScores from "../hooks/useScores";
import FirebaseAuth from "../components/auth/FirebaseAuth";
function Tests() {
  const { scores, status, writeScore } = useScores();
  return (
    <div>
      <FirebaseAuth></FirebaseAuth>
      {status}
      <button onClick={() => writeScore(500)}> Try Me</button>
    </div>
  );
}

export default Tests;
