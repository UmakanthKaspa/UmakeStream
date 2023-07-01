const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const port = 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: '####',
  password: '####',
  database: 'umakestream',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to get the user with the provided email
  const query = `SELECT * FROM users WHERE email = ?`;
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error executing login query:', err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    } else if (results.length === 0) {
      // User does not exist
      res.status(401).json({ error: 'Invalid email or password.' });
    } else {
      const user = results[0];
      try {
        // Compare the provided password with the hashed password from the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          // User exists and credentials are correct
          // Generate an access token
          const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });

          // Return the access token in the response
          res.status(200).json({ message: 'Login successful.', token });
        } else {
          // Password is incorrect
          res.status(401).json({ error: 'Invalid email or password.' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      }
    }
  });
});

// Signup API
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error executing user check query:', err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    } else if (results.length > 0) {
      // User already exists
      res.status(409).json({ error: 'Email already exists.' });
    } else {
      try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertUserQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;
        connection.query(insertUserQuery, [email, hashedPassword], (err) => {
          if (err) {
            console.error('Error executing user insert query:', err);
            res.status(500).json({ error: 'An unexpected error occurred.' });
          } else {
            // User registration successful
            // Generate an access token
            const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

            // Return the access token in the response
            res.status(200).json({ message: 'Signup successful.', token });
          }
        });
      } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
