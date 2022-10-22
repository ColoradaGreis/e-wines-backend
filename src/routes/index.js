const { Router } = require('express')

// ALL ROUTES
const productRouter = require('./product.js')
const userRouter = require('./users')
const publicationRoutes = require('./publicationRoutes.js')
const favoritesRouter = require('./favorites')
const questionsRouter = require('./question')
const reviewsRouter = require('./reviews')
const stripeRoutes = require('./stripeRoutes')
const buyRoutes = require('./buyRoutes')

const router = Router()

// LOAD EACH ROUTES IN A ROUTE
router.get('/', (req, res) => {
  res.status(200).json([])
})
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/publications', publicationRoutes)
router.use('/favorites', favoritesRouter)
router.use('/questions', questionsRouter)
router.use('/reviews', reviewsRouter)

router.use('/stripe', stripeRoutes)
router.use('/buys', buyRoutes)

module.exports = router
