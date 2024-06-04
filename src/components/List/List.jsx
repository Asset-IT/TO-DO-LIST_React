import { useDroppable } from "@dnd-kit/core";
import styles from "./List.module.css";
import TaskItem from "../Task/Task";


const List = (props) => {
  const {isOver, setNodeRef } = useDroppable({ id: props.title });

  return (
    <article ref={setNodeRef} className={styles.column}>
      <h1>{props.title}</h1>
      <div className={styles.divider} />
      {props.children}
      </article>
  );
};

export default List;