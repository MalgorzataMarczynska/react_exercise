import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { TaskList } from "./components/TaskList/TaskList";
import { TaskItem } from "./components/TaskItem/TaskItem";
import { AddTaskForm } from "./components/addTaskForm/addTaskForm";

const initialState = [
  { id: "task-1", text: "Learn HTML/CSS", status: "completed" },
  { id: "task-2", text: "Learn JavaScript", status: "in progress" },
  { id: "task-3", text: "Learn React", status: "in progress" },
];
function App() {
  const [tasks, setTasks] = useState(initialState);

  const removeItem = (id) => {
    const actualTasks = tasks.filter((task) => task.id !== id);
    setTasks(actualTasks);
  };
  const setCompleted = (id) => {
    const checkedTask = tasks.find((task) => task.id === id);
    const updatedTask = { ...checkedTask, status: "completed" };
    const tasksWIthoutId = tasks.filter((task) => task.id !== id);
    // const newTasks = [...tasksWIthoutId, updatedTask];
    setTasks([...tasksWIthoutId, updatedTask]);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const inputValue = form.elements.text.value;
    console.log("inputValue", inputValue);
    const newTask = { id: nanoid(7), text: inputValue, status: "in progress" };
    setTasks([...tasks, newTask]);
    form.reset();
  };

  const undoneTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

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
      {completedTasks?.length > 0 && (
        <TaskList title="Completed tasks">
          <TaskItem
            array={completedTasks}
            remove={removeItem}
            completed={setCompleted}
          ></TaskItem>
        </TaskList>
      )}
      <AddTaskForm handleSubmit={handleSubmit}></AddTaskForm>
    </section>
  );
}

export default App;
