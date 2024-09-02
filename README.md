# sitemate-challenge

Sitemate Challenge for the Full-Stack Dev position

The application consists of two parts:

1. Frontend: Built using React, it is a simple web application that displays a list of
   items and allows users to view, add, edit and delete items.
2. Backend: Built using Node.js, it is a simple API that runs four routes, each for the specified action required by the client (GET, PUT, POST, DELETE)

## Running the application

### Running the server

To run the Node.js server, follow these steps:

1. Clone the repository.
2. Navigate to the **server** directorty and run `npm install` to install the required dependencies.
3. Run `npm start` to start the application.
4. The server should now be running on `http://localhost:8080/`.

### Running the frontend app

To run the React application, follow these steps:

1. Navigate to the **app** directorty and run `npm install` to install the required dependencies.
2. Run `npm start` to start the application.
3. Navigate to `http://localhost:3000/` on your browser to view the app.

### Connecting the MySQL Database

To migrate the sql dump, follow these steps:

1. Open MySQL Workbench.
2. Use an existing local connection, or create a new one.
3. On the menu bar, click on **Server**, then on **Data Import**.
4. In the new menu, select the file name **sitemate_issues.sql** and import it.
5. Now, navigate to the **app** directory, and create a .env file.
6. Add the variables to your .env file:

```
DATABASE_HOST="127.0.0.1"
DATABASE_USER= your_user
DATABASE_NAME="sitemate"
DATABASE_PASSWORD= your_password
DATABASE_PORT="3306"
```

7. The dump also contains some prefilled dummy data.
