/* eslint-disable react/prop-types */
export const TaskList = ({ title, children }) => (
  <>
    <h2>{title}</h2>
    <ul>{children}</ul>
  </>
);
