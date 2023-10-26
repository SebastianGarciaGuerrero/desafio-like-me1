require('dotenv').config()
const cors = require('cors')
const express = require('express')

const {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost,
  updateLike
} = require('../utils/crud')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', (_, res) => {
  const likeme = readPosts()
  res.status(200).json(likeme)
})

app.get('/posts/:id', (req, res) => {
  const { id } = req.params
  const post = readPost(id)
  res.status(200).json(post)
})

app.post('/posts', (req, res) => {
  const { titulo, url, descripcion } = req.body
  const likeme = createPost({ titulo, url, descripcion })
  res.status(200).json(likeme)
})

app.put('/posts/:id', (req, res) => {
  const { id } = req.params
  const { titulo, url, descripcion } = req.body
  const likeme = updatePost(id, { titulo, url, descripcion })
  res.status(200).json(likeme)
})

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params
  const likeme = deletePost(id)
  res.status(200).json(likeme)
})

app.put('/posts/like/:id', (req, res) => {
  const postId = req.params.id
  const newLikes = req.body.newLikes
  updateLike(postId, newLikes)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no existe' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
