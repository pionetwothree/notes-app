import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';

export default function ApolloNotes() {

  function Online () {
    if (navigator.onLine) {
      //console.log('online');
      return <p style={{backgroundColor:'green', color: "white"}}>Online</p>;
    } else {
      //console.log('offline');
      return <p style={{backgroundColor:'red', color: "white"}}>Offline</p>;
    }
    }

 
    
    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(),
      typePolicies: {
          Note: {
            // Singleton types that have no identifying field can use an empty
            // array for their keyFields.
            keyFields: ["name", "content"]},
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'cache-first',
            },
          },
      },
      connectToDevTools: true
      
    }); 

  /*
  const READ_NOTES = gql`
  query allnotes($name: String!, $content: String!) {
    todo(name: $name, content: $content) {
      id
      name
      content
      }
    }
  `;
  */

  const ADD_NOTE = gql`
  mutation addNote($name: String!, $content: String!) {addNote(name: $name, content: $content) {
    id
    name
    content}}`;

  //useQuery(gql`query {allnotes{name,content}} `);
  function NotesQuery() {
    const { loading, error, data } = useQuery(gql`query {allnotes{name,content}} `);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p> error </p>;
     

    return data.allnotes.map(({ name, content }) => (
      <div key={name}>
        <p>
          {name}: {content}
        </p>
      </div>
    ));
    };

  function AddNote() {
      let input1;
      let input2;
      const [addNote] = useMutation(ADD_NOTE, {
        update(cache, { data: { addNote } }) {
          cache.modify({
            fields: {
              todos(existingNotes = []) {
                const newNoteRef = cache.writeQuery({
                  data: addNote,
                  fragment: gql`
                    fragment NewNote on Note {
                      id
                      name
                      content
                    }
                  `
                })
                  return [...existingNotes, newNoteRef];
              }
            }
           });
        }
      });
      client.writeQuery({
        query: gql`
          query allnotes($name: String!, $content: String!) {
            Note(name: $name, content: $content) {
              id
              name
              content
            }
          }`,
        data: { // Contains the data to write
          Note: {
            __typename: 'Note',
            id: true,
            name: true,
            content: true,
          },
        },
        variables: {
          id: true,
          name: true,
          content: true,
        }
      }); 

      return (
        <div>
          <form
           onSubmit={e => {
            e.preventDefault();
            addNote({ variables: { name: input1.value, content: input2.value } });
            input1.value = ''; input2.value = '';
          }}>
            <input name="title" autoComplete="off" className='from-control' placeholder="title"
              ref={node => {input1 = node}}/>
            <input name="content" autoComplete="off" className='from-control' placeholder="content"
              ref={node => {input2 = node}}/>
            <button type="submit" value="OK">Add Note</button>
          </form>

        </div>
      );
    }
    

  /** 
    const { todo } = client.readQuery({
      query: READ_NOTES,
      variables: { // Provide any required variables here
        name: "Eintrag",
      }})
*/

const READ_NOTES_EINTRAG = gql`
  query allnotes($name: String!, $content: String!) {
    Note(name: $name, content: $content) {
      name
      content
      }
    }
  `;

/*
const READ_NOTE = gql`
query ReadTodo($name: String!) {
  Note(name: $name) {
    id
    name
    content
  }
}
`;

// Fetch the cached Note item with name "Eintrag"
const { Note } = client.readQuery({
query: READ_NOTE,
variables: { // Provide any required variables here
  name: "Eintrag",
},
});
*/

    function ReadCache() {
        const { loading, error, data } = useQuery(READ_NOTES_EINTRAG, {
        variables: { // Provide any required variables here
          name: true,
          content: true,
    }});

    if (loading) return 'Loading...';
    if (error) return 'Failure:  ' + error;
    if (data === null) return '0';
    
    return (
      <div>
      {JSON.stringify(data)}
      </div>
     
    )
    }
  
    return (
      <div className='container'>
      <ApolloProvider client={client}>
          <div class='center'>
            <h1 class='center'>My first Apollo app 🚀</h1>
            <br></br>
              <div className='text'>
              <Online> </Online>
              </div>
            <AddNote />
            <br></br>
            <NotesQuery />
            <br></br>

           <div>
            <ReadCache></ReadCache>
          </div>
        

      </div>
      </ApolloProvider>
            
    
    </div>
    )
    }

