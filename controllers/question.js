'use strict'


const {writeFile}=require('fs')
const {promisify}=require('util')
const {join}=require('path')
const question=require('../models/index').questions
const {v1: uuid}=require('uuid')
//const isBuffer=require('is-buffer')

const write=promisify(writeFile)

async function createQuestion(req,h){
    let result, filename, bufferImg
    if(!req.state.user){
        return h.redirect('/login')
    }
    try {
        bufferImg=Buffer.from(req.payload.image)
        console.log(req.payload.image)
        //bufferImg=req.payload.image
        if(Buffer.isBuffer(bufferImg)){
            filename=`${uuid()}.png`
            await write(join(__dirname,'..','public','uploads',filename),req.payload.image)
        }
       
       result=await question.create(req.payload,req.state.user,filename) 
       req.log('info', `Pregunta creada con el ID${result}`)
    } catch (error) {
        req.error('error', `Ocurrio un error ${error}`)
        return h.view('ask',{
            title: 'crear pregunta',
            error: 'Problemas creando la pregunta'
        }).code (500).takeover()
    }

    return h.redirect(`/question/${result}`)
}

async function answerQuestion(req,h) {
    let result
    if(!req.state.user){
        return h.redirect('/login')
    }
    try {
        result=await question.answer(req.payload,req.state.user)
        console.log(`Respuesta creada: ${result}`)
    } catch (error) {
        console.error(error)
    }
    return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight(req,h){
    let result
    if(!req.state.user){
        return h.redirect('/login')
    }
    try {
        result=await req.server.methods.setAnswerRight(req.params.questionId,req.params.answerId,req.state.user)
        console.log(result)
    } catch (error) {
        console.error(error)
    }

    return h.redirect(`/question/${req.params.questionId}`)
}
module.exports={
    createQuestion: createQuestion,
    answerQuestion:answerQuestion,
    setAnswerRight:setAnswerRight
}