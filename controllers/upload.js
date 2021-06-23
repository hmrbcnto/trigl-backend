const uploadRouter = require('express').Router()
const imageProcessing = require('../utils/imgProc')


uploadRouter.post('/', async (req, res) => {
    console.log(req.body)
})

module.exports = uploadRouter