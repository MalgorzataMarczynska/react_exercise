import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskItem } from "./components/TaskItem/TaskItem";
import { AddTaskForm } from "./components/addTaskForm/addTaskForm";

const initialState = [
  { id: "task-1", text: "Learn HTML/CSS", completed: true },
  { id: "task-2", text: "Learn JavaScript", completed: false },
  { id: "task-3", text: "Learn React", completed: false },
];
function App() {
  const [tasks, setTasks] = useState(() => {
    const taskList = window.localStorage.getItem("tasks-list");
    const parsedTaskList = JSON.parse(taskList);
    return parsedTaskList?.length > 0 ? parsedTaskList : initialState;
  });

  const removeItem = (id) => {
    const actualTasks = tasks.filter((task) => task.id !== id);
    setTasks(actualTasks);
  };
  const setCompleted = (id) => {
    const checkedTask = tasks.find((task) => task.id === id);
    if (!checkedTask.completed) {
      const updatedTask = { ...checkedTask, completed: true };
      const tasksWIthoutId = tasks.filter((task) => task.id !== id);
      setTasks([...tasksWIthoutId, updatedTask]);
    } else {
      const updatedTask = { ...checkedTask, completed: false };
      const tasksWIthoutId = tasks.filter((task) => task.id !== id);
      setTasks([...tasksWIthoutId, updatedTask]);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const inputValue = form.elements.text.value;
    const newTask = { id: nanoid(7), text: inputValue, completed: false };
    setTasks([...tasks, newTask]);
    form.reset();
  };
  useEffect(() => {
    const taskList = window.localStorage.getItem("tasks-list");
    if (!taskList) return;
    try {
      setTasks(JSON.parse(taskList));
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    const stringifyTaskList = JSON.stringify(tasks);
    window.localStorage.setItem("tasks-list", stringifyTaskList);
  }, [tasks]);
  const undoneTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <section>
      <h1>Task List</h1>
      <TaskList title="Things to do">
        <TaskItem
          array={undoneTasks}
          remove={removeItem}
          completed={setCompleted}
        ></TaskItem>
      </TaskList>
      <AddTaskForm handleSubmit={handleSubmit}></AddTaskForm>
      {completedTasks?.length > 0 && (
        <TaskList title="Completed tasks">
          <TaskItem
            array={completedTasks}
            remove={removeItem}
            completed={setCompleted}
          ></TaskItem>
        </TaskList>
      )}
    </section>
  );
}

export default App;
