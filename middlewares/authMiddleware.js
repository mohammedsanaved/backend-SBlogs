import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next(); // Move on to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
