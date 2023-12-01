import { PlusCircle, Rocket } from 'phosphor-react';
import './index.module.css'
import style from './Welcome.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { TaskList } from './components/TaskList';

interface TaskEntityInteface {
  id?: number,
  content?: string,
  checked?: boolean,
}
const taskEntity: TaskEntityInteface = {}

function App() {

  const [dataTodoList, setDataTodoList] = useState(Array<TaskEntityInteface>);

  const [idGenerator,setIdGenerator] = useState(1);

  const [data,setData] = useState('');

  const [totalTaskTodo,setTotalTaskTodo] = useState(0);

  const [taskCompleted,setTaskCompleted] = useState(0);

  function handleNewTodo(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();

    setData(event.target.value);
  }

  function handleInvalidNewTodo(event: InvalidEvent<HTMLInputElement>): void {
    event.target.setCustomValidity('Este campo não pode vazio')
  }

  function handleAddTodoList(event: FormEvent): void {
    event.preventDefault();

    setIdGenerator((state) => {
      return state + 1;
    })

    setDataTodoList([...dataTodoList,{
      id: idGenerator,
      content: data,
      checked: false,
    }]);

    setTotalTaskTodo((state) => {
      return state + 1;
    });

    setData('');
  }

  function handleCompletedTask(taskEntity: TaskEntityInteface){

      const newTaskList = dataTodoList.map((element) => {
          if(element.id == taskEntity.id){
              element.checked = taskEntity.checked;
          }
          return element;
      });

      setDataTodoList(newTaskList);

      const totalChecked = dataTodoList.filter((element) => element.checked == true);

      setTaskCompleted(totalChecked.length)

  }

  function handleDeleteTask(id: number) {

    let newTaskList = dataTodoList.filter((element) => element.id !== id);

    setDataTodoList(newTaskList);

    setTotalTaskTodo(newTaskList.length);

    const totalChecked = newTaskList.filter((element) => element.checked == true);

    
    setTaskCompleted(totalChecked.length)  

  }

  return (
    <>
      <header className={style.head}>
        <span className={style.rocket}>
          <Rocket size={28} />
        </span>
        <p className={style.title}><span className={style.toColor}>to</span><span className={style.doColor}>do</span></p>
      </header>

      <section className={style.content}>
         <form onSubmit={handleAddTodoList}>
         <div className={style.inputData}>
            <input
              placeholder='Adicione uma nova tarefa'
              onChange={handleNewTodo}
              onInvalid={handleInvalidNewTodo}
              value={data}
              required
            />
            <button 
              type="submit"
            >
            <span className={style.iconContent}>Criar</span> <PlusCircle size={15} weight='bold'/>
            </button>
         </div>
         </form>
      </section>
      <section className={style.listData}>
         <div className={style.todoInfo}>
            <p>Tarefas Criadas <span className={style.todInfoSpan}>{totalTaskTodo}</span></p>
            <p>Concluidas <span className={style.todInfoSpan}>{taskCompleted} de {totalTaskTodo}</span></p>
         </div>
         <div className={style.taskList}>
          {dataTodoList.map(taskEntityData => {
              return <TaskList
                       taskEntityData={taskEntityData}
                       key={taskEntity.id}
                       onCheckTask={handleCompletedTask}
                       onDeleteTask={handleDeleteTask}  
                     />
          })}

         </div>
        
      </section>
    </>
  )
}

export default App
