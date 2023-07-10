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
          const token = jwt.sign({ email: user.email }, secretKey);

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
            const token = jwt.sign({ email }, secretKey);

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

// Reusable function to fetch data from the API
const fetchData = (url, options, res) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      res.json({ message: json.results });
    })
    .catch((err) => {
      console.error('error:' + err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
};

// Reusable function to handle API routes
const handleAPIRoute = (app, route, endpoint) => {
  app.get(route, verifyToken, (req, res) => {
    const genre = req.query.genre;
    let url = endpoint;

    if (genre) {
      url += `?with_genres=${genre}`;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
      }
    };

    fetchData(url, options, res);
  });
};
//movies
// Now Playing API
handleAPIRoute(app, '/api/now_playing', 'https://api.themoviedb.org/3/movie/now_playing');

// Trending Movies API
handleAPIRoute(app, '/api/trending-movies', 'https://api.themoviedb.org/3/trending/movie/day');


// Upcoming Movies API
handleAPIRoute(app, '/api/upcoming-movies', 'https://api.themoviedb.org/3/movie/upcoming');

// Top Rated Movies API
handleAPIRoute(app, '/api/top-rated-movies', 'https://api.themoviedb.org/3/movie/top_rated');
// Popular Movies API
handleAPIRoute(app, '/api/popular-movies', 'https://api.themoviedb.org/3/movie/popular');

//tv shows
// airing_today TV Shows API
handleAPIRoute(app, '/api/airing_today-tv', 'https://api.themoviedb.org/3/tv/airing_today');
// // on_the_air TV Shows API
// handleAPIRoute(app, '/api/on_the_air-tv', 'https://api.themoviedb.org/3/tv/on_the_air');


// Popular TV Shows API
handleAPIRoute(app, '/api/popular-tv', 'https://api.themoviedb.org/3/tv/popular');
// Top Rated TV Shows API
handleAPIRoute(app, '/api/top-rated-tv', 'https://api.themoviedb.org/3/tv/top_rated');

// trending TV Shows API
handleAPIRoute(app, '/api/trending-tv', 'https://api.themoviedb.org/3/trending/tv/week');




app.get('/api/genere', verifyToken, (req, res) => {
  const type = req.query.type;

  const url = `https://api.themoviedb.org/3/genre/${type}/list?language=en`;
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
      res.json({ message: json.genres });
    })
    .catch(err => console.error('error:' + err));
  });


  app.get('/api/moviedetails', verifyToken, async (req, res) => {
    try {
      const id = req.query.id;
      const mediaType = id.split("-")[0];
      const mediaId = id.split("-")[1];
      const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjI3NmM0N2ZmMzYyMzM4YmQyMzIxYWI3NjNmMjk5NSIsInN1YiI6IjYzZWM4NDUzNjk5ZmI3MDA5ZTNkNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nDzMFBeptzEBosro_izk2crkcTPms8XdtjifjTc3W70'
        }
      };
  
      // Fetch movie or TV show details
      const response = await fetch(url, options);
      const details = await response.json();
  
      // Fetch similar movies or TV shows
      const similarUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar`;
      const similarResponse = await fetch(similarUrl, options);
      const similarData = await similarResponse.json();
      const similarResults = similarData.results;
  
      res.json({ message: { details, similarResults } });
    } catch (error) {
      console.error('Error fetching movie details:', error);
      res.status(500).json({ error: 'An error occurred while fetching movie details.' });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
