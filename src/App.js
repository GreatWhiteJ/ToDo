import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { auth, db } from "./firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

export function App(props) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [new_task, setNewTask] = useState();

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

  useEffect(() => {
    let refresh;

    if (user) {
      refresh = db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .onSnapshot(snapshot => {
          const updated_tasks = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            updated_tasks.push({
              text: data.text,
              checked: data.checked,
              id: doc.id
            });
          });
          setTasks(updated_tasks);
        });
    }

    return refresh;
  }, [user]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {})
      .catch(error => {
        window.alert(error.message);
      });
  };

  const handleAddTask = () => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .add({ text: new_task, checked: false })
      .then(() => {
        setNewTask("");
      });
  };

  const handleDeleteTask = task_id => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(task_id)
      .delete();
  };

  const handleCheckTask = (checked, task_id) => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(task_id)
      .update({ checked: checked });
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
              value={new_task}
              onChange={e => {
                setNewTask(e.target.value);
              }}
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
                      handleCheckTask(checked, value.id);
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={value.text} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      handleDeleteTask(value.id);
                    }}
                  >
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
