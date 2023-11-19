/* eslint-disable react/prop-types */
export const TaskItem = ({ array, remove, completed }) =>
  array.map((task) => {
    return (
      <li key={task.id}>
        {task.status === "in progress" && (
          <button type="button" onClick={() => completed(task.id)}>
            Done
          </button>
        )}
        <p>{task.text}</p>
        <button type="button" onClick={() => remove(task.id)}>
          Delete
        </button>
      </li>
    );
  });
