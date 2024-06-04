import { useDraggable } from "@dnd-kit/core";
import styles from "./task.module.css";
import Button from '@mui/material/Button';
import { CSS } from "@dnd-kit/utilities";


const Task= (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: props.title
    });
  return (
    <Button
    variant="contained"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition
      }}
      className={styles["list-item"]}
    >
      {props.title}
    </Button>
  );
};

export default Task;