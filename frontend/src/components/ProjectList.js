import React, {useEffect, useState} from 'react';
import {getProjects, addProjectData, deleteProjectData} from "../middlewares";
import {isAuthenticated, getAuthenticatedUser, setProjectNameLocalstorage} from "../helpers";
import {  Redirect, withRouter } from "react-router-dom";

const ProjectList = (props) => {
    const [projects, setprojects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [open, setOpen] = useState(false);

    const jwt = isAuthenticated();
    const {userId} = getAuthenticatedUser();

    useEffect(() => {
        const loadProjects = async () => {
            const projects = await getProjects(userId, jwt);
            console.log(projects.project);
            setprojects(projects.project);
        }
        loadProjects();
    }, [userId, jwt]);

    const redirectUser = () => {
        if (!isAuthenticated()) {
            return <Redirect to="/signin" />;
        }
      };
    
    const handeChange = (e) =>{
        setProjectName( e.target.value );
    }

    const addProject = async (e) => {
        e.preventDefault();
        const data = {
            name: projectName,
            user: userId
        }
        let response = await addProjectData(data, userId, jwt);
        if(response.message){
            const projects = await getProjects(userId, jwt);
            setprojects(projects.project);
            setProjectName("");
            setOpen(false);
        }
    }

    const createProject = () => (
        open ? (
            <form onSubmit={addProject} className="my-5">
                <div className="form-group d-flex justify-content-center align-items-center">
                    <label htmlFor="projectName" className="align-self-center mr-3">Project name</label>
                    <input type="text" className="form-control w-25" value={projectName} onChange={handeChange}
                        id="projectName" name="projectName"  placeholder="Enter project Name" required />
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        ): null
    )

    const deleteProject = async (e, id) => {
        e.preventDefault();
        let response = await deleteProjectData(id, userId, jwt);
        if(response.message){
            const projects = await getProjects(userId, jwt);
            setprojects(projects.project);
        }
    }

    const redirectToEdit = (e, projectId) => {
        e.preventDefault();
        props.history.push("/edit/project/" + projectId);
    }

    const fetchTasks = (p)=> {
        setProjectNameLocalstorage(p.name);
        props.history.push(`/project/${p.id}/tasks`);
    }

    return (
        <div>
            <h4>ProjectList</h4>
            <button onClick={() => setOpen(!open)} className="btn btn-primary d-block w-25 ml-auto">Create New Project</button>
            {redirectUser()}
            {createProject()}
            {
                projects?.map((p, i) => (
                    <div className="card mx-auto mt-4" key={i} style={{width: "18rem", cursor: "pointer"}} onClick={()=> fetchTasks(p)}>
                        <div className="card-body d-flex justify-content-between">
                            <p>{p.name}</p>
                            <p>
                                <i className="fa fa-pencil mr-3" style={{cursor: "pointer"}} onClick={(e)=> redirectToEdit(e, p.id)}></i>
                                <i className="fa fa-trash" style={{cursor: "pointer"}} onClick={(e)=> deleteProject(e, p.id)}></i>
                            </p>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
export default withRouter(ProjectList);