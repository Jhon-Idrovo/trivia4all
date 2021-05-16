import Link from "next/link";
import { getAllCategoryNames } from "../lib/trivia";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();

  return (
    <nav className="nav-bar">
      <Link href="https://home.com">
        <a>Trivia 4All</a>
      </Link>
      <div className="hamburger">
        <input type="checkbox" id="hamburger-check" />
        <div></div>
        <ul className="nav-options">
          <li id="nav-item-leaderboard">
            <Link href="/leaderboard">
              <a
                className={`primary-nav-item ${
                  router.pathname == "/leaderboard" ? "active" : ""
                }`}
              >
                Leaderboard
              </a>
            </Link>
          </li>
          <li id="nav-item-categories">
            <input type="checkbox" id="categories-check" />
            <label htmlFor="categories-check" className="primary-nav-item">
              Categories
            </label>

            <ul className="sub-nav">
              {getAllCategoryNames().map((cat) => (
                <li className="sub-nav-category-item">
                  <a href={`/${cat}`}> {cat}</a>
                </li>
              ))}
            </ul>
          </li>
          <li id="nav-item-comments">
            <input type="checkbox" id="send-comments" />
            <label htmlFor="send-comments" className="primary-nav-item">
              Send Comments
            </label>
            <div className="comments-container">
              <textarea name="comments" id="comments" rows="10"></textarea>

              <button className="form-btn">Submit</button>
            </div>
          </li>
          <li>
            <Link href="/creators">
              <a
                className={`primary-nav-item ${
                  router.pathname === "/creators" ? "active" : ""
                }`}
              >
                Creators
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
