const express = require('express')
const menuData = require('./menu-items.json')
const cors = require('cors')
const fs = require('fs') // file system from node

const app = express() // giving express the name of app
app.use(cors())
app.use(express.json())

app.listen(4000, () => {
  console.log('Our API is listening on port 4000 - YES is working')
})

const handleWriteFile = () => {
  const jsonMenuData = JSON.stringify(menuData)
  fs.writeFile('menu-items.json', jsonMenuData, err => console.error(err))
}

app.get('/', (req, res) => {
  res.send(menuData)
})

app.post('/', (req, res) => {
  if (req.body.title && req.body.description) {
    menuData.push(req.body) // returns length of array

    handleWriteFile()
    res.send(menuData)
  } else {
    res.send('no body found or wrong body info')
  }
})

app.put('/', (req, res) => {
  if (req.query.title) {
    const itemFound = menuData.find(eachItem => (eachItem.title ? eachItem.title === req.query.title : undefined))

    // 1.1 find index to item found
    const indexOfItem = menuData.indexOf(itemFound)

    // 2. update that item with the new info
    menuData[indexOfItem] = req.body

    handleWriteFile()
    res.send(menuData)
  } else {
    res.send('no query params found')
  }
})

app.delete('/', (req, res) => {
  const itemFound = menuData.find(x => x.title === req.query.title)
  const indexOfItem = menuData.indexOf(itemFound)

  menuData.splice(indexOfItem, 1)

  handleWriteFile()
  res.send(menuData)
})