  import "dotenv/config.js"
  import express from "express"
  import bcrypt from "bcrypt"
  import jwt from "jsonwebtoken"
  import cors from 'cors'
  import { connectDB } from "./connectDB.js"
  import User from "./models/user.model.js"
  import {authenticateToken} from './middleware/auth.js'

  const app = express()

  const port = process.env.PORT || 5000;
  const JWT_SECRET = process.env.JWT_SECRET;

  app.use(express.static("./public"))
  app.use(express.json())
  app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
  }))

  await connectDB()

  app.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body
      console.log('BODY:', req.body);
      const foundUser = await User.findOne({ username })
      if (foundUser)
        return res.status(400).json({ msg: "Username already exists" })
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({ username, password: hashedPassword })

      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        {
          expiresIn: "1d",
        }
      )
      res.status(201).json({ msg: "User registered successfully", token })
    } catch (err) {
      res.status(500).json({msg: 'Server error'});
    }
  })

  app.post('/login', async (req, res)=>{
      try {
          const {username, password} = req.body;
          const foundUser = await User.findOne({username});
          if(!foundUser) return res.status(401).json({msg: 'Invalid username or password'})
          const isMatch = await bcrypt.compare(password, foundUser.password)
          if(!isMatch) return res.status(401).json({msg: 'Invalid username or password'});
          const token = jwt.sign({id: foundUser._id, username: foundUser.username}, JWT_SECRET, {
              expiresIn: '1d',
          })
          return res.json({msg: 'Login successful', token});
      } catch (err) {
          console.log(err);
          res.status(500).json({msg: 'Server error'});
      }
  });

  app.listen(port, () =>
    console.log(`Project is listening at: http://localhost:${port}`)
  )
