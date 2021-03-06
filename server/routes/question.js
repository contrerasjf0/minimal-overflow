import express from 'express'
import { required } from '../middleware'
import { question } from '../db-api'
import { handleError } from '../config'


const app = express.Router()


// /api/questions
app.get('/', async (req, res) => {
  try {
    const questions = await question.findAll()
    res.status(200).json(questions)
  } catch (error) {
    handleError(error, res)
  }
})

// /api/questions/:id
app.get('/:id', async (req, res) => {
  
  try {
    const q = await question.findById(req.params.id)
    res.status(200).json(q)
  } catch (error) {
    handleError(error, res)
  }

})

// POST /api/questions
app.post('/', required, (req, res) => {
  const question = req.body

  question._id = +new Date()
  question.user = req.user
  question.createdAt = new Date()
  question.answers = []
  questions.push(question)

  res.status(201).json(question)
})

app.post('/:id/answers', required, ( req, res) =>{
  const answer = req.body
  const q = req.question

  answer.createdAt = new Date()
  answer.user = req.user
  q.answers.push(answer)
  res.status(201).json(answer)
})

export default app