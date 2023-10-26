const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const getLikeme = () => JSON.parse(fs.readFileSync('./database/posts.json', 'utf-8'))

const setLikeme = (likeme) => fs.writeFileSync('./database/posts.json', JSON.stringify(likeme))

const createPost = (post) => {
  const likeme = getLikeme()
  likeme.push({ id: uuidv4(), ...post })
  setLikeme(likeme)
  return likeme
}

const readPosts = () => getLikeme()

const readPost = (id) => getLikeme().find((c) => c.id === id)

const updatePost = (id, cancion) => {
  const likeme = getLikeme()
  const index = likeme.findIndex((c) => c.id === id)
  likeme[index] = { id, ...cancion }
  setLikeme(likeme)
  return likeme
}

const deletePost = (id) => {
  const likeme = getLikeme()
  const index = likeme.findIndex((c) => c.id === id)
  likeme.splice(index, 1)
  setLikeme(likeme)
  return likeme
}

const updateLike = (id, newLikes) => {
  const likeme = getLikeme()
  const post = likeme.find((c) => c.id === id)
  if (post) {
    post.likes = newLikes
    setLikeme(likeme)
  }
  return likeme
}

module.exports = {
  createPost,
  readPosts,
  readPost,
  updatePost,
  deletePost,
  updateLike
}
