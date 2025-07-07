import express from 'express'
import Tour from '../models/tour.model'
import { authenticateToken } from '../middleware/auth'

const router = express.Router();

//Create new tour
router.post('/', authenticateToken, async (req, res)=>{
    const {title, isPublic, steps} = req.body;
})