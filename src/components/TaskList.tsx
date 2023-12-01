import { Trash } from "phosphor-react";
import style from "./TaskList.module.css";
import {ChangeEvent} from "react";


interface TaskEntityInteface {
    id: number,
    content?: string,
    checked?: boolean,
  }

interface TaskListInterface {
    taskEntityData: TaskEntityInteface,
    id: number,
    onCheckTask: (taskEntity: TaskEntityInteface) => void,
    onDeleteTask: (id: number) => void,
}

export function TaskList({taskEntityData,onCheckTask,onDeleteTask}: TaskListInterface) {

    function handleCheckText(event: ChangeEvent<HTMLInputElement>): void{
        
        if(taskEntityData.checked){
            taskEntityData.checked = false;
        } else {
            taskEntityData.checked = true;
        }
        onCheckTask(taskEntityData);
    }

    function handleDelete() {    
        onDeleteTask(taskEntityData.id);
    }
    
    return (
        <>

          <div className={style.content}>                 
             <input 
                className={style.check}
                type="checkbox"
                title="Finalizar Tarefa"
                checked={taskEntityData.checked}
                onChange={handleCheckText}
                />
                
             <div className={style.paragraph}>
             <p 
                className={taskEntityData.checked ? style.textDecoration  : style.text}
             >
                {taskEntityData.content}
              </p>
             </div>
             <Trash 
                size={18} 
                onClick={handleDelete}
                className={style.icon}/>   
          </div>  
        </>
    )
}