import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

function TodoList() {
    const [todo, setTodo] = useState({description: '', date: '', priority:''});
    const [todos, setTodos] = useState([]);
    const [datePick, setDate] = useState('');
    const gridRef = useRef();

    const inputChanged = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        setTodo({ ...todo, date: datePick });
    }
        
    )

    const addTodo = (event) => {
        setTodos([...todos, todo]);
    }
    
    
    const columns = [
        { field: "description", sortable: true, filter: true, floatingFilter: true },
        { field: "date", sortable: true, filter: true, floatingFilter: true },
        { field: "priority", sortable: true, filter: true, floatingFilter: true,
         cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
        }
    ]
    
    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index !== gridRef.current.getSelectedNodes()[0].childIndex))
        }
        else {
            alert('Select row first')
        }
    }
    
    return (
        <div>
            <a style={{fontSize:'30px', display:'flex', width:'100%',color:'white', background:'black', justifyContent:'center', align:'center', marginBottom: 15}}>TodoList</a>
            <div>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <TextField type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            views = {['year', 'month', 'day']}
                            onChange={datePick => setDate(datePick)}
                            label="Date"
                            value={datePick}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
                    <Button onClick={addTodo} variant="contained">Add</Button>
                    <Button onClick={deleteTodo} variant="contained">Delete</Button>
                </Stack>
                
                <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto', justifyContent:'center', alignItems:'center' }} >
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={ params => gridRef.current = params.api }
                        rowSelection="single"
                        columnDefs={columns}
                        rowData={todos}
                        animateRows='true'
                    >
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default TodoList;