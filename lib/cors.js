// lib/cors.js
import Cors from "cors";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"], // Allow only specific methods
  origin: "*", // You can specify domains here instead of '*'
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };
