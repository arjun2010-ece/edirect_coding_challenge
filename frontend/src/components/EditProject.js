import React, {useState, useEffect} from 'react'
import {editProjectData, getProjectData} from "../middlewares";
import {isAuthenticated, getAuthenticatedUser} from "../helpers";
import { withRouter, Link } from 'react-router-dom';

const EditProject = (props) => {
    const [projectName, setProjectName] = useState("");
    const [success, setSuccess] = useState(false);
    const projectId = props.match.params.projectId;
    const jwt = isAuthenticated();
    const {userId} = getAuthenticatedUser();

    useEffect(() => {
        const loadProjectById = async () => {
            const response = await getProjectData(projectId, jwt);
            setProjectName(response?.project?.name)
        }
        loadProjectById();
    }, [projectId, jwt]);

    const editProject = async (e) => {
        e.preventDefault();
        setSuccess(false);
        const response = await editProjectData(projectId, userId, projectName, jwt);
        if(response.message){
            setSuccess(true);
            // props.history.push("/projects");
        }
        console.log("Edited....response", response);
    }

    const handeChange = (e) =>{
        setProjectName( e.target.value );
    }

    const showSuccess = () => {
        if(success){
          return (
            <div className="alert alert-primary text-center my-3" role="alert">
                Project Edited Successfully
            </div>
          )
        }
      }
    
    const goBack = () => {
        if(success){
            return (
                <Link to={"/projects"} className="btn">Go Back</Link>
            )
        }
    }
    return (
        <div>
            <h4 className="text-center">Edit Project</h4>
                {showSuccess()}
            <form onSubmit={editProject} className="my-5 w-50 mx-auto border border-primary text-center">
                <div className="form-group">
                    <label htmlFor="projectName" className="mr-3">Project name</label>
                    <input type="text" className="form-control w-50 mx-auto my-4" value={projectName} onChange={handeChange}
                        id="projectName" name="projectName"  placeholder="Enter project Name" required />
                    <button type="submit" className="btn btn-primary d-block mb-3 mx-auto">Add</button>
                    {goBack()}
                </div>
            </form>
            
        </div>
    )
}
export default withRouter(EditProject);