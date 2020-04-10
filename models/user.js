const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    age: {
        type: Number,
        min: 12
    }
})

userSchema.statics.findingUser = async (email, password) => {
        const user = await User.findOne({email})
        if(!user){
            throw  new Error('invalid Email')
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            throw new Error('invalid password')
        }

        return user
}

userSchema.methods.generateAuth = async function(){
    const token = await jwt.sign({_id: this._id.toString()}, 'web-server')
    await this.save()
    return token
}

userSchema.pre('save', async function(next) {

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User