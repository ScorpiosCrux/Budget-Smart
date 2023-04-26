# Budget Smart

Budget Smart is an app that allows you to interact with your spending more often which allows you to see exactly what you're spending your money on. The app allows you to import a CSV file that you can download from your bank, import it, and sort the transactions into categories.

## 💻 Tech Stack

The technologies that I decided to use are

### `Express`

Express is used for the backend API to handle requests. I choose Express because it is a super popular library that is commonly used in the industry. I decided against using NextJS's built in API because of distributed computing. Instead of a single machine handling all the work, separating the backend and frontend allows us to share the CPU usage.

### `NextJS`

I decided to use NextJS because it allows server sided rendering and improved SEO which leads to higher page rank! I decided not to use NextJS's built in API because while maintaining 1 project is simpler, many mature and large systems use a distributed system approach by having a frontend and backend as separate services. This allows the projects to run on different machines which increases performance!

### `MongoDB`

MongoDB is a NoSQL database that is great for development as it allows me to have flexible schemas. It allows me to scale my database horizontally across multiple servers through sharding. In SQL databases, we organize based on tables and the computation to join tables can become very expensive, but with NoSQL databases, data that is accessed together should be stored together.

### `JWT Auth`

Since the backend API and frontend are separate entities, I used JSON Web Tokens to authenticate the user. It can verify that the JWT is authentic since inside the token, it has the user id and we can verify that no one has tampered with the token by checking the signature with our secret. We can also expire the token after a period of time, which means if someone steals the token, that token can't make changes to the user forever. Finally, JWT is awesome because we can store their JWTs inside a database and the user and revoke their refresh tokens if they decide to!

### `Styled Components`

Styled Components allow me to turn CSS into Components as well! Instead of having CSS styles exist as their own file, we create components from them. This also means that I can conditionally render styles by passing a prop to the styled component.

### `TypeScript`

I used typescript because after developing with vanilla JavaScript, I realized that I could develop a lot faster with auto-complete. Know exactly what type of variable is passed around speeds up the process of debugging.

### `React`

I use React because it allows me to write reusable code. It also has great features like conditional rendering, contexts, hooks, routing, etc. One of the best features of React is that you can create custom hooks which separates the logic from the html. Custom hooks also allow you to reuse that logic, instead of copying and pasting it.

## 📸 Progress Pictures

<img src="https://gitlab.tylerchen.ca/tylerchen/smart-budget/-/raw/main/images/sort.png">
<img src="https://gitlab.tylerchen.ca/tylerchen/smart-budget/-/raw/main/images/drag.png">
<img src="https://gitlab.tylerchen.ca/tylerchen/smart-budget/-/raw/main/images/modal.png">
<img src="https://gitlab.tylerchen.ca/tylerchen/smart-budget/-/raw/main/images/context-menu.png">

## Database Considerations

- Storing only what is necessary
  - The way I've designed what to store into the database are only essential attributes. For example, attributes that are very simple to calculate are simply left for the client to calculate.

## 🔒 Security Considerations

### Storing data in the browser [source](https://stackoverflow.com/questions/3220660/local-storage-vs-cookies)

- Local-storage
  - Local-storage is vulnerable to XSS. The data is stored as simple key-value pairs and the data is accessible from all pages. The data persists even after the browser closes. Usually used by the browser.
- Session Storage
  - Same as local storage, but is local to one URL and one browser sessions. Thus, data deletes after the browser is closed.
- Cookies

  - These are usually used when communicating to the server. The `HttpOnly` flag makes the cookie non accessible by JavaScript. The `Secure` flag ensures that the cookie is only sent over HTTPS (encrypted).
  - Vulnerability: Cookies are vulnerable to cross-site request forgery (CSRF) attacks. This is when something malicious does unwanted actions on a trusted site where the user is currently authenticated.
  - What's stored here:
    - JWTs
      - Refresh tokens which allows the user to get a new API token without getting the user to sign in again.
      - API Tokens which are valid for a short period of time.

- JWT
  - Refresh Token
    - The refresh token allows the user to get a new JSON Web Token for access without getting the user to sign in again.
    - I use refresh token rotation which overwrites the old refresh token with a new one.
  - Token
    - Is valid for a certain amount of time
    - TODO: Store in HTTPOnly cookies instead of local storage.

### Passport

- All refresh tokens are stored in the database which allows us to revoke a logged in session when the user decides so.

## 🧭 Project Structure

### Front End:

- CSS Styling
  - https://www.youtube.com/watch?v=N5wpD9Ov_To
  - Not every component is a styled component because it makes it a lot harder to make changes
    - Instead use styled components with nesting by doing & .className
    - using SASS styled syntax (package does not need to be installed)
  - Separate it when you can group it together
- Hooks
  - Using hooks allows us to better organize our component logic into reusable functions!

to be continued...

## 📝 Documentation

### JSDoc

- All documentation is done with JSDoc, this provides the developer with comments about the code they are using.

## Running the code

`npm install` to install the packages

`npm run dev` to run the development version

You need .env files for both the frontend and backend.

## Continuous Integration and Deployment

### Front-End
- Docker is used to run the project on port 5051.
  - `docker build -t test .`
    - `-t` - tag
    - `.` current directory (with the Dockerfile)


### Back-End



## Todo

- There are `TODO:` tags where I am planning to change.
