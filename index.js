'use strinct'

const Hapi = require('@hapi/hapi')
const crumb=require('@hapi/crumb')
const handlebars = require('./lib/helpers')
const inert = require('@hapi/inert')
const path = require('path')
const vision = require('@hapi/vision')
const routes=require('./routes')
const site=require('./controllers/site')
const methods=require('./lib/methods')
const good=require('@hapi/good')
const goodConsole=require('@hapi/good-console')


const server = new Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  try {
    await server.register(inert)
    await server.register(vision)
    await server.register({
      plugin: good,
      options: {
        reporters:{
          console:[
            {
              module:goodConsole
            },
            'stdout'
          ]
        }
      }
    })

    await server.register({
      plugin: crumb,
      options:{
        cookieOptions:{
          isSecure:process.env.NODE_ENV === 'prod'
        }
      }
    })
    await server.register({
      plugin: require('./lib/api'),
      options:{
        prefix: 'api'
      }
    })

    server.method('setAnswerRight',methods.setAnswerRight)
    server.method('getLast',methods.getLast,{
      cache:{
        expiresIn:1000*60,
        generateTimeout:2000
      }
    })

    server.state('user',{
      ttl:1000*60*60*24*7,
      isSecure: process.env.NODE_ENV==='prod',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })
    
    server.ext('onPreResponse', site.fileNotFound)
    server.route(routes)
    await server.start()
    console.log('iniciado')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  server.log('info',`Servidor iniciado en : ${server.info.uri}}`)
}

process.on('unhandledRejection', error=>{
  server.log('UnhandledRejection',error)
})

process.on('unhandledException',error=>{
  server.log('unhandledException',error)
})

init()
