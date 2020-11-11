import React from 'react';


const FormGroup = ({type, name, value, handeChange, placeholder, label, required, conditionalClass}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type} className={"form-control" + (conditionalClass ? ` ${conditionalClass}`: "")} value={value} onChange={handeChange}
                id={name} name={name}  placeholder={placeholder} required={required}
            />
        </div>
    )
}

export default FormGroup;