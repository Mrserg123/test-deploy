import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

interface Users {
  id: string;
  avatar_url: string;
  public_repos: string;
  login: string;
}
interface Props {
  users: Array<{ avatar_url: string; login: string; id: number }>;
}

export const ListUsers: React.FC<Props> = (props) => {
  const [users, setUsers] = React.useState([]);
  let navigate = useNavigate();
  React.useEffect(() => {
    if (sessionStorage.users === undefined || props.users.length !== 0) {
      sessionStorage.users = JSON.stringify([]);
      setUsers([]);
      Promise.all(
        props.users.map((user) =>
          fetch(`https://api.github.com/users/${user.login}`, {
            method: "GET",
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
          })
        )
      )
        .then((response) => Promise.all(response.map((v) => v.json())))
        .then((result) => {
          sessionStorage.setItem("users", JSON.stringify(result));
          setUsers(result);
        })
        .catch((err) => console.log(err));
    } else {
      let arr = JSON.parse(sessionStorage.getItem("users")) || [];
      setUsers(arr);
    }
  }, [props.users]);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "auto",
        bgcolor: "background.paper",
      }}
    >
      {users.map((user: Users) => (
        <div key={user.id}>
          <ListItem alignItems="center" sx={{ marginLeft: "15px" }}>
            <ListItemAvatar>
              <Avatar alt={user.login} src={user.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              sx={{ cursor: "pointer", maxWidth: "120px" }}
              onClick={() => navigate(`profile/${user.login}`)}
              primary={user.login}
            />

            <ListItemText
              style={{ textAlign: "right" }}
              primary={`Repo: ${user.public_repos}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
};
