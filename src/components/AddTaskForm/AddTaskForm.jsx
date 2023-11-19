/* eslint-disable react/prop-types */
export const AddTaskForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Add thing to do</label>
      <input type="text" name="text"></input>
      <button type="submit">Add</button>
    </form>
  );
};
