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
- [Tech Stack](#tech-stack)

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
<!-- ![home page](https://www.dropbox.com/s/9pfsdq8w5poio9t/home-page.png?raw=1removeme) -->

Home page is simple it just displays the top three most liked stories, their date of creation and more details link to the story
while taking in mind that you can't like/dislike/comment if you aren't logged in.

### Register page
![reg page](https://www.dropbox.com/s/0d7oplbktvtqnxf/register-page.png?raw=1)
<!-- ![reg page](https://www.dropbox.com/s/0d7oplbktvtqnxf/register-page.png?raw=1removeme) -->

To register you are required to provide valid email, username, atleast 5 characters password and repeat password. If some of the entries is incorrect a red buble appears at the top right corner which disappears
after 10 seconds if not clicked and it contains the errors you've made while trying to register.

### Login page
![log page](https://www.dropbox.com/s/xykrq7raz8be1d3/login-page.png?raw=1)
<!-- ![log page](https://www.dropbox.com/s/xykrq7raz8be1d3/login-page.png?raw=1removeme) -->

The login form is the same with the errors and you need only to provide correct credentials.

### Dashboard page
![dashboard page](https://www.dropbox.com/s/ittl6kvm6qi1ziu/dashboard.png?raw=1)
<!-- ![dashboard page](https://www.dropbox.com/s/ittl6kvm6qi1ziu/dashboard.png?raw=1removeme) -->

The dashboard page includes all of the stories and you can search for particular one, sort them by likes or date posted.
They are also coordinated by query parameters which means that you can adjust your queries reload or send them to someone and everything will remain the same (it's not only visual). Also pagination is included: 

![pagination](https://www.dropbox.com/s/2oh3yl7gtghfbs4/dashboard-pagination.png?raw=1)
<!-- ![pagination](https://www.dropbox.com/s/2oh3yl7gtghfbs4/dashboard-pagination.png?raw=1removeme) -->

### Post details page
![details page](https://www.dropbox.com/s/jrlm6f20yonabds/details-page.png?raw=1)
<!-- ![details page](https://www.dropbox.com/s/jrlm6f20yonabds/details-page.png?raw=1removeme) -->

If you are the **owner** of the post you can edit/delete the whole post or delete any comment you like. 

If you are not the **owner** you are shown only the likes of the post and like button if you haven't liked it or dislike button otherwise. You can also comment the post, but you can only delete your comments nothing else.

If you aren't **authenticated** you can only view the description,likes and comments of the post.

At the moment non-logged users can only view the top three most liked posts details (all posts are actually available, but only if you already have the id) and they can only go to home/login/register pages, because others are protected with **route guards** which will automatically redirect to the login page. The route guards are made with higher order component which first checks if there is a user present from the react context.

# Tech Stack