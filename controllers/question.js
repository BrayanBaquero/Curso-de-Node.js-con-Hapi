'use strict'



const question=require('../models/index').questions

async function createQuestion(req,h){
    let result
    if(!req.state.user){
        return h.redirect('/login')
    }
    try {
       result=await question.create(req.payload,req.state.user) 
       console.log(`Pregunta creada con el ID${result}`)
    } catch (error) {
        console.error(`Ocurrio un error ${error}`)

        return h.view('ask',{
            title: 'crear pregunta',
            error: 'Problemas creando la pregunta'
        }).code (500).takeover()
    }

    return h.response(`Pregunta creada con el ID${result}`)
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