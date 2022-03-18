'use strict'
const site=require('./controllers/site')
const user=require('./controllers/user')

module.exports=[
  {
    method: 'GET',
    path: '/',
    handler: site.home
  },{
    method: 'GET',
    path: '/register',
    handler: site.register
  },{
    path: '/createuser',
    method: 'POST',
    handler: user.createUser
  },{
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory:{
              path:'.',
              index:['index.html']
          }

      }
  } 
]