import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import styles from "./App.module.css";
import TaskList from "./components/List/List";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const App = () => {
  const [taskList, setTaskList] = useState({
    Planned: [
      { title: "task 1", realized: false },
      { title: "Task 2", realized: false },
      { title: "Task 3", realized: false }
    ],
    Processed: [{ title: "task 4", realized: false }],
    Done: [{ title: "task 5", realized: true }]
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const dragEndHandler = (e) => {
    if (!e.over || !e.active.data.current || !e.over.data.current) return;
    if (e.active.id === e.over.id) return;
    if (
      e.active.data.current.sortable.containerId !==
      e.over.data.current.sortable.containerId
    )
      return;

    const containerName = e.active.data.current.sortable.containerId;
    setTaskList((taskList) => {
      const temp = { ...taskList };
      if (!e.over) return temp;
      const oldIdx = temp[containerName].findIndex(
        (task) => task.title === e.active.id
      );
      const newIdx = temp[containerName].findIndex(
        (task) => task.title === e.over.id
      );
      temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx);
      return temp;
    });
  };

  const dragOverHandler = (e) => {
    if (!e.over) return;
    const initialContainer = e.active.data.current?.sortable?.containerId;
    const targetContainer = e.over.data.current?.sortable?.containerId;
    if (!initialContainer) return;

    setTaskList((taskList) => {
      const temp = { ...taskList };
      if (!targetContainer) {
        if (taskList[e.over.id].some((task) => task.title === e.active.id))
          return temp;
        temp[initialContainer] = temp[initialContainer].filter(
          (task) => task.title !== e.active.id
        );
        temp[e.over.id].push({
          title: e.active.id,
          realized: false
        });
        return temp;
      }
      if (initialContainer === targetContainer) {
        const oldIdx = temp[initialContainer].findIndex(
          (task) => task.title === e.active.id
        );
        const newIdx = temp[initialContainer].findIndex(
          (task) => task.title === e.over.id
        );
        temp[initialContainer] = arrayMove(
          temp[initialContainer],
          oldIdx,
          newIdx
        );
      } else {
        temp[initialContainer] = temp[initialContainer].filter(
          (task) => task.title !== e.active.id
        );
        const newIdx = temp[targetContainer].findIndex(
          (task) => task.title === e.over.id
        );
        temp[targetContainer].splice(newIdx, 0, {
          title: e.active.id,
          realized: false
        });
      }
      return temp;
    });
  };

  const handleTaskRealized = (taskTitle) => {
    setTaskList((taskList) => {
      const temp = { ...taskList };
      for (const key in temp) {
        const task = temp[key].find((task) => task.title === taskTitle);
        if (task) {
          task.realized = true;
        }
      }
      return temp;
    });
  };

  const handleNewTask = () => {
    if (newTaskTitle.trim() === "") return;
    setTaskList((taskList) => {
      const temp = { ...taskList };
      temp.Planned.push({ title: newTaskTitle, realized: false });
      return temp;
    });
    setNewTaskTitle("");
  };

  const pendingTasksCount = Object.values(taskList)
    .flat()
    .filter((task) => !task.realized).length;

  return (
    <DndContext
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      collisionDetection={closestCenter}
    >
      <div className={styles.container}>
        <div className={styles.addTaskContainer}>
          <TextField 
            type="text"
            value={newTaskTitle}
            variant="outlined"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            label="Nueva tarea"
          />
          <Button variant="outlined" onClick={handleNewTask}>Agregar</Button >
          <div className={styles.pendingTasksCount}>
          Tareas pendientes: {pendingTasksCount}
        </div>
        </div>
        <ul className={styles.tablesContainer} >
        {Object.keys(taskList).map((key) => (
          <TaskList
            key={key}
            title={key}
            tasks={taskList[key]}
            handleTaskRealized={handleTaskRealized}
          />
        ))}
        </ul>
      </div>
    </DndContext>
  );
};

export default App;
