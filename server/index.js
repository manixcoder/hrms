import express from 'express';
import cors from 'cors';
import { AdminRouter } from './Routes/AdminRoute.js';

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'], // Adjust this to your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Allow credentials if needed
}));
app.use(express.json());
app.use('/auth', AdminRouter);



// Set the port from environment variable or default to 5000

const PORT =3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

