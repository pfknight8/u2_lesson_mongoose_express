const express = require ('express')
const cors = require('cors')
const logger = require('morgan')
const PORT = process.env.PORT || 3001
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

const { Product, Brand } = require('./models')

app.get('/', (req, res) => {
  res.send('This is root!')
})

// server.js
app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.json(product)
  } catch (err) {
    console.log(err)
    res.send('Product not found.')
  }
})

app.get('/brands', async (req, res) => {
  const brands = await Brand.find({})
  res.send(brands)
})

app.get('/brands/:id', async (req, res) => {
  try {
    const { id } =req.params
    const brand = await Brand.findById(id)
    res.json(brand)
  } catch(err) {
    console.log(err)
    res.send('Brand not known!')
  }
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})