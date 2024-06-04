import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import styles from "./task.module.css";
import Button from "@mui/material/Button";
import { CSS } from "@dnd-kit/utilities";
import { ListItemText } from "@mui/material";
import ListItem from '@mui/material/ListItem';

const Task = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.title,
    });
   
  const handleClick = () => {
    props.handleTaskRealized(props.title);
  };

  return (
      <div>
        <Button
          disabled={props.realized}
          onClick={handleClick}
          variant="contained"
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={{
            transform: CSS.Transform.toString(transform),
            transition: transition,
          }}
          
        >
          <p className={props.realized? styles.listItemDisabled: styles.listItem} >{props.title}</p>
        </Button>
        <p></p>
        </div>
        
  );
};

export default Task;
