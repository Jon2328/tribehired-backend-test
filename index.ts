import express from 'express';
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/posts', require('./routes/posts'))
app.use('/search', require('./routes/search'))

app.listen(port, () => {
  console.log('server started')
})