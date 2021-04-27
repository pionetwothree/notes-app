import React from 'react';

//const app = Realm.App.getApp("<Your App ID>"); // replace this with your App ID

export default class Notes1 extends React.Component {

    state = {
      loading: true,
      description: ([{
        //_id: '',
        title: '',
        content: '',}])
    };
  
    async componentDidMount() {
      const url = '/notes';
      const response = await fetch(url);
      const data = await response.json() //response.json()
        this.setState({ description: data, loading: false });
        console.warn(data); 
        localStorage.setItem("notes1",JSON.stringify(data))
    }
    
    render() {
      if (this.state.loading) {
        return <div>loading...</div>;
      }
      if (!this.state.description) {
        return <div>Error</div>;
      }

          
  
      return (
          <div className='container'>
          <div className='center'>  
          <button onClick={() => this.componentDidMount()} className="btn btn-lg btn-info">Update</button>  
            {this.state.description.map(note => 
                <div>
                    <p>{note.title}</p>
                    <p>{note.content}</p>
                </div>
            )}
            </div>

      </div>
      );
    }
  }

  
//Web Server for Chrome Extension in Google Chrome Browser verwenden für Bilder aus lokalen Laufwerk einbinden 
//--> ansonsten Fehlermeldung
//http://127.0.0.1:8888 und Ordner auswählen im Extension Tool


//<h1>{note.title}</h1>
