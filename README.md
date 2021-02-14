## FORUM APPLICATION BACKEND

This is a backend of a simple forum application. You can reach the [Frontend](https://github.com/ocakhasan/forum-app-frontend). To use it, you should clone the repository. 

```
git clone https://github.com/ocakhasan/forum-app-backend.git
cd forum-app-backend
```

Then create a new .env file in the project directory which contains
* MONGODB_URI = contains the link to mongodb database
* PORT = port number for the server
* SECRETPASSWORD = a string for the jwt

then you can install the dependencies with
```
yarn install
```

then you are good to go. To start the server

```
yarn start
```

and your backend is working. 