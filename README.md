Welcome to UmakeStream, the coding playground where I, a fun-loving fresher, am on a mission to conquer the Netflix universe, one clone at a time! 🚀🎥📺

While the world Netflix-and-chills, I'm here to add a unique twist to my weekends. Instead of simply watching, I'm taking the leap to clone it. With every line of code, I'm diving deeper into the world of full-stack development, enhancing my skills, and embracing the joy of creativity. 🚀🎥📺Who needs to watch movies when you can have a blast with code, right? 💻✨
Disclaimer: No Netflix subscriptions were harmed in the making of this project. 😉

## Project Description

UmakeStream is a full-stack web application inspired by Netflix. The main goal of this project is to provide users with a seamless streaming experience and an attractive user interface. The application includes features such as user authentication, a captivating home page with a featured poster, a slider to showcase popular movies and TV shows, genre-based filtering, a search functionality, a personalized "My List" page, and an account details page.

## 🚀 Features

- **User Authentication**: ✅ Sign up and log in to access all the features of UmakeStream and personalize your experience.
- **Home Page**: ✅ Get greeted by a stunning featured poster and explore a wide range of movies and TV shows available for streaming.
- **Slider**: Engage with our visually appealing slider to discover the latest and most popular titles.
- **Genre Filtering**: Find exactly what you're looking for by filtering movies and TV shows based on different genres.
- **Search**: Search for your favorite movies and TV shows using keywords and get instant results.
- **My List**: Create your personalized "My List" by saving your favorite movies and TV shows for easy access.
- **Account Details**: Manage your account settings and update your personal information effortlessly.

## 💻 Technologies and Tools Used

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - CSS: Styling the components and layout.
  - React Router: Library for handling client-side routing in the application.

- **Backend**:
  - Node.js: JavaScript runtime for executing server-side code.
  - Express: Web framework for building the server and handling HTTP requests.
  - MySQL: Relational database management system for storing user information securely.
  - bcrypt: Package for password hashing to ensure secure storage of user passwords.
  - JSON Web Tokens (JWT): Package for generating and validating authentication tokens.
  - CORS: Package for enabling Cross-Origin Resource Sharing to allow requests from different domains.

## 🎨 Design and Styling

UmakeStream has a unique and visually appealing design that combines elegance with a touch of fun. The user interface is carefully crafted to provide an immersive streaming experience while reflecting your creativity. The color scheme and typography are chosen to create a visually cohesive and pleasing aesthetic. CSS styling is used to enhance the visual presentation and ensure a consistent user experience throughout the application.

## 🛠️ Database Setup

The project uses MySQL as the database management system to store user information. Follow these steps to set up the database:

1. Install and set up MySQL on your local machine or a remote server.
2. Connect to your MySQL server using a MySQL client.
3. Create a new database named `umakestream` by running the following SQL command:
   ```sql
   CREATE DATABASE umakestream;
   ```
4. Switch to the `umakestream` database:
   ```sql
   USE umakestream;
   ```
5. Create the `users` table by running the following SQL command:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL
   );
   ```
6. Your database setup is now complete.

Make sure to update the MySQL connection details (`user`, `password`, `host`, `database`) in the server code to match your MySQL setup.

## ⚙️ Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install the

 dependencies for both the frontend and backend: `npm install` (run this command in both the root directory and the `frontend` directory).
3. Start the backend server: `npm start` (run this command in the root directory).
4. The server should start running on `http://localhost:5000`.
5. Start the frontend development server: `npm start` (run this command in the `frontend` directory).
6. The React frontend should start running on `http://localhost:3000`.

Make sure to update the MySQL connection details in the server code to match your MySQL setup.

## 🎯 Usage

1. Open the web application in your browser.
2. Create a new account or log in to your existing account.
3. Explore the vast collection of movies and TV shows on the home page.
4. Use the slider to discover trending titles and navigate through different genres.
5. Use the search functionality to find specific movies and TV shows.
6. Save your favorite titles to your "My List" for quick access.
7. Update your account details as needed.
8. Log out when you're finished streaming.

## 🚧 Roadmap

UmakeStream is an ambitious project, and we have big plans for its future development. Some exciting features we plan to add include:

- Integration with external movie and TV show APIs to fetch real-time data and expand the available content.
- Advanced recommendation algorithms to provide personalized suggestions based on user preferences and viewing history.
- User reviews and ratings for movies and TV shows to foster community engagement.
- Social sharing features to allow users to share their favorite content with friends and family.
- Responsive design to ensure a seamless experience across various devices.

## Authentication and Authorization

The authentication and authorization flow in this project involves the use of JSON Web Tokens (JWT) for securely transmitting user identity information between the client and the server. The server-side uses bcrypt to securely hash and store user passwords in the database.

Here's how the authentication and authorization process works:

- When a user logs in, the server compares the provided password with the hashed password from the database. If the passwords match, the server generates a JWT containing the user's email as a payload.

- The server sets an HTTP-only cookie in the response containing the JWT. The HTTP-only attribute ensures that the cookie cannot be accessed by client-side JavaScript code, enhancing security.

- On the client-side, the JWT is stored in a cookie using the browser's built-in cookie storage capabilities. This storage mechanism ensures that the cookie is securely managed and automatically included in subsequent requests to the same server.

- To access protected routes on the server, the client should include the JWT in the Authorization header of each request as a Bearer token. The client-side code is responsible for extracting the JWT from the cookie and including it in the request headers.

- The server receives the request and verifies the JWT's authenticity and validity. If the token is valid and not expired, the server grants access to the requested protected resource. If the token is invalid or expired, the server responds with an appropriate error status code.

By storing the JWT in an HTTP-only cookie, the client-side code ensures the security and integrity of the token. The cookie is automatically sent with each request to the server, eliminating the need for the client to manually include the token in every request.

It's important to note that the client-side code must handle cookie storage securely, considering aspects such as same-site and secure attributes, to prevent cross-site scripting (XSS) attacks and unauthorized access to the token.

The project also uses bcrypt to securely hash and store user passwords in the database. This ensures that user passwords are not stored in plain text and are protected against unauthorized access.
