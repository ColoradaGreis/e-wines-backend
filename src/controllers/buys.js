const { Buy, BuyItem, Publication, User, Delivery } = require('../db')

const getAllBuy = async () => {
  const resultParsed = []
  try {
    const dbResult = await Buy.findAll()
    console.log(dbResult)
    dbResult?.forEach(b => {
      resultParsed.push({
        buyId: b.dataValues.id,
        currency: b.dataValues.currency,
        paymentMethod: b.dataValues.paymentMethod,
        totalAmount: b.dataValues.totalAmount,
        userId: b.dataValues.userId,
        createdAt: b.createdAt
      })
    })
    console.log('resultados parseados', resultParsed)

    return resultParsed
  } catch (error) {
    return new Error(error.message)
  }
}
const getBuyById = async (id) => {
  try {
    const dbResult = await Buy.findByPk(id)
    const resultParsed = {
      buyId: dbResult.dataValues.id,
      currency: dbResult.dataValues.currency,
      paymentMethod: dbResult.dataValues.paymentMethod,
      totalAmount: dbResult.dataValues.totalAmount,
      userId: dbResult.dataValues.userId,
      createAt: dbResult.dataValues.createdAt
    }

    return resultParsed
  } catch (error) {
    return new Error('Error al buscar una compra por Id')
  }
}
const getBuysByUser = async (userId) => {
  const resultParsed = []
  try {
    const dbResult = await Buy.findAll(
      {
        where: {
          userId
        },
        include:
      [{
        model: Delivery
      }, {
        model: User
      }]
      }
    )
    dbResult?.forEach(b => {
      resultParsed.push({
        buyId: b.dataValues.id,
        currency: b.dataValues.currency,
        paymentMethod: b.dataValues.paymentMethod,
        totalAmount: b.dataValues.totalAmount,
        userId: b.dataValues.userId,
        createdAt: b.dataValues.createdAt,
        status: b.dataValues.delivery.status,
        deliveryId: b.dataValues.delivery.id
      })
    })
    return resultParsed.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1
      if (a.createdAt > b.createdAt) return -1
      return 0
    })
  } catch (error) {
    return new Error('Error al buscar todas las compras de un usuario')
  }
}

const getBuysByPublication = async (publicationId) => {
  const resultParsed = []
  try {
    const dbResult = await Buy.findAll({
      include: [
        {
          model: BuyItem,
          where: {
            publicationId
          }
        }
      ]
    })
    console.log('🚀 ~ file: buys.js ~ line 27 ~ getBuyById ~ dbResult', dbResult)
    dbResult?.forEach(b => {
      resultParsed.push({
        buyId: b.dataValues.id,
        currency: b.dataValues.currency,
        paymentMethod: b.dataValues.paymentMethod,
        totalAmount: b.dataValues.totalAmount,
        userId: b.dataValues.userId
      })
    })
    console.log('🚀 ~ file: buys.js ~ line 35 ~ getBuyById ~ P', resultParsed)

    return resultParsed
  } catch (error) {
    return new Error(error.message)
  }
}
const getBuysByProducts = async (productId) => {
  try {
    const BuyByProduct = await Buy.findAll({
      include: [
        {
          model: BuyItem,
          include: [{
            model: Publication,
            where: {
              productId
            }
          }]
        }
      ]
    })
    return BuyByProduct
  } catch (error) {

  }
}
module.exports = {
  getAllBuy,
  getBuyById,
  getBuysByUser,
  getBuysByPublication,
  getBuysByProducts
}
