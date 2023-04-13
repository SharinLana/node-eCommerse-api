# E-Commerce API

> This is a backend of a typical e-commerce application that allows a user to authorize, view and select products, leave a product review, place an order.

### The goals of creating this application:

The main goals for me as a web developer were to improve my skills in working with:

- Node.js;
- Express.js;
- MongoDB/Mongoose;
- Postman;
- JsonWebToken;
- cookies (to store the user's token);
- BcryptJS;
- security packages;

### To view Postman docs in the browser, start the app on your computer:

- download the project and open it in a code editor;
- install the dependencies:

```
npm install
```

- run the app:

```
npm start
```

- use http://localhost:5100 in your browser to view the Postman docs

### Functionalities:

- protected routes for anauthorized users;
- registering (creating account) / login / logout options;
- editing user's profile data;
- editing user's password;
- adding / updating / deleting products (this actions available only for admin);
- uploading product images (this action available only for admin);
- creating / updating / deleting product reviews;
- calculating the average review rating for each product;
- creating / getting / updating user orders
