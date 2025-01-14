import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext"

const AddNote = (props)=>{
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description:"", tag:""});
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description:"", tag:""})
        props.showAlert("Added sucessfully", "sucess");
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    return (
        <div className="container my-3">
            <h1>Add a Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Note</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onChange}></textarea>
                </div> */}
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className='btn btn-primary' onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
