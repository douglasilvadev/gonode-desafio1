const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const middleIdade = (req, res, next) => {
  const { idade } = req.query

  if (!idade) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render(`idade`)
})

app.get('/major', middleIdade, (req, res) => {
  const { idade } = req.query

  return res.render('major', { idade })
})

app.get('/minor', middleIdade, (req, res) => {
  const { idade } = req.query

  return res.render('minor', { idade })
})

app.get('/error', (req, res) => {
  const { idade } = req.query
  console.log(`
    IDADE: ${idade}
    `)
  return res.render('error')
})

app.post('/check', (req, res) => {
  const { idade } = req.body

  if (idade >= 18) {
    return res.redirect(`/major?idade=${idade}`)
  }
  if (idade >= 0 && idade < 18) {
    return res.redirect(`/minor?idade=${idade}`)
  }
  return res.redirect(`/error?idade=${idade}`)
})

app.listen(3000)
