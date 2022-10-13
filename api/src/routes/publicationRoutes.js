const { Router } = require('express')
const { getPublicationsDb, createPublication, getOnePublication, bannedPublication } = require('../controllers')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const publications = await getPublicationsDb()

    if (!publications.length) return res.status(404).json('No hay publicaciones guardadas en la Base de Datos!')

    return res.status(200).json(publications)
  } catch (error) {
    res.status(404).json(error.message)
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const pb = await getOnePublication(id)

    if (!pb) return res.status(404).json(`Publicacion con el ID: ${id} no encontrada!`)

    res.status(200).json(pb)
  } catch (error) {
    res.status(404).json(error.message)
  }
})

router.post('/', async (req, res) => {
  const { name, price, count, image, description } = req.body

  if (!name) return res.status(400).json('Falta la propiedad nombre!')
  if (!price) return res.status(400).json('Falta la propiedad precio!')
  if (!count) return res.status(400).json('Falta la propiedad stock!')
  if (!image) return res.status(400).json('Falta la imagen de la publicacion!')
  if (!description) return res.status(400).json('Falta la propiedad descripcion!')

  try {
    const newPublication = await createPublication(name, price, count, image, description)

    res.send(newPublication)
  } catch (error) {
    res.status(404).json(error.message)
  }
}
)

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { banned } = req.query

  try {
    const pbBanned = await bannedPublication(id, banned)
    return res.status(200).json(pbBanned)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
module.exports = router
