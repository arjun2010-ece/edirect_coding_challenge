import React, {useState, useEffect} from 'react';
import { fetchAllTasksProject, deleteTasksProject, addTaskData, updateTaskStatusData} from "../middlewares";
import {isAuthenticated, getProjectNameLocalStorage} from "../helpers";
import {  Link } from 'react-router-dom';

const Tasks = (props) => {
    const [tasks, setTasks] = useState({
        completedTasks: [], 
        incompleteTasks: []
    });

    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        taskName: "",
        description: ""
    });
    const {taskName, description} = task;
    const {completedTasks, incompleteTasks} = tasks

    const jwt = isAuthenticated();
    const projectId = props.match.params.projectId;
    const projectName = getProjectNameLocalStorage();

    useEffect(() => {
        const loadTasks = async () => {
            const response = await fetchAllTasksProject(projectId, jwt);
            const totalTasks = response?.tasks;
            const completed_task = totalTasks.filter(t => t.status === true);
            const incomplete_task = totalTasks.filter(t => t.status === false);
            setTasks({...tasks,
                completedTasks: completed_task,
                incompleteTasks: incomplete_task
            });
        }
        
        loadTasks();
    }, [projectId]);

    const deleteTask = async (e, taskId) => {
        console.log("delete tasks");
        e.preventDefault();
        const res = await deleteTasksProject(taskId, jwt);
        if(res){
            const response = await fetchAllTasksProject(projectId, jwt);
            const totalTasks = response?.tasks;
            const completed_task = totalTasks.filter(t => t.status === true);
            const incomplete_task = totalTasks.filter(t => t.status === false);
            setTasks({...tasks,
                completedTasks: completed_task,
                incompleteTasks: incomplete_task
            });
        }
    }

    const redirectToEdit = (e, taskId) => {
        props.history.push(`/project/${projectId}/update/task/${taskId}`)
    }

    const addTask = async (e) => {
        e.preventDefault();
        const taskObject = {
            name: taskName,
            description,
            project: projectId
        }
        const res = await addTaskData(taskObject, jwt);
        if(res.message){
            const response = await fetchAllTasksProject(projectId, jwt);
            setOpen(false);
            const totalTasks = response?.tasks;
            const completed_task = totalTasks.filter(t => t.status === true);
            const incomplete_task = totalTasks.filter(t => t.status === false);
            setTasks({...tasks,
                completedTasks: completed_task,
                incompleteTasks: incomplete_task
            });
            setTask({
                taskName: "",
                description: ""
            });
        }
    }

    const goBack = () => {
        return (
            <Link to={"/projects"} className="btn w-25 d-block" style={{textDecoration: "underline"}}>Go Back</Link>
        )
    }

    const handeChange = (e) =>{
        setTask( { ...task, [e.target.name]: e.target.value} );
    }

    const createTask = () => (
        open ? (
            <form onSubmit={addTask} className="my-5 w-75 mx-auto border border-primary text-center">
                <div className="form-group">
                    <label htmlFor="taskName" className="mr-3">Task name</label>
                    <input type="text" className="form-control w-50 mx-auto" value={taskName} onChange={handeChange}
                        id="taskName" name="taskName"  placeholder="Enter task Name" required />
                </div>
                <div className="form-group my-5">
                    <label htmlFor="description" className="mr-3">Task Description</label>
                    <textarea type="text" className="form-control w-50 mx-auto" value={description} onChange={handeChange}
                        id="description" name="description"  placeholder="Enter description" required />
                        
                    <button type="submit" className="btn btn-primary d-block my-3 mx-auto">Create</button>
                </div>
            </form>
        ): null
    )

    const handleCheck = async (taskid) => {
        const response = await updateTaskStatusData(taskid,{status: true}, jwt );
        if(response.message){
            const response = await fetchAllTasksProject(projectId, jwt);
            const totalTasks = response?.tasks;
            const completed_task = totalTasks.filter(t => t.status === true);
            const incomplete_task = totalTasks.filter(t => t.status === false);
            setTasks( {...tasks,
                completedTasks: completed_task,
                incompleteTasks: incomplete_task
            });
        }
    }

    
    const completeTask = () => {
        return completedTasks.length > 0 ? completedTasks?.map((t, i) => (
            <div className="card mx-auto mt-4" key={i} style={{width: "18rem", cursor: "pointer"}}>
                <div className="card-body d-flex justify-content-between">
                    <input type="checkbox" className="form-check-input ml-2" onChange={()=>handleCheck(t.id)} checked={t.status} />
                    <div className="ml-2">
                        <p>{t.name}</p>
                        <p>{t.description}</p>
                    </div>
                    {
                        !t.status ? (
                        <p>
                            <i className="fa fa-pencil mr-3" style={{cursor: "pointer"}} onClick={(e)=> redirectToEdit(e, t.id)}></i>
                            <i className="fa fa-trash" style={{cursor: "pointer"}} onClick={(e)=> deleteTask(e, t.id)}></i>
                        </p>
                        ): ""
                    }
                </div>
            </div>
        )) : <small>Currently Empty..</small>
    }

    const incompleteTaskList = () => {
        return incompleteTasks.length > 0 ? incompleteTasks?.map((t, i) => (
            <div className="card mx-auto mt-4" key={i} style={{width: "18rem", cursor: "pointer"}}>
                <div className="card-body d-flex justify-content-between">
                    <input type="checkbox" className="form-check-input ml-2" onChange={()=>handleCheck(t.id)}/>
                    <div className="ml-3">
                        <p>{t.name}</p>
                        <p>{t.description}</p>
                    </div>
                    <p>
                        <i className="fa fa-pencil mr-3" style={{cursor: "pointer"}} onClick={(e)=> redirectToEdit(e, t.id)}></i>
                        <i className="fa fa-trash" style={{cursor: "pointer"}} onClick={(e)=> deleteTask(e, t.id)}></i>
                    </p>
                </div>
            </div>
        )) : <small>Currently empty</small>
    }

    
    return (
        <div className="container my-5 text-center">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>{projectName} </h4>
                    
                    <button onClick={() => setOpen(!open)} className="btn btn-primary d-block w-25 ml-auto">New Tasks</button>
                        {goBack()}
                        {createTask()}
                    <h5>List of Todos</h5>
                        {incompleteTaskList()}

                    <h5 className="mt-5">Done</h5>
                        {completeTask()}
                </div>
            </div>
            
        </div>
    )
}
export default Tasks;