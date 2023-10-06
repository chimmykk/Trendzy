
// middleware.js
export { default } from "next-auth/middleware";

// Optionally, configure which pages to protect
export const config = { matcher: ["/home"] };

// // Add a console log to check if the middleware is triggered
// export default function (req, res, next) {
//   console.log("Middleware triggered");
//   return next();
// }
