import { userModel } from "../../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken" ;
/**
 * find() => []
 * findOne() => object | null
 * findById()
 */
const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.json({
      message: "user already exists",
    });
  } else {
    const hash = bcrypt.hashSync(password, 8);
    await userModel.insertMany({ name, email, password: hash });
    res.json({ message: "success" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {

    let TOKEN  = jwt.sign({id: user.id, name: user.name }, 'myNameIsSamar')
    res.json({ message: "login with token" , TOKEN });
  } else {
    res.json({ message: "user not found or password in correct" });
  }
};

export { signUp, signIn };
