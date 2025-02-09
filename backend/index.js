import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';

dotenv.config();

const app = express();

const PORT = 8080;

app.listen(PORT, ()=> console.log("Sever is hi running"));

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);