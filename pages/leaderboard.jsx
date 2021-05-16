import LeaderboardCard from "../components/LeaderboardCard";
import { getAllCategoryNames } from "../lib/trivia";
import Link from "next/link";
import { useState } from "react";

function Leaderboard({ users }) {
  const [category, setCategory] = useState("General");

  const handleClick = (cat) => {
    setCategory(cat);
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className="lb-category">
        <select name="" id="category-selection" onChange={handleChange}>
          {getAllCategoryNames().map((cat) => (
            <option value={cat}>{cat}</option>
          ))}
          <option value="Gener">General</option>
        </select>
      </div>
      {users.map((user) => (
        <LeaderboardCard {...user} key={user.rank} />
      ))}
    </div>
  );
}

export default Leaderboard;

export async function getServerSideProps() {
  const users = [{ name: "Jhon I", rank: 1, points: 500 }];
  return { props: { users } };
}
