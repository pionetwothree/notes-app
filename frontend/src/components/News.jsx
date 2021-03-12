import React, { useState, useEffect } from 'react'
//import {Table} from 'react-bootstrap'
  
export default function News() 
{

    //const API_KEY = 'HGJWFG4N8AQ66ICD';
    //let StockSymbol = 'FB';
    //const API Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    const [data, setData] = useState([])
    const [mode, setMode] = useState('online');
    useEffect(()=>{
        const API_KEY = 'SRQNFPIMBAA33FHE';
        const StockSymbol = 'IBM';
        let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSymbol}&apikey=${API_KEY}`;
        fetch(url).then((response)=>{
            response.json().then((result)=>{
                console.warn(result)
                //console.log(response.status); // 200
                setData(result.data)
                localStorage.setItem("users",JSON.stringify(result))
                
            })
        }).catch(err=>{
            setMode('offline')
            let collection=localStorage.getItem('users');
            setData(JSON.parse(collection))
        });

        //function handleClick(event) {
        //    event.preventDefault();
        //    const Symbol = {
        //        StockSymbol: data.StockSymbol
        //    }   


    }, [])

    return (
        <div>
            <div>
                {
                    mode==='offline'?
                    <div class="alert alert-warning" role="alert">
                        You are in offline mode or some issue with connection
                    </div>
                    :null
                }
            </div>

            { data }
            
        </div>
    )
}
