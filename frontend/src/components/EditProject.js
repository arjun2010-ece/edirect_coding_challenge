import React, {useState, useEffect} from 'react'
import {editProjectData, getProjectData} from "../middlewares";
import {isAuthenticated, getAuthenticatedUser} from "../helpers";
import { withRouter, Link } from 'react-router-dom';
import Alert from "./reusable/Alert";
import FormGroup from "./reusable/FormGroup";


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
        }
    }

    const handeChange = (e) =>{
        setProjectName( e.target.value );
    }

    const showSuccess = () => {
        if(success){
          return (
            <Alert message="Project Edited Successfully" />
          )
        }
      }
    
    const goBack = () => {
        return (
            <Link to={"/projects"} className="btn">Go Back</Link>
        )
    }
    return (
        <div>
            <h4 className="text-center">Edit Project</h4>
                {showSuccess()}
            <form onSubmit={editProject} className="my-5 w-50 mx-auto border border-primary text-center">

                <FormGroup
                    type="text"
                    name="projectName"
                    value={projectName}
                    handeChange={handeChange}
                    placeholder="Enter project Name"
                    label="Project name"
                    required={true}
                    conditionalClass="w-50 mx-auto mt-4"
                />
                <button type="submit" className="btn btn-primary d-block mb-3 mx-auto">Add</button>
                {goBack()}
            </form>
            
        </div>
    )
}
export default withRouter(EditProject);