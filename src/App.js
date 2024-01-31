/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const rows = [

];

function App() {
    const urlAPI = "http://dm.a.tisbase.site";
    const [data, setData] = useState([]);
    const [dataWithId, setDataWithId] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await axios.get(urlAPI + "/api/v1/Market/all?sortByExpression=a");
            setData(response.data);
            
        };
        loadData();
    }, []);

    useEffect(() => {
        const updatedDataWithSTT = Array.isArray(data) ? data.map((d, index) => ({
            ...d,
            id: d.marketId || index + 1,
        })) : [];

        setDataWithId(updatedDataWithSTT);
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'marketId', headerName: 'MarketId', width: 90 },
        {
            field: 'countryCode',
            headerName: 'Country Code',
            width: 150,
            editable: true,
        },
        {
            field: 'marketName',
            headerName: 'Market Name',
            width: 150,
            editable: true,
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 110,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            width: 160,
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: false,
            width: 160,
        },
    ];

    return (
        <>
            <Box
                sx={{
                    margin: '46px'
                }}
            >
                <TextField
                    label="Market name"
                    variant="outlined"
                    sx={{
                        margin: "12px 0",
                        width: '100%'
                    }}
                />
                <TextField
                    label="Avatar"
                    variant="outlined"
                    sx={{
                        margin: "12px 0",
                        width: '100%'
                    }}
                />
                <TextField
                    label="Country code"
                    variant="outlined"
                    sx={{
                        margin: "12px 0",
                        width: '100%'
                    }}
                />
                <TextField
                    label="Status"
                    variant="outlined"
                    sx={{
                        margin: "12px 0",
                        width: '100%'
                    }}
                />
                <TextField
                    multiline
                    rows={2}
                    label="Description"
                    variant="outlined"
                    sx={{
                        margin: "12px 0",
                        width: '100%'
                    }}
                />
                <Button variant="contained">Submit</Button>
            </Box>
            <Box
                sx={{
                    margin: '46px'
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Table
                </Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={dataWithId}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </>
    );
}

export default App;
