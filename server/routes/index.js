import express from 'express';
import usersPost from './users/post';
import usersLogin from './users/login';

const app = express();

app.post('/login', usersLogin);
app.post('/users', usersPost);

export default app;
