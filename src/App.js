import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { Link, Route } from "react-router-dom";
import { auth } from "./firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

export function App(props) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: "some task", checked: true },
    { id: 2, text: "another task", checked: false }
  ]);
  useEffect(() => {
    const refresh = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });
    return refresh;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {})
      .catch(error => {
        window.alert(error.message);
      });
  };

  const handleAddTask = () => {
    console.log("add task");
  };

  const handleDeleteTask = () => {
    console.log("delete task");
  };

  const handleCheckTask = checked => {
    console.log("check task", checked);
  };

  if (!user) return <div />;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            To Do List
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Paper
          style={{
            maxWidth: "500px",
            width: "100%",
            marginTop: 30,
            padding: "40px"
          }}
        >
          <Typography variant={"h6"}> To Do List </Typography>
          <div style={{ display: "flex", marginTop: "40px" }}>
            <TextField
              fullWidth
              placeholder="Write Task Here"
              style={{ marginRight: "30px" }}
            />
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add
            </Button>
          </div>
          <List>
            {tasks.map(value => (
              <ListItem key={value.id}>
                <ListItemIcon>
                  <Checkbox
                    checked={value.checked}
                    onChange={(e, checked) => {
                      handleCheckTask(checked);
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={value.text} />
                <ListItemSecondaryAction>
                  <IconButton onClick={handleDeleteTask}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </div>
  );
}
