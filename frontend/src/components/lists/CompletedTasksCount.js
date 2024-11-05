import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Container } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";

/**
 * Renders the count of completed tasks and a check circle icon.
 * 
 * @param {Object[]} tasks - An array of task objects.
 * @param {string} tasks[].name - The name of the task.
 * @param {boolean} tasks[].is_completed - Whether the task is completed or not.
 * @returns {JSX.Element} - The completed tasks count component.
 */
const CompletedTasksCount = ({ tasks }) => {
  // Initialize the count of completed tasks
  let completedCount = 0;

  // Iterate through the tasks array to count completed tasks
  for (const task of tasks) {
    if (task.is_completed) {
      completedCount++;
    }
  }

  // Determine if all tasks are completed
  const allCompleted = completedCount === tasks.length && tasks.length > 0;

  return (
    <Container className="d-flex align-items-center justify-content-center gap-1">
      {/* Display the count of completed tasks */}
      <span style={{ color: allCompleted ? "#4caf50" : "#000000" }}>
        {`${completedCount}/${tasks.length}`}
      </span>
      {/* Display the check circle icon */}
      <CheckCircle
        style={{ color: allCompleted ? "#4caf50" : "#000000" }}
      />
    </Container>
  );
};

export default CompletedTasksCount;
