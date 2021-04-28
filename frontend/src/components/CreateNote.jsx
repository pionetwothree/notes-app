import React, {useState} from 'react';
import axios from 'axios';

export default function CreateNote() {

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

        //https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-createnote-iiphq/service/CreateNote/incoming_webhook/webhook0
        axios.post('http://localhost:3001/create', newNote).then((res) => {
            console.log(res.status);
          });
    }

    /**
    function Online () {
        if (navigator.onLine) {
          console.log('online');
          return <p style={{backgroundColor:'green', color: "white"}}>Online</p>;
        } else {
          console.log('offline');
          return <p style={{backgroundColor:'red', color: "white"}}>Offline</p>;
        }
        } 
    */

    window.addEventListener('load', function() {
        var status = document.getElementById("status");
        
        function updateOnlineStatus(event) {
          var condition = navigator.onLine ? 'online 👍' : 'offline 👎 - please check network connection';
      
          status.className = condition;
          status.innerHTML = condition.toUpperCase();
      
        }
      
        window.addEventListener('online',  updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        if (navigator.onLine) {
            updateOnlineStatus();
            console.log('online');
            
          } else {
            console.log('offline');
            updateOnlineStatus();
          }
        },
    );


return <div className='container'>
        <h1>Create Note</h1>
        <br></br>
        <updateOnlineStatus> </updateOnlineStatus>
        <div id="status" style={{backgroundColor:'grey', color: "white"}}></div>
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