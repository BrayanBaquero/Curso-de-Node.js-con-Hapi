'use strinct'

const Hapi = require('@hapi/hapi')
const handlebars = require('handlebars')
const inert = require('@hapi/inert')
const path = require('path')
const vision = require('@hapi/vision')
const routes=require('./routes')

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

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })
    
    await server.route(routes)
    await server.start()
    console.log('iniciado')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor iniciado en : ${server.info.uri}}`)
}
init()
