import { useSortable } from "@dnd-kit/sortable";
import styles from "./task.module.css";
import Button from "@mui/material/Button";
import { CSS } from "@dnd-kit/utilities";

const Task = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.title,
    });

  const handleClick = () => {
    props.handleTaskRealized(props.title);
  };

  return (
      <div className={styles.taskContainer}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      >

          <p 
            
            {...listeners}
            {...attributes}
            className={props.realized? styles.listItemDisabled: styles.listItem}>{props.title}
            </p>

        <Button
          disabled={props.realized}
          onClick={handleClick}
          variant="contained"
        >
          <p>Done</p>
        </Button>
        </div>
        
  );
};

export default Task;
