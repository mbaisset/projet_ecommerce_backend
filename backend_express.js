const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express()
const port = 3005
const db = require('./db/DbUtils')
const session = require('express-session')


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 } }))

const cors = require('cors')
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }

))


app.use(express.json())


app.listen(port, () => {
  console.log(`Backend ecommerce listening on port ${port}`)
})

app.get('/get-products', (req, res) => {

  if (!req.session.data) {
    console.log("******* In req.session.data null")
    req.session.data = uuidv4()
    req.session.nbviews = 1
    console.log("******* Session ID: ", req.sessionID)
    console.log("******* Session user: ", req.session.user)
    console.log("******* Session information: ", req.session)
  }
  else {
    console.log("******* In req.session.data with value")
    console.log("******* Session ID: ", req.sessionID)
    console.log("******* Session user: ", req.session.user)
    console.log("******* Session information: ", req.session)
  }


  db.dbGetAllProducts(function (error, results, fields) {
    if (error) {
      console.log(error)
    }
    res.json(results)
  })

})

app.get('/get-product-detail/:id', (req, res) => {
  console.log("********* - get-product cookies", req.session.id)
  const id = parseFloat(req.params["id"])
  db.dbGetProductDetail(id, function (error, results, fields) {
    if (error) {
      console.log(error)
    }
    res.json(results[0])
  })
})

app.get('/', (req, res) => {
  console.log("hello")
  res.json('Hello World!')
})

app.post('/add-new-product', (req, res) => {
  db.dbAddNewProduct(req.body,
    function (error, results, field) {
      if (error) {
        console.log(error)
      }
      res.json(results)
    })
})


app.post('/login', (req, res) => {
  db.dbCheckLogin(req.body,
    function (error, results, field) {
      if (error) {
        console.log(error)
      }
      console.log("Login: ", results)
      console.log("Login length: ", results.length)
      if (results.length > 0) {
        res.json(results[0])
      } else {
        res.status(401).json({ error: "Error in login/password" })
      }
    })
})

app.post('/modify-product', (req, res) => {
  db.dbModifyProduct(req.body,
    function (error, results, field) {
      if (error) {
        console.log(error)
      }
      res.json(results)
    })
})

app.post('/delete-product', (req, res) => {
  const id = req.body["id"]
  console.log("id: ", id)
  db.dbDeleteProduct(id,
    function (error, results, field) {
      if (error) {
        console.log(error)
      }
      console.log(results)
      res.json(results)
    })
})