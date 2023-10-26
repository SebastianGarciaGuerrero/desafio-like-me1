require('dotenv').config()
const { Pool } = require('pg')
const { v4: uuidv4 } = require('uuid')

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const genericSqlQuery = (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch(({ code, message }) => ({ code, message }))

const createPost = async ({ titulo, url: img, descripcion }) => {
  const query = 'INSERT INTO posts(id, titulo, img, descripcion) VALUES ($1, $2, $3, $4) RETURNING *;'
  const values = [uuidv4(), titulo, img, descripcion]
  return await genericSqlQuery(query, values)
}

const readPosts = async () => await genericSqlQuery('select * from posts;')

const readPost = async (id) => genericSqlQuery('select * from likeme where id = $1;', [id])

createPost({
  titulo: 'hola',
  url: 'aquiesta',
  descripcion: 'un gatito lindo'
})
  .then(console.log)
  .catch(console.error)

module.exports = {
  readPosts,
  readPost,
  createPost
}
