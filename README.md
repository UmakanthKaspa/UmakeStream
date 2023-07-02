# UmakeStream

The project is a web application that provides user authentication and authorization functionality using a Node.js backend with Express, MySQL for database management, and React for the frontend.

## Tools and Technologies Used

- Node.js: A JavaScript runtime used to execute server-side code.
- Express: A web framework for Node.js used to build the server and handle HTTP requests.
- MySQL: A popular open-source relational database management system used to store user information securely.
- React: A JavaScript library for building user interfaces.
- bcrypt: A package used for password hashing to securely store user passwords.
- jwt: A package used for generating JSON Web Tokens (JWT) for authentication and authorization.
- CORS: A package used to enable Cross-Origin Resource Sharing, allowing the server to accept requests from a different domain or port.

## Packages Used

- express: "^4.17.1"
- mysql: "^2.18.1"
- bcrypt: "^5.0.1"
- jsonwebtoken: "^8.5.1"
- cors: "^2.8.5"

These packages were chosen because they are widely used and have good community support for building robust and secure web applications with user authentication and authorization.

## Database Details

The project uses MySQL as the database management system to store user information. You need to set up a MySQL server and create a database named `umakestream`. The database should have a table named `users` with the following structure:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

The `users` table has four columns:
- `id`: An auto-incrementing integer column used as the primary key.
- `username`: A VARCHAR column to store the user's username.
- `email`: A VARCHAR column to store the user's email.
- `password`: A VARCHAR column to store the hashed password.

Make sure to update the MySQL connection details (`user`, `password`, `host`, `database`) in the server code to match your MySQL setup.

## Getting Started

To run the project locally:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install the dependencies: `npm install`
3. Start the server: `npm start`
4. The server should start running on `http://localhost:5000`.
5. Navigate to the React frontend directory: `cd frontend`
6. Install the frontend dependencies: `npm install`
7. Start the frontend development server: `npm start`
8. The React frontend should start running on `http://localhost:3000`.

## Usage

- Open the web application in your browser.
- You will see a login form. Enter your email and password.
- Click the "Login" button.
- If the login is successful, you will receive an access token.
- Use the access token for further authenticated requests to the server.

Certainly! Here's the combined section for the README file that includes information about how the client-side handles authentication and authorization using JSON Web Tokens (JWT) stored in cookies:

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

Feel free to update and customize this section based on your specific project's implementation details and any additional information you want to provide.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to update and customize this README file based on your specific project requirements and additional information you want to provide.
