import React from 'react';
import ProjectList from "./ProjectList";

const Projects = () => {
    return (
        <div className="container border border-primary">
            <div className="row my-5">
                <div className="col-md-8 offset-md-2 text-center">
                    <ProjectList />
                </div>
            </div>
        </div>
    )
}
export default Projects;