'use strict'

const axios = require('axios')

const getAllRegistro = async (req, res, next) => {
  const _id = req.query.id ? req.query.id : ''

  await axios.get(`http://5d52bcb73432e70014e6bc2c.mockapi.io/spc/registro/${_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    return res.status(200).send({ data: response.data })
  })
  .catch((error) => {
    return res.status(401).send({ data: {} })
  })
  next()
}

module.exports = {
  getAllRegistro
}