import React, {useState, useEffect} from "react";
import TodoForm from "./TodoForm"
import firebaseDb from "../firebase";

const Todos = () => {

    var [todoObjects, setTodoObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    
    
    //retrieve records
    useEffect(() => {
        firebaseDb.child('todos').on('value', snapshot => {
            if(snapshot.val() != null)
                setTodoObjects({
                    ...snapshot.val()
                })
            else
                setTodoObjects({})
        })
    }, [])// similar to componentDidMount

    const addOrEdit = obj => {
        if(currentId == '')
            firebaseDb.child('todos').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`todos/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        if(window.confirm('Are you sure to delete this record?')){
            firebaseDb.child(`todos/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    
    const displayMessage = key => {
        var ref =firebaseDb.child('todos');
        ref.once("value")
           .then(function(snapshot){
                let completed = snapshot.child(`${key}/completed`).val();
                if(completed === false){
                    firebaseDb.child(`todos/${key}`).update(
                         {completed: true}
                    ) 
                }else{
                    firebaseDb.child(`todos/${key}`).update(
                        {completed: false}
                    )
                }      
        })  
        
            
    }
    
    
     
    
     const getStyle = () => {
        return {
            if(){
               //textDecoration: 'line-through'
               //color:'red'
            }
                     
        }
     }

   
    return (

     <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Todo List App</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <TodoForm {...({ addOrEdit, currentId, todoObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-bordeless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Activity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(todoObjects).map(id => {
                                    return <tr key={id}>
                                        <td style={getStyle()}> <input type="checkbox" onChange={() => {displayMessage(id)}}/>  {todoObjects[id].activity}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                                 <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                                 <i className="far fa-trash-alt"></i>
                                            </a>
                                        
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
      </>
    );
}
export default Todos;