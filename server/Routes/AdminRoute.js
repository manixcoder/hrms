import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import multer from 'multer';
import path from 'path';

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

// Multer setup for file uploads

const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

/*
const upload = multer({ storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);     
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed (jpeg, jpg, png)'));
        }       
    }
}).single('profile');
*/
const upload = multer({
    storage: storage
})

//end of multer setup

router.post('/employee/add',upload.single('profile'), (req, res) => {
    console.log(req.body);

    const sql = `INSERT INTO employee (name, email, password, salery, address, category_id, profile) VALUES (?)`;
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.json({ Status: false, message: 'Error hashing password' });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salery,
            req.body.address,
            req.body.category_id,
            req.file ? req.file.filename : null
        ];
        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.json({ Status: false, error: 'Error adding employee' });
            } else {
                console.log("Employee added successfully:", result);
                return res.json({ Status: true, message: 'Employee added successfully' });
            }

        });
    });

});



export { router as AdminRouter };