const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "root",
  database: 'umakestream',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Secret key for JWT
const secretKey = 'your-secret-key';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


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
          const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

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
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

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

// Home API
app.get('/api/home', verifyToken, (req, res) => {
  const email = req.user.email;
  res.json({ message: `Welcome to the home page, ${email}!` });
});

// Poster API
app.get('/api/now_playing', verifyToken, (req, res) => {
const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
  }
};
fetch(url, options)
  .then(res => res.json())
  .then(json => {
    // Process the fetched data here
    res.json({ message: json.results });
  })
  .catch(err => console.error('error:' + err));
});

// trending-movies API
app.get('/api/trending-movies', verifyToken, (req, res) => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
    }
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      // Process the fetched data here
      res.json({ message: json.results });
    })
    .catch(err => console.error('error:' + err));
  });


    //  popular-movies API
app.get('/api/popular-tv', verifyToken, (req, res) => {
  const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
    }
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      // Process the fetched data here
      res.json({ message: json.results });
    })
    .catch(err => console.error('error:' + err));
  });
      //  popular-movies API
app.get('/api/upcoming-movies', verifyToken, (req, res) => {
  const url = 'https://api.themoviedb.org/3/movie/upcoming';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
    }
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      // Process the fetched data here
      res.json({ message: json.results });
    })
    .catch(err => console.error('error:' + err));
  });
      //  popular-movies API
app.get('/api/top-rated-movies', verifyToken, (req, res) => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
    }
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      // Process the fetched data here
      res.json({ message: json.results });
    })
    .catch(err => console.error('error:' + err));
  });
      //  popular-movies API
app.get('/api/top-rated-tv', verifyToken, (req, res) => {
  const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
    }
  };
  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      // Process the fetched data here
      res.json({ message: json.results });
    })
    .catch(err => console.error('error:' + err));
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
