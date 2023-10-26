require('dotenv').config()
const cors = require('cors')
const express = require('express')

const {
  createPost,
  readPosts,
  updatePost,
  deletePost,
  updateLike
} = require('../utils/pg.js')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/posts', (_, res, next) => {
  readPosts()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => next(error))
})

app.post('/posts', (req, res, next) => {
  const { titulo, url, descripcion } = req.body
  createPost({ titulo, url, descripcion })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => next(error))
})

app.put('/posts/:id', (req, res) => {
  updatePost(req.params.id, req.body)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.delete('/posts/:id', (req, res) => {
  deletePost(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.put('/posts/like/:id', (req, res) => {
  updateLike(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no existe' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
