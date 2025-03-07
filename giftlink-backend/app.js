/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');


const router = express.Router(); // Initialize router


const connectToDatabase = require('./models/db');
const {loadData} = require("./util/import-mongo/index");
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
function App() {
  const navigate = useNavigate();
  return (
        <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/app" element={<MainPage />} />
          <Route path="/app/login" element={<LoginPage/>} />
          <Route path="/app/register" element={<RegisterPage />} />
        </Routes>
        </>
  );
}
export default App;


const app = express();
app.use("*",cors());
const port = 3060;

// Connect to MongoDB; we just do this one time
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
})
    .catch((e) => console.error('Failed to connect to DB', e));


app.use(express.json());

// Route files
// Gift API Task 1: import the giftRoutes and store in a constant called giftroutes
//{{insert code here}}
const giftRoutes = require('./routes/giftRoutes');
// Search API Task 1: import the searchRoutes and store in a constant called searchRoutes
//{{insert code here}}
const searchRoutes = require('./routes/searchRoutes');


const pinoHttp = require('pino-http');
const logger = require('./logger');

app.use(pinoHttp({ logger }));

// Use Routes
// Gift API Task 2: add the giftRoutes to the server by using the app.use() method.
//{{insert code here}}
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
// Search API Task 2: add the searchRoutes to the server by using the app.use() method.
//{{insert code here}}


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get("/",(req,res)=>{
    res.send("Inside the server")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
