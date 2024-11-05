import React, { useCallback, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { useApi } from "../contexts/ApiProvider";
import { AuthContext } from "../contexts/AuthContext";
import AddList from "./lists/AddList";
import List from "./lists/List";

const DraggableBoard = () => {
  const api_provider = useApi();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    columns: {},
    columnOrder: [],
  });

  const fetchLists = useCallback(async () => {
    if (!isLoggedIn) {
      console.log("User not logged in, skipping fetchLists.");
      return;
    }
    try {
      const response = await api_provider.get("/lists");

      let columns = {};
      let columnOrder = [];
      let columnOrderDict = {};

      if (response.ok) {
        for (const list of response.body.lists) {
          columns[list.id] = {
            id: list.id,
            name: list.name,
            tasks: list.tasks,
          };
          columnOrderDict[list.order_index] = list.id;
        }
        for (const order_index of Object.keys(columnOrderDict)) {
          columnOrder.push(columnOrderDict[order_index]);
        }

        // add columns to local state
        localStorage.setItem("columns", JSON.stringify(columns));

        setData({
          columns: columns,
          columnOrder: columnOrder,
        });
      }
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    } finally {
      setLoading(false);
    }
  }, [api_provider, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchLists();
    } else {
      console.log("User not logged in, skipping fetchLists.");
    }
  }, [fetchLists, isLoggedIn]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      // Handle reordering within the same list
    } else {
      // Handle moving task between lists
      try {
        // Backend update logic here
        throw new Error("Backend update failed");
      } catch (error) {
        console.error("Error moving task between lists:", error);
      }
    }
  };

  return (
    <div className="container-fluid p-3">
      <AddList onUpdateLists={fetchLists} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="d-flex flex-wrap overflow-auto align-items-start w-100"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((id, index) => {
                const column = data.columns[id];
                return (
                  <div key={column.id} style={{ flex: "0 0 0 25%"}}>
                    <List
                      id={column.id}
                      name={column.name}
                      tasks={column.tasks}
                      index={index}
                      onUpdateLists={fetchLists}
                    />
                  </div>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableBoard;