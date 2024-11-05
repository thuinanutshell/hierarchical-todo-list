import React from "react";
import { Draggable } from "react-beautiful-dnd";
import AddTaskForm from "../tasks/AddTask";
import TaskAccordion from "../tasks/TaskAccordion.js";
import CompletedTasksCount from "./CompletedTasksCount";
import DeleteList from "./DeleteList";
import EditList from "./EditList";

/**
 * Renders a single list component with its tasks and associated actions.
 * @param {Object} props - The component props.
 * @param {number} props.id - The unique identifier of the list.
 * @param {string} props.name - The name of the list.
 * @param {Array} props.tasks - The array of tasks associated with the list.
 * @param {number} props.index - The index of the list in the list of draggable components.
 * @param {function} props.onUpdateLists - The function to update the list of lists.
 * @returns {JSX.Element} - The JSX element representing the list component.
 */
const List = ({ id, name, tasks, index, onUpdateLists }) => {
  const listStyles = {
    width: "25vw",
    minWidth: "250px",
    height: "80vh",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="d-flex flex-column border rounded my-4 mx-2"
          style={listStyles}
        >
          {/* List Header */}
          <div
            {...provided.dragHandleProps}
            className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-light"
          >
            <div className="d-flex align-items-center gap-2">
              <CompletedTasksCount tasks={tasks} />
              <h6 className="mb-0 fs-6">{name}</h6>
            </div>
            <div className="d-flex gap-1">
              <EditList
                columnId={id}
                initialName={name}
                onUpdateLists={onUpdateLists}
              />
              <DeleteList list_id={id} onUpdateLists={onUpdateLists} />
            </div>
          </div>

          {/* Tasks Container */}
          <div className="flex-grow-1 overflow-auto p-2">
            {tasks.map((task) => (
              <TaskAccordion
                key={task.id}
                task={task}
                onUpdateLists={onUpdateLists}
              />
            ))}
          </div>

          {/* Add Task Form */}
          <div className="border-top p-2 bg-light">
            <AddTaskForm onUpdateLists={onUpdateLists} listID={id} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;