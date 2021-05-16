function LeaderboardCard({ name, rank, points }) {
  return (
    <div className="lb-card">
      <h1 className="rank">{rank}</h1>
      {/* <img src="//#endregion" alt="Avatar" /> */}
      <h4 className="name">{name}</h4>
      <h3 className="points">{points}</h3>
    </div>
  );
}

export default LeaderboardCard;
