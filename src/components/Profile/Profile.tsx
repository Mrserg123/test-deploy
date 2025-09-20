import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style/style.scss";

interface User {
  avatar_url: string;
  email: string | null;
  location: string | null;
  created_at: string;
  login: string;
  followers: number;
  following: number;
  bio: string;
}

export const Profile: React.FC = () => {
  let navigate = useNavigate();
  const { login } = useParams();
  const [searchRepo, setSearchRepo] = React.useState<string>("");
  const [allRepo, setAllRepo] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState<string>("pending");
  const [user, setUser] = React.useState<User>({
    avatar_url: "",
    email: "",
    location: "",
    created_at: "",
    login: "",
    followers: 0,
    following: 0,
    bio: "",
  });

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${login}`, {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((users) => setUser(users));
  }, [login]);

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${login}/repos?per_page=100`, {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((repos) => {
        setAllRepo(repos);
        setLoading("load");
      });
  }, [login]);

  React.useEffect(() => {
    let newAllRepo = [...allRepo];
    const results = newAllRepo.filter((repo) =>
      repo.name.toLowerCase().includes(searchRepo.toLowerCase())
    );
    if (searchRepo !== "") {
      setSearchResult(results);
    } else {
      setSearchResult(allRepo);
    }
  }, [searchRepo, allRepo]);
  return (
    <>
      <div className="header">
        <div className="header_text" onClick={() => navigate("/")}>
          GitHub Searcher
        </div>
      </div>
      <div className="body_list">
        <div className="card">
          <img
            style={{ paddingRight: "15px" }}
            width={100}
            height={100}
            src={user.avatar_url}
            alt="avatar"
          />
          <div className="inf_user">
            <div style={{ fontSize: "18px", fontWeight: "600" }}>
              {user.login}
            </div>
            <div>{user.email}</div>
            <div>{user.location}</div>
            <div>{new Date(user.created_at).toLocaleDateString()}</div>
            <div>Followers {user.followers}</div>
            <div>Following {user.following}</div>
          </div>
        </div>
      </div>
      {user.bio && (
        <div className="text_bio">
          <div style={{ textAlign: "center" }}>{user.bio}</div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          className="input_text"
          placeholder="Search repositories..."
          onChange={(e) => setSearchRepo(e.target.value)}
        />
      </div>
      {searchResult.length > 0
        ? searchResult.map((repo) => (
            <div className="list_user" key={repo.id}>
              <div className="card_user">
                <div className="card_user_inf">
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={repo.html_url}
                    target="_blank"
                  >
                    <b>{repo.name}</b>
                  </a>
                  <div className="inf_repo">
                    <div>{repo.forks} Forks</div>
                    <div>{repo.stargazers_count} Stars</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : loading === "pending" && (
            <div className="inf_err_text">Loading...</div>
          )}
      {searchResult.length === 0 && loading === "load" && (
        <div className="inf_err_text">Repositories not found :(</div>
      )}
    </>
  );
};
