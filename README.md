### Introduction:
 A social media app that user can share they thought with post and Profile with their infomation.
### Technologies Used: 
1. React    5. NPM (with a list of many package)
2. MongoDB  6. HTML5,CSS
3. Express  7. JavaScript
4. NodeJS   
### Getting Started: 
trello: https://trello.com/b/UvtlBRmY/mern-social-app
website deployed: https://kbook-user-site.onrender.com for front end
### Unsolved Problems:
- Need money for mongoDB and render.com to handle user request(use to be shut down because more than 100 user from Africa, Asia, US try to make request.)
1. Problem will come when I have new features.
### Future Enhancements: 
1. Search featture
2. live chat feature


### Application Technical Requirements/Deliverables
1. A functioning full-stack, single-page application hosted on render.com:
*  COMPLETE

2. Incorporate the technologies of the MERN-stack:
- MongoDB/Mongoose
- Express
- React
- Node
*  COMPLETE

3. Have a well-styled interactive front-end that communicates with the Express backend via AJAX.
* COMPLETE

4. Implement token-based authentication - "...a user can sign-up, log in & log out".
* COMPLETE

5. Implement authorization by restricting functionality to authenticated users.
* COMPLETE

6. Navigation should respond to the login status of the user.
* COMPLETE

7. One User data entity minimum, which will be used for Auth; other data entities can be added and related if desired but are not required.
* COMPLETE
8. Have a comprehensive feature-set.

Full CRUD distributed across all Data Entities
* COMPLETE
Or

One of the following features instead:

(Easy) - Consume a third-party API and display API data in components.
* SKIP
(Moderate) - Include an admin interface w/features.
* SKIP
(Hard) - Utilize multi-user, real-time communications (difficult and time consuming)
* COMPLETE(50%) if real-time is count at Live Chat bettween user

### Project Presentation

1. Demonstrate the application's authentication features by signing up a new user, logging out that user, then logging in with your preferred user.
2. Demonstrate your app's main features.
 - Authenticaion message for someone try to decode my token.
 - Data limit when fetching limit 4 post at once, load more to get 4 more.
 - C.R.U.D on posts.
 - C.R.U on users.
 - Special: update profile avatar that have the relationship with post's creator avatar, comment's avatar.
 - User experience testing:
   case.A: when in the posts route when click on user Avatar they will be navigate to profile routes.
   case.B: When in the user route when click on the Avatar of the current profile, the reload page will not happen. 
   case.B.1: For other avatar that not is the same with current user profile the page will be reload, to take them to other profile.
   case.C: refresh the page will run all the code again, so I wrote more code to get Data with these divide function:
   - getPosts(limit as 4)
   - getPostsByCreator(limit as 4)
   - getUser(to render Users profile)
   - getLocalUser(run accross the application to make sure the AppBar is always show the user that use application)
   * when you refresh the page: 2 or 3 out of 4 in those function will be call depend what location you at(/posts or /user/:id)

3. Share/discuss the following code (not line-by-line):

- The main/central Mongoose model
  * PostDetails.Model
- Your "favorite" Express controller method
  * updateUser in user.js
- Your "favorite" React component
  * Post
- The client-side routing
  * /auth
  * /posts
  * /user/:id
4. Share the experience by answering the following:

- What was your biggest challenge?
 * Logic ands previous function bettween routes, update every time that I have new feature.
- What are your key learnings/takeaways?
 * Front-end not to just make everything look nice and catchcy, It's also embrace user experience as well.
 * Data from the database has to be customize, only send the data that needed.
