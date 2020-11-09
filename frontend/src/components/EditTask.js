import React, {useState, useEffect} from 'react'
import { editTaskData, fetchTasksByIdProject} from "../middlewares";
import {isAuthenticated} from "../helpers";
import { withRouter, Link } from 'react-router-dom';

const EditTask = (props) => {
    const [task, setTask] = useState({
        taskName: "",
        description: ""
    });
    const {taskName, description} = task;
    const [success, setSuccess] = useState(false);
    const taskId = props.match.params.taskId;
    const projectId = props.match.params.projectId;
    const jwt = isAuthenticated();
    // const {userId} = getAuthenticatedUser();

    useEffect(() => {
        const loadTaskById = async () => {
            const response = await fetchTasksByIdProject(taskId, jwt);
            if(response.message){
                setTask({taskName: response?.task?.name, description: response?.task?.description})
            }
        }
        loadTaskById();
    }, [taskId, jwt]);

    const editTask = async (e) => {
        e.preventDefault();
        setSuccess(false);

        const taskObject = {
            name: taskName,
            description,
            project: projectId
        }
        const response = await editTaskData(taskId, taskObject, jwt);
        if(response.message){
            console.log("aga");
            setSuccess(true);
        }
    }

    const handeChange = (e) =>{
        setTask( { ...task, [e.target.name]: e.target.value} );
    }

    const showSuccess = () => {
        if(success){
          return (
            <div className="alert alert-primary text-center my-3" role="alert">
                Task Edited Successfully
            </div>
          )
        }
      }
    
    const goBack = () => {
            return (
                <Link to={`/project/${projectId}/tasks`} className="btn w-25 d-block" style={{textDecoration: "underline"}} >Go Back</Link>
            )
    }
    return (
        <div>
            <h4 className="text-center">Edit Project</h4>
                {showSuccess()}
            <form onSubmit={editTask} className="my-5 w-50 mx-auto border border-primary text-center">
                <div className="form-group">
                    <label htmlFor="taskName" className="mr-3">Task name</label>
                    <input type="text" className="form-control w-50 mx-auto" value={taskName} onChange={handeChange}
                        id="taskName" name="taskName"  placeholder="Enter task Name" required />
                </div>
                <div className="form-group my-5">
                    <label htmlFor="description" className="mr-3">Task Description</label>
                    <textarea type="text" className="form-control w-50 mx-auto" value={description} onChange={handeChange}
                        id="description" name="description"  placeholder="Enter description" required />
                    <button type="submit" className="btn btn-primary d-block my-3 mx-auto">Edit</button>
                    {goBack()}
                </div>
            </form>
            
        </div>
    )
}
export default withRouter(EditTask);