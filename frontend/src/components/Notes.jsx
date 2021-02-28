import React, {useEffect, useState} from 'react';
//import { collection } from 'notes-app/frontend/models/noteModel';

function Notes() {
    const [mode,setMode]=useState('online');
    const [notes, setNotes] = useState([{
        //_id: '',
        title: '',
        content: ''
    }])

    useEffect(() => {
        let url = '/notes'
        fetch(url).then((response) => {
            response.json().then((result) => {
                console.warn(result)
                setNotes(result)
                localStorage.setItem("notes",JSON.stringify(result))
            })
        }).catch(err=>{
            setMode('offline')
            let collection=localStorage.getItem("notes");
            setNotes(JSON.parse(collection))
        })
    }, [])    
    
    const refreshPage = ()=>{
        window.location.reload();
     }


    return <div className='container'>

            <div>
                {
                    mode ==='offline'?
                    <div>You are in offline mode</div> 
                    :null
                }
            </div>
            
            <h1 class='center'>Notes Page</h1>
            <button onClick={refreshPage} className="btn btn-lg btn-info">REFRESH</button>

            {notes.map(note => 
                <div>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                </div>
            )}
            
        </div>
    }


export default Notes;