import React, {useEffect, useState} from 'react';

function Notes() {
    const [notes, setNotes] = useState([{
        //_id: '',
        title: '',
        content: ''
    }])

    useEffect(() => {
        fetch('/notes').then(res => {
            if(res.ok) {
                return res.json()
            }    
        }).then(jsonRes => setNotes(jsonRes));
    })
    
    const refreshPage = ()=>{
        window.location.reload();
     }


    return <div className='container'>
            
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