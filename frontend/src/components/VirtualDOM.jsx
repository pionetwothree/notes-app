import React from 'react';

export default class VirtualDOM extends React.Component {
    constructor(props) {
      super();
      this.state = {
        age: 0,
        status: 0,
        time: '',
      };
      setTimeout(() => {
        this.setState({
          status: 1
        });
      },3000);
    }

    addThree() {
      this.setState({
          age: this.state.age +3,
          currentDateTime: Date().toLocaleString(),

      });
    }

    render () {
      return (
        <div>
          <p>In a new Component!</p>
          <p>your name is {this.props.name}, your age is {this.state.age}</p>
          <p>Status: {this.state.status}</p>
          <p>Time: { this.state.currentDateTime } </p>
          <hr/>
          <button onClick={() => this.addThree()} className="btn btn-primary">Add +3</button> 
        </div>
      );
    }
  }

/*  
VirtualDOM.propTypes = {
    name: React.PropTypes.string.isRequired,
    initialAge: React.PropTypes.number,
  };
*/

  