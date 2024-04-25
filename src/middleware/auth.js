import  jwt  from "jsonwebtoken";

export const auth = (req, res, next) => {
  let token = req.header("token");
  console.log(token);
  jwt.verify(token, "myNameIsSamar", async (err, decoded) => {
    if (err) {
      res.json({ message: "Invalid Token", err });
    } else {
      next();
    }
  });
};
