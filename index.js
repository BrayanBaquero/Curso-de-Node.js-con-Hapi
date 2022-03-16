'use strinct'

const Hapi = require('Hapi')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

async function init () {
  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return 'Hola mundo!'
    }
  })

  try {
    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Error localizado en: ${server.info.uri}}`)
}
init()
