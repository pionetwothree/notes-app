import React from "react";
import {Table} from 'react-bootstrap'

export default class StockNews extends React.Component {
  state = {
    loading: true,
    description: [null]
  };

  async componentDidMount() {
    const API_KEY = 'SRQNFPIMBAA33FHE';
    const StockSymbol = 'IBM';
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSymbol}&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ description: data, loading: false });
    localStorage.setItem("Stock",JSON.stringify(data))
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.description) {
      return <div>Error</div>;
    }

    return (
        <div>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Industry</th>
                <th>EBITDA</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{this.state.description.Symbol}</td>
                <td>{this.state.description.Name}</td>
                <td>{this.state.description.Industry}</td>
                <td>{this.state.description.EBITDA}</td>
            </tr>
        </tbody>
        </Table>
    </div>
    );
  }
}