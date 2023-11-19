/* eslint-disable react/prop-types */
export const TaskItem = ({ array, remove, completed }) =>
  array.map((task) => {
    return (
      <li key={task.id}>
        <button type="button" onClick={() => completed(task.id)}>
          {task.completed ? "Undone" : "Done"}
        </button>
        <p>{task.text}</p>
        <button type="button" onClick={() => remove(task.id)}>
          Delete
        </button>
      </li>
    );
  });
