'use strict'



const question=require('../models/index').questions

async function createQuestion(req,h){
    let result

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
    try {
        result=await question.answer(req.payload,req.state.user)
        console.log(`Respuesta creada: ${result}`)
    } catch (error) {
        console.error(error)
    }
    return h.redirect(`/question/${req.payload.id}`)
}

module.exports={
    createQuestion: createQuestion,
    answerQuestion:answerQuestion
}