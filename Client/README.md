# Movie and Subscription Management System Project

Welcome to the Movie and Subscription Management System project! 
This system allows registered users to manage members and subscribe them to movies, utilizing a detailed permission system for access control.

## Technologies Used

* **Frontend:**
    * React
    * Redux (for state management)
    * Material-UI (UI components library)
* **Backend:**
    * Node.js
    * Express (web framework)
    * Mongoose (ODM for MongoDB)
    * REST API (communication architecture)
* **Database:**
    * MongoDB
* **Additional Tools:**
    * Postman (API testing)
    * Studio 3T (MongoDB management)

## Project Description

This system offers a comprehensive platform for managing a movie library and subscriptions. Registered users can perform various actions based on their assigned permissions, including creating, viewing, updating, and deleting movies and subscriptions. The system also includes advanced user management with defined access levels and permissions.

### User Permissions

The system supports a detailed permission system, including the following permissions:

* `Create Movies`
* `View Movies`
* `Update Movies`
* `Delete Movies`
* `View Subscriptions`
* `Create Subscriptions`
* `Update Subscriptions`
* `Delete Subscriptions`

Users can only access functions and areas within the system according to their granted permissions.

### User Management and Security

* **User Management by Admin:** Only the main system administrator can create new users.
* **User Creation Without Password:** The administrator creates users with basic details but without an initial password.
* **Initial Registration:** New users are required to register and choose a password on the login page for the first time.
* **Secure Login:** Users log in using their username and password.
* **Session Timeout:** After a defined period, users are automatically logged out of the system.
* **Admin User Editing:** The system administrator can edit the details of existing users.

### Backend Architecture

The system's backend is built with a modular design and includes several key components:

* **Combined Database (Members and Movies):** This MongoDB database stores information about members and movies. Some movie and member data is initialized from an external web service. This database also manages member movie subscriptions.
* **Database and Files (Users and Permissions):** User data (username, personal details) is stored in a separate MongoDB database and two JSON files containing additional information about users and their permissions.
* **Main Backend Server:** This Node.js/Express server receives requests from the client (React), aggregates data from the user database, files, and the secondary server (subscriptions server), and returns responses to the client. It is responsible for user management, permissions, and overall integration.
* **Secondary Backend Server (Subscriptions):** This Node.js/Express server operates directly with the combined database (members and movies) and provides information and services related to subscriptions to the main server.

### User Interface (Frontend)

The system's user interface, built using React and Material-UI, focuses on a comfortable and efficient user experience. It includes main tabs for managing:

* **Movies:** Allows viewing, creating (based on permission), updating, and deleting movies.
* **Subscriptions:** Allows viewing, creating (based on permission), updating, and deleting subscriptions for members.
* **Users:** (Accessible only to the administrator) Allows managing users, including creation and editing.


## Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/OnlineMovies.git
    cd ServerSubscriptions
    ```

2.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Backend Environment:**
    * Create a `.env` file (if it doesn't exist) in the server directory and define the necessary environment variables, such as the MongoDB URIs for both databases and any other settings for external services.

4.  **Run the Backend Server:**
    ```bash
    npm run dev         # for development mode with Nodemon (if configured)
    # or
    npm start           # for regular execution
    ```
5.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/OnlineMovies.git
    cd ServerCinema
    ```

6.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

7.  **Configure Backend Environment:**
    * Create a `.env` file (if it doesn't exist) in the server directory and define the necessary environment variables, such as the MongoDB URIs for both databases and any other settings for external services.

8.  **Run the Backend Server:**
    ```bash
    npm run dev         # for development mode with Nodemon (if configured)
    # or
    npm start           # for regular execution
    ```

9.  **Install Frontend Dependencies:**
    ```bash
    cd client # or your client directory name
    npm install
    ```

10.  **Configure Frontend Environment:**
    * Create a `.env` file (if it doesn't exist) in the client directory and define the necessary environment variables, such as the API server address.

11.  **Run the Frontend Client:**
    ```bash
    npm start
    ```

    The client will typically run at `http://localhost:3000` (or another port depending on the configuration).
    The `ServerSubscriptions` backend will run at `http://localhost:4000` (or another port depending on your `.env` configuration).
    The `ServerCinema` backend will run at a different port as well (check your `.env` or console output).

## API Endpoints (Backend)

The main API endpoints are as follows:

### Members (`/members`)

* `GET /members`: Get a list of all members.
* `GET /members/:id`: Get a member by ID.
* `POST /members`: Add a new member.
* `PUT /members/:id`: Update an existing member.
* `DELETE /members/:id`: Delete a member.
* `GET /members/initializeMembers`: Initialize member data from an external web service and save it to the database.

### Movies (`/movies`)

* `GET /movies`: Get a list of all movies.
* `GET /movies/:id`: Get a movie by ID.
* `POST /movies`: Add a new movie.
* `PUT /movies/:id`: Update an existing movie.
* `DELETE /movies/:id`: Delete a movie.
* `GET /movies/initializeMovies`: Initialize movie data from an external web service and save it to the database.

### Subscriptions (`/subscriptions`)

* `GET /subscriptions`: Get a list of all subscriptions.
* `GET /subscriptions/:id`: Get a subscription by ID.
* `POST /subscriptions`: Add a new subscription.
* `PUT /subscriptions/:id`: Update an existing subscription.
* `DELETE /subscriptions/:id`: Delete a subscription.

### Users (`/users`)

* `GET /users`: Get a list of all users (combines data from various sources).
* `GET /users/:id`: Get a user by ID (combines data from various sources).
* `POST /users`: Add a new user (saves data to both file and database).
* `PUT /users/:id`: Update an existing user (updates data in both file and database).
* `DELETE /users/:id`: Delete a user by ID (deletes data from both sources).

## Administrator Access

You can access the system with administrator privileges using the following credentials:

* **Username:** `admin`
* **Password:** `12345678`

## License

This project is licensed under the MIT License.