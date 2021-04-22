import React, {useEffect, useState} from 'react';
//import Loader from './Loader';

function Notes() {
    
    const [notes, setNotes] = useState([{
        //_id: '',
        title: '',
        content: '',
    }])
    const [mode,setMode]=useState('online');

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

    return <div className='container'>

            <h1 class='center'>Notes Page</h1>
            
            <div>
                {
                    mode ==='offline'?
                    <div class="alert alert-warning" role="alert">You are in offline mode or some issue with connection</div>
                    :null
                }
            </div>

            <div>    
            {notes.map(note => 
                <div>
                    <h1>{note.title}</h1>
                    <p>{note.content}</p>
                </div>
            )}
            </div>

        </div>
    }


export default Notes;

/**
const refreshPage = ()=>{
    window.location.reload();
 }

 <button onClick={refreshPage} className="btn btn-lg btn-info">REFRESH</button>
 */


