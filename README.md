# Table of contents
- [Table of contents](#table-of-contents)
- [Blog](#blog)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project overview](#project-overview)
    - [Home page](#home-page)
    - [Register page](#register-page)
    - [Login page](#login-page)
    - [Dashboard page](#dashboard-page)
    - [Post details page](#post-details-page)
    - [Create post page](#create-post-page)
    - [Edit post page](#edit-post-page)
    - [Profile page](#profile-page)
    - [other](#other)
- [Tech Stack](#tech-stack)
- [Todo list](#todo-list)

# Blog
  This is a software blogging system built with MERN stack.
  The project allows people to share publications centered around the software community. Each user can publish new stories or comment/like on already existing ones.

# Prerequisites

You need to have installed [Node js](https://nodejs.org) and [MongoDB Community Server.](https://www.mongodb.com/try/download/community)

# Installation

To install the project you first need to clone it with the following command:
```sh
    git clone https://github.com/gosho6677/Blog.git
```
Then cd into it and you need to install the dependencies of the front and back end separately:
```sh
    cd client/ && npm install
    cd ..
    cd server/ && npm install
```
Type these commands one after another and everything will be installed and ready. To run the project there need to be 2 terminals running since this is an end to end application.
When the terminals are opened in both of them you just need to type `npm start` and everything should start.

# Project overview

### Home page
![home page](https://www.dropbox.com/s/9pfsdq8w5poio9t/home-page.png?raw=1)

Home page is simple it just displays the top three most liked stories, their date of creation and more details link to the story
while taking in mind that you can't like/dislike/comment if you aren't logged in.

### Register page
![reg page](https://www.dropbox.com/s/0d7oplbktvtqnxf/register-page.png?raw=1)

To register you are required to provide valid email, username, atleast 5 characters password and repeat password. If some of the entries is incorrect a red buble appears at the top right corner which disappears
after 10 seconds if not clicked and it contains the errors you've made while trying to register.

### Login page
![log page](https://www.dropbox.com/s/xykrq7raz8be1d3/login-page.png?raw=1)

The login form is the same with the errors and you need only to provide correct credentials.
![error box](https://www.dropbox.com/s/s3d0qi3squxuftc/error-box.png?raw=1)

That's error box appearing when wrong credentials are entered.

### Dashboard page
![dashboard page](https://www.dropbox.com/s/ittl6kvm6qi1ziu/dashboard.png?raw=1)

The dashboard page includes all of the stories and you can search for particular one, sort them by likes or date posted.
They are also coordinated by query parameters which means that you can adjust your queries reload or send them to someone and everything will remain the same (it's not only visual). Also pagination is included: 

![pagination](https://www.dropbox.com/s/2oh3yl7gtghfbs4/dashboard-pagination.png?raw=1)

### Post details page
![details page](https://www.dropbox.com/s/jrlm6f20yonabds/details-page.png?raw=1)

If you are the **owner** of the post you can edit/delete the whole post or delete any comment you like. 

If you are not the **owner** you are shown only the likes of the post and like button if you haven't liked it or dislike button otherwise. You can also comment the post, but you can only delete your comments nothing else.

If you aren't **authenticated** you can only view the description,likes and comments of the post.

At the moment non-logged users can only view the top three most liked posts details (all posts are actually available, but only if you already have the id) and they can only go to home/login/register pages, because others are protected with **route guards** which will automatically redirect to the login page. The route guards are made with higher order component which first checks if there is a user present from the react context.

![comments](https://www.dropbox.com/s/ze7gmxgb7pcxhkv/comments.png?raw=1)

### Create post page
![create post](https://www.dropbox.com/s/wwaw2mx74lsrkvm/create-page.png?raw=1)

That's the create post form with example error. When entered valid inputs user is redirected to the dashboard page.

### Edit post page
![edit post](https://www.dropbox.com/s/y7nzxlpgty26vpv/edit-page.png?raw=1)

Edit is similar to create page and that's why I've the form as a shared component.

### Profile page
![profile](https://www.dropbox.com/s/3lm0q3sz9jz2vil/profile-page.png?raw=1)

Profile page is also simple, it shows the username, email and the published posts of the user.

### other
Тhere are many small details in this project, which to notice you must check the code itself.
# Tech Stack
> The main technologies I've used to build this end-to-end project are React js for front end views, node js as backend REST API and for database i've used MongoDB and mongoose. (MERN)

# Todo list

 - [x] isAuthenticated, isGuest hoc guards
 - [x] login, register requirements to make acc
 - [x] fetch all posts service
 - [x] create post page
 - [x] create post services,
 - [x] details page,
 - [x] edit post page,
 - [x] edit post services,
 - [x] delete post,
 - [x] like post/adjust backend endpoint also,
 - [x] comment post/adjust backend endpoint also,
 - [x] get top 3 most liked posts query for home page,
 - [x] dashboard sort posts e.g. by likes
 - [x] profile page
 - [x] add issued at on post and comment models + controllers
 - [x] switch to front end sorting for UX purposes
 - [x] add sort by most recent and oldest
 - [x] add search bar in dashboard
 - [x] extract create and edit components form into one shared
 - [x] add logout get request to add token to blacklist array
 - [x] add pagination FE and posts per page select tag
 - [x] exclude nested comment owner password and posts (populate trick)
 - [x] add 404 not found page component
 - [x] owners can delete all comments on their posts
 - [x] comment creator can delete his comment on given post
 - [x] add error boundary component
 - [x] add persistence on page reload at queries in dashboard (sort by and items per page)
 - [ ] add loading spinner
 - [x] fill up readme.md
 - [ ] add search to the query parameters
 - [ ] adjust the code to some of the google lighthouse recommendations