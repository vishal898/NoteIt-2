import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Difficulty({dif, onChange}) {
    const [diff, setDiff] = React.useState(dif);

    const handleDifficultyChange = async(event) => {
        const val = await event.target.value;
        onChange(val);
        setDiff(val);
    };

    return(
        <Box sx={{ maxWidth: 100 }}>
            <FormControl fullWidth>
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
    )
}