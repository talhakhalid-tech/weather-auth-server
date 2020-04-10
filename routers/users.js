const express  = require('express')
const User = require('../models/user.js')

const router = new express.Router()


router.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/users/login',async (req, res) => {
    try{
        const user = await User.findingUser(req.body.email, req.body.password)
        const token = await user.generateAuth()
        res.json({token})
    } catch (error) {
        res.status(400).json(error.message)
    }
})

module.exports = router