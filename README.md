# Smart Budget
- This is a web app designed to help visualize your spending through interacting with your transactions.


## Security
- LocalStorage is vulnerable to XSS, while cookies provide more security.


- JWT
	- Refresh Token 
		- The refresh token allows the user to get a new JSON Web Token for access without getting the user to sign in again.
	- Token
		- Is valid for a certain amount of time
		- TODO: Store in HTTPOnly cookies instead of local storage.

## Why not use the API that NextJS provides?
- While maintaining 1 project is simpler, many mature and large systems use a distributed system approach by having a frontend and backend as separate services. This allows the projects to run on different machines which increases performance!

## CSS Styling
- https://www.youtube.com/watch?v=N5wpD9Ov_To
- Not every component is a styled component because it makes it a lot harder to make changes
	- Instead use styled components with nesting by doing & .classname
	- using SASS styled syntax (package does not need to be installed)
- Seperate it when you can group it together

## Hooks
- Using hooks allows us to better organize our component logic into reusable functions!

## Known Issues and Weird things:
