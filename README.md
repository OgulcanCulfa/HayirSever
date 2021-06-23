# Hayirsever
##### App is live on: [https://hayirsever.herokuapp.com/](https://hayirsever.herokuapp.com/)


Hayirsever is a social media platform especially made for students so they are able to help each other through sharing their needs or help other students. This is a single page web application.

<br>

## Features

- Share posts through only plain text or text and photo.
- Comment on other users posts through text or text and photo.
- Edit profile
- Check out other users profile
- Chat with other users

<br>

## Tech

Hayirsever uses a number of open source projects to work properly:

- React.js - https://reactjs.org/
- Node.js - https://nodejs.dev/
- Express.js - https://expressjs.com/
- Bootstrap 4 - https://getbootstrap.com/
- Socket.io - https://socket.io/
- JWT - https://jwt.io/
- MySQL - https://www.mysql.com/

<br>

## Service routes

### auth


| Route | HTTP Method | Request Body | Description |
| :-------------: | :-------------: | :-----: | :-------------: |
| /login | POST | EmailAddress,Password | Login operation |
| /register | POST | Name, Surname, EmailAddress,  Password, department, classNum | Register operation |

<br>

### category

| Route         | HTTP Method | Request Body   | Description  |
| :-------------: |:-------------:| :-----:| |:-------------:|
| /login   | GET          | - | Get all categories

<br>

### comment

| Route         | HTTP Method | Request Body   | Description  |
| :-------------: |:-------------:| :-----:| |:-------------:|
| /comments/:postId   | GET          | - | Get all comments
| /comments/:postId   | GET          | - | Get comments by Post id
|/comments  | POST          | text, photo | Create a comment includes only text or text and photo
|/comments  | DELETE          | text, photo | Delete a comment by id (You must be comment owner or Root user)

<br>

### post

| Route         | HTTP Method | Request Body   | Description  |
| :-------------: |:-------------:| :-----:| |:-------------:|
| /posts/?categoryId&offset   | GET          | - | Get all posts paginated by categoryId (if categoryId not given, it will return all posts paginated)
|/posts   | POST          | postUserId | Get all posts by user
|/posts  | POST          | categoryId, text, photo | Create a post includes only text or text and photo
|/posts | DELETE          | postUserId | Delete a post by id (You must be post owner or Root user)

<br>

### user

| Route         | HTTP Method | Request Body   | Description  |
| :-------------: |:-------------:| :-----:| |:-------------:|
| /users/:id   | GET          | - | Get a user by id)
|/chatusers   | GET          | - | Get all users for display users on chat screen
|/users  | PUT          | Name, Surname, EmailAddress, Password, mobile, address, city, district, department, classNum, website, github, twitter, instagram, facebook, kaggle, profilePhoto (none is required) | Update user information (You must be the user that you want to update or Root user)


<br>
<hr>
<br>

## Known issues

* All pages are responsive but Chat page.
* There is no admin panel right now. I need some time for it.
* This app deployed on Heroku, which is good for demonstrate demo apps but not for completed apps. I will deploy this app on more suitable platform soon.
