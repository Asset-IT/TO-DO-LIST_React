import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import styles from "./List.module.css";
import TaskItem from "../Task/Task";

const TaskList = (props) => {
  const { setNodeRef } = useDroppable({ id: props.title });

  return (
    <article className={styles.column}>
      <h1>{props.title}</h1>
      <SortableContext id={props.title} items={props.tasks.map(task => task.title)} strategy={verticalListSortingStrategy}>
        <ul ref={setNodeRef}>
          {props.tasks.map((task) => (
            <TaskItem
              key={task.title}
              title={task.title}
              realized={task.realized}
              handleTaskRealized={props.handleTaskRealized}
            />
          ))}
        </ul>
      </SortableContext>
    </article>
  );
};

export default TaskList;
