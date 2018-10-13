# LA Bike Sharing Analytics

## Set up
```bash
$ npm run setup # When it prompts for password, enter the password: 'adminpw' (no quotations)
```
## Running
In one terminal window, enter psql:
```bash
$ npm run db
```
Once you have entered the postgres CLI, run the init script 
```
<your_project_db>=# \i config/script.sql
````
Now in another window, initialize our database and server:
```bash
$ npm start
```
Now go to `localhost:5000/` and you should be ready to start interacting with the API!

