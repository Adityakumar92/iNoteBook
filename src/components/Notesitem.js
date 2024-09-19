import React, {useContext} from 'react'
import noteContext from "../context/notes/NoteContext"

const Notesitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;


    const {note, updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="ri-delete-bin-6-fill" onClick={()=>{deleteNote(note._id); props.showAlert("Delete sucessfully", "sucess");}}></i>
                    <i className="ri-edit-2-fill" onClick={()=>{updateNote(note);}}></i>
                </div>
                </div>
        </div>
    )
}

export default Notesitem;