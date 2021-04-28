import React, {useEffect, useState} from 'react';
//import Loader from './Loader';

function Notes2() {
    
    const [notes, setNotes] = useState([{
        //_id: '',
        title: '',
        content: '',
    }])
    const [mode,setMode]=useState('online');

    useEffect(() => {
        // '/note'   //https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-createnote-iiphq/service/CreateNote/incoming_webhook/get
        let url = '/notes'
        fetch(url).then((response) => {
            response.json().then((result) => {
                console.warn(result)
                setNotes(result)
                //localStorage.setItem("notes2",JSON.stringify(result))
            })
        }).catch(err=>{
            setMode('offline')
            let collection=localStorage.getItem("notes");
            setNotes(JSON.parse(collection))
        })
    }, [])   

    return <div className='container'>

            <h1 className='center'>Notes</h1>
            
            <div>
                {
                    mode ==='offline'?
                    <div className="alert alert-warning" role="alert">You are in offline mode or some issue with connection</div>
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


export default Notes2;

/**
const refreshPage = ()=>{
    window.location.reload();
 }

 <button onClick={refreshPage} className="btn btn-lg btn-info">REFRESH</button>
 */


