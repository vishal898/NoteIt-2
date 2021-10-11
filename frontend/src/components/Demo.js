// import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';

export default function Demo() {
    const fetchData = async()=>{
        const data = await axios.get('http://localhost:5000/getNote/61585c23e89d8ed725e446f3')
        console.log(data);
    }
    // fetchData();
    useEffect(()=>{
    fetchData();
    },[])
    return (
        <div>
            <h1>hello world</h1>
        </div>
    )
}
