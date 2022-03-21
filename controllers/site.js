'use strict'




function home (req, h)  {
    return h.view('index', {
      title: 'home',
      user: req.state.user
    })
}
function register(req, h)  {
  if(req.state.user){
    return h.redirect('/')
  }
    return h.view('register', {
      title: 'Registro',
      user: req.state.user
    })
}

function login(req, h)  {
  if(req.state.user){
    return h.redirect('/')
  }
  return h.view('login', {
    title: 'Login',
    user: req.state.user
  })
}

function notFound(req,h) {
  return h.view('404',{},{layout: 'error-layout'}).code(404)
}

function fileNotFound(req,h) {
  const response=req.response
  if(response.isBoom && response.output.statusCode===404){
    return h.view('404',{},{layout: 'error-layout'}).code(404)
  }

  return h.continue
  
}
module.exports={
    home: home,
    fileNotFound: fileNotFound,
    register:register,
    login: login,
    notFound: notFound
}