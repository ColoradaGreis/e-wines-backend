// const express = require('express')
// const router = express.Router()
const server = require('express').Router()

// SDK de Mercado Pago
const mercadopago = require('mercadopago')

// middleware
// app.use(bodyParser.urlencoded({ extended: false }))

// Agrega credenciales
mercadopago.configure({
  /* access_token: process.env.ACCESS_TOKEN_MP */
  access_token: 'APP_USR-1978965847766511-101821-f5c0c5795533515cc77eeca8b797e140-1220528859'
})

// routes
// TODO back_urls MODIICAR
server.post('/', (req, res) => {
// Crea un objeto de preferencia
  const preference = {

    items: req.body.map(item => { return { ...item, currency_id: 'ARS' } }),
    back_urls: {
      success: 'https://e-wine-ashen.vercel.app',
      failure: 'https://e-wine-ashen.vercel.app',
      pending: 'https://e-wine-ashen.vercel.app'
    },
    notification_url: 'https://e-winespf.herokuapp.com/webhooks'
  }

  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.status(200).json({ data: response.body.init_point })
    }).catch(function (error) {
      console.log(error)
    })
})

module.exports = server
