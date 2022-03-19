'use strict'
const bcrypt=require('bcrypt')

class Users{
    constructor(db){
        this.db=db
        this.ref=this.db.ref('/')
        this.collection=this.ref.child('users')
    }

    async create(data){
        const user ={...data}
        user.password=await this.constructor.encrypt(user.password)
        const newUser=this.collection.push(user)

        return newUser.key
    }

    static async encrypt(password){
        const saltRounds=10
        const hashedPassword=await bcrypt.hash(password,saltRounds)
        return hashedPassword
    }
}

module.exports=Users