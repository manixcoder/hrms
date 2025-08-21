import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Example admin route
router.post('/adminlogin', (req, res) => {
    //console.log(req.body);
    const sql = 'SELECT * FROM admin WHERE email = ? AND password = ?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.json({ loginStatus: false, message: 'Error executing query' });
        }
        if (result.length > 0) {
            const email = result[0].email;

            const token = jwt.sign(
                { role: 'admin', email: email },
                'jwt_secret_key',
                { expiresIn: '1d' }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true, message: 'Login successful', token: token, admin: result[0] });


        } else {
            return res.json({ loginStatus: false, message: 'Wrong credentials' });

        }
    });

});

router.post('/category/add', (req, res) => {
    const { category } = req.body;
    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    const sql = 'INSERT INTO categories (name) VALUES (?)';
    con.query(sql, [category], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.json({ Status: false, error: 'Error adding category' });
        } else {
            console.log("Category added successfully:", result);
            return res.json({ Status: true, message: 'Category added successfully' });
        }

    });
});


router.get('/category', (req, res) => {
    const sql = 'SELECT * FROM categories';
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, error: 'Error fetching categories' });
        }

        if (result.length === 0) {
            return res.json({ Status: false, message: 'No categories found' });
        }
        return res.json({ Status: true, categories: result });
    });
});
export { router as AdminRouter };