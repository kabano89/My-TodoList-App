import React,{useState, useEffect} from "react";

const TodoForm = (props) => {
    const initialFieldValues = {
        activity: '',
        completed: false
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if (props.currentId == '')
            setValues({
                ...initialFieldValues
            })
        else
           setValues({
               ...props.todoObjects[props.currentId]
           })
    }, [props.currentId, props.todoObjects])

    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        if(values.activity === '') return
        //console.log(values.activity)
        props.addOrEdit(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-tasks"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Activity" name="activity" 
                      value={values.activity}
                      onChange={handleInputChange}
                />
            </div>
            
            <div className="form-group">
                <input type="submit" value={props.currentId==''?"Save":"Update"} className="btn btn-primary btn-block" />
            </div>

        </form>
        
    );
}            
export default TodoForm;