import React, { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiProvider";
import TaskActions from "./TaskActions";


const TaskAccordion = ({ task, onUpdateLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [newSubtaskAdded, setNewSubtaskAdded] = useState(false);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const api = useApi();

  const handleCheckboxChange = async (taskId, newStatus) => {
    try {
      await api.patch("/tasks/" + taskId + "/update", {
        name: task.name,
        is_completed: newStatus,
        list_id: task.list_id,
        parent_id: task.parent_id,
      });
      onUpdateLists();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  /**
   * Handles the edit task event.
   * @returns {Promise<void>} - A promise that resolves when the task is updated.
   */
  const handleEditTask = async () => {
    if (newTaskName.trim().length === 0) {
      console.warn("Task name cannot be empty.");
      setNewTaskName(task.name);
      return;
    }

    try {
      await api.patch("/tasks/" + task.id + "/update", {
        ...task,
        name: newTaskName,
      });
      onUpdateLists();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task name:", error);
      setNewTaskName(task.name);
    }
  };

  useEffect(() => {
    if (newSubtaskAdded) {
      setExpanded(true);
      setIsVisible(true);
      setNewSubtaskAdded(false);
    }
  }, [newSubtaskAdded]);

  const onSubtaskAdded = () => {
    setNewSubtaskAdded(true);
  };

  const toggleAccordion = (e) => {
    e.stopPropagation();
    if (hasSubtasks) {
      setExpanded(!expanded);
    }
  };

  const toggleVisibility = (e) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
    if (!isVisible) {
      setExpanded(true);
    }
  };

  // Custom styles
  const cardStyle = {
    marginBottom: "5px",
    backgroundColor: "white",
    border: "1px solid #dee2e6",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)"
  };

  const taskNameStyle = {
    cursor: "pointer",
    textDecoration: task.is_completed ? "line-through" : "none",
    color: task.is_completed ? "#6c757d" : "inherit"
  };

  const iconButtonStyle = {
    cursor: "pointer",
    padding: "0.25rem",
    border: "none",
    background: "none",
    color: "grey",
    fontSize: "16px"
  };

  return (
    <div className="accordion-item" style={cardStyle}>
      <div className="d-flex align-items-center p-2 bg-white">
        <div className="form-check me-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.is_completed}
            onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
          />
        </div>

        <div 
          className="flex-grow-1 me-2" 
          onClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <input
              type="text"
              className="form-control form-control-sm"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onBlur={handleEditTask}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleEditTask();
                }
              }}
              autoFocus
            />
          ) : (
            <span className="fs-6" style={taskNameStyle}>
              {task.name}
              {hasSubtasks && (
                <small className="ms-2 text-muted">
                  ({task.subtasks.length})
                </small>
              )}
            </span>
          )}
        </div>

        <div className="d-flex align-items-center">
          <TaskActions
            task={task}
            onUpdateLists={onUpdateLists}
            onSubtaskAdded={onSubtaskAdded}
          />
          {hasSubtasks && (
            <div className="d-flex align-items-center ms-2">
              <button
                style={iconButtonStyle}
                onClick={toggleVisibility}
                className="d-flex align-items-center"
                title={isVisible ? "Hide subtasks" : "Show subtasks"}
              >
                <text className={isVisible ? "bi bi-dash" : "bi bi-plus"}>↓</text>
              </button>
              <button
                style={{...iconButtonStyle, marginLeft: "2px"}}
                onClick={toggleAccordion}
                className="d-flex align-items-center"
                title={expanded ? "Collapse" : "Expand"}
              >
                <text className={`bi bi-chevron-${expanded ? 'up' : 'down'}`}>↑</text>
              </button>
            </div>
          )}
        </div>
      </div>

      {hasSubtasks && expanded && isVisible && (
        <div className="ps-4 pb-2 pt-1 border-top">
          {task.subtasks.map((subtask) => (
            <TaskAccordion
              key={subtask.id}
              task={subtask}
              onUpdateLists={onUpdateLists}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskAccordion;