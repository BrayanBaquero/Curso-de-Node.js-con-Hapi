'user strict'

const firebase=require('firebase-admin')
const serviceAccount=require('../config/firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://cursoplatzinodejshapi-default-rtdb.firebaseio.com/'
})

const db=firebase.database()

const Users=require('./users')
const Questions=require('./questions')

module.exports={
    users:new Users(db),
    questions: new Questions(db)
}