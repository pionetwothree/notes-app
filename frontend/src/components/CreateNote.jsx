import React, {useState} from 'react';
import axios from 'axios';

function CreateNote() {

    const [input, setInput] = useState({
        title: '',
        content: ''
    })

    function handleChange(event){
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event) {
        event.preventDefault();
        const newNote = {
            title: input.title,
            content: input.content
        };
        alert("Added");

        axios.post('http://localhost:3001/create', newNote).then((res) => {
            console.log(res.status);
            //if (res.success) {
            //alert("Added");
            //this.newNote({ title: "", content: ""});
            //}
          });

    }

    function Online () {
        if (navigator.onLine) {
          console.log('online');
          return <p style={{backgroundColor:'green', color: "white"}}>Online</p>;
        } else {
          console.log('offline');
          return <p style={{backgroundColor:'red', color: "white"}}>Offline</p>;
        }
        }

return <div className='container'>
        <h1>Create Note</h1>
        <br></br>
        <div className='text'>
        <Online> </Online>
        </div>
        <br></br>
        
        <form>
            <div className='form-group'>
                <input onChange={handleChange} name="title" value={input.title} autoComplete="off" className='from-control' placeholder="note title"></input>
            </div>

            <div className='form-group'>
                <textarea onChange={handleChange} name="content" value={input.content} autoComplete="off" className='from-control' placeholder="note content"></textarea>
            </div>

            <button onClick={handleClick} className="btn btn-lg btn-info">ADD NOTE</button>

        </form>
    </div>
}

export default CreateNote;