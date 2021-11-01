// import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from './Table/Table';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import TextField from '@mui/material/TextField';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));



export default function Demo() {
    const [skipDBCall, setSkipDBCall] = useState(false);
    const [data, setData] = useState();
    const [tableData, setTableData] = useState();
    const [diff, setDiff] = useState("All");
    const [filter, setFilter] = useState({
        difficulty: "",
        tags:[]
    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };
    const [availTags, setAvailTags] = useState(['OS','CN']);
    const theme = useTheme();
    const [tags, setTags] = React.useState([]);

    const [find, setFind] = useState();

    const buildFilter = () => {
        let query = {};
        for (let keys in filter) {
            if ( filter[keys] !== undefined && filter[keys].length > 0) {
                query[keys] = filter[keys];
            }
        }
        console.log(query); 
        return query;
    }

    const filterData = (data, query) => {
        console.log(query);
        
        const filteredData = data.filter(item => (query.difficulty === undefined ||item.difficulty === query.difficulty ) && (query.tags === undefined || query.tags.length === 0 || item.tags.some(tag => query.tags.includes(tag))));

        return filteredData;
    };

    const buttonClicked = () => {
        console.log(tableData);
    }

    useEffect(async()=>{

        if(!skipDBCall){
            console.log("DB CALL")
            const notes = await axios.get('http://localhost:5000/getAllNotes');
            const nd = await notes.data;
            setSkipDBCall(true);
            setData(nd);
            setTableData(nd);
            const ts = await axios.get('http://localhost:5000/getTags',{
                withCredentials:true,
            });  
            const ut = await ts.data;
            setAvailTags(ut);
        }
        setTableData(filterData(data,filter));
    },[filter])


    

    const handleDifficultyChange = async(event) => {
        const val = await event.target.value;
        console.log(val);
        setDiff(val);
        setFilter({
            ...filter,
            difficulty : val,
        });
        // setTableData(filterData(data,filter));
    };

    function getStyles(tag, tags, theme) {
    return {
        fontWeight:
        tags.indexOf(tag) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
    }

    

    const handleTagChange = async(event) => {

        const { target: { value },} = event;
        setTags(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );

        setFilter({
            ...filter,
            tags:value,
        });
    };

    const handleSearchChange = async(event) =>{
        const search  = await event.target.value ;
        console.log(search);
        setFind(search);

    }

    return (
        <div  style={{width:"1000px"}} >
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Box sx={{ width: "20%" }}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="demo-simple-select-label"> Difficulty </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ diff }
                        label="Difficulty"
                        onChange={handleDifficultyChange}
                    
                    >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                    <Box>
                    <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={tags}
                    onChange={handleTagChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                    {availTags.map((availtag) => (
                        <MenuItem key={availtag} value={availtag}>
                        <Checkbox checked={tags.indexOf(availtag) > -1} />
                        <ListItemText primary={availtag} />
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                    </Box>
                    <Box sx={{ width: "60%" }}>
                        <TextField sx={{ m: 1, width: "100%" }} id="outlined-search" label="Search field" onChange={handleSearchChange} type="search" />
                    </Box>
            </Stack>
            <br/>
            <br/>
            <br/>
            {/* <button onClick={buttonClicked}>Click</button> */}
            <br/>
            <br/>
            <br/>
            <Table notes = {tableData}/>
            
            
            <br /><br /><br /><br /><br /><br />

        </div>
    )
}




// const fetchData = async() => {
//     const data1 = await axios.get('http://localhost:5000/getAllNotes');
//     console.log(data1.data)
//     setData(data1.data);
//     console.log(data)

//     setDifficulty();
//     console.log(tableData);
// }

// filteredData.tags.sort();
// filter.tags.sort();

// const finalData = [];

// for(let k=0;k<filteredData.length;k++){
//     let i=0,j=0,len1=filteredData[k].tags.length,len2=filter.tags.length;
//     while(i<len1 && j<len2){
//         if(filteredData[k].tags[i] === filter.tags[j]){
//             finalData.push(filteredData[k]);
//             break;
//         }else if(filteredData[k].tags[i] < filter.tags[j])
//     }
// }

// console.log(data);
// const filteredData = data.filter((item) => {
//     for (let key in query) {
//         console.log(key);
//         console.log(item[key]);
//         console.log(query[key]);
        
//         if (item[key] === undefined || !query[key].includes(item[key])) {
//             console.log(item[key]);
//             console.log(query[key]);
//             return false;
//         }
//     }
//     return true;
// });

