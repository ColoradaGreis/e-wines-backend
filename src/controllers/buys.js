const { Buy, BuyItem, Publication } = require('../db')

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
    const dbResult = await Buy.findAll({
      where: {
        userId
      }
    })
    dbResult?.forEach(b => {
      resultParsed.push({
        buyId: b.dataValues.id,
        currency: b.dataValues.currency,
        paymentMethod: b.dataValues.paymentMethod,
        totalAmount: b.dataValues.totalAmount,
        userId: b.dataValues.userId,
        createdAt: b.dataValues.createdAt
      })
    })
    return resultParsed
  } catch (error) {
    return new Error('Error al buscar todas las compras de un usuario')
  }
}

const getSalesByUser = async (id) => {
  try {
    const buyItems = await BuyItem.findAll({
      include: {
        model: Publication,
        where: {
          userId: id
        }
      }
    })
    const resultParsed = []
    buyItems?.forEach(async (item) => {
      const b = await Buy.findByPk(item.dataValues.buyId)
      resultParsed.push({
        buyId: b.dataValues.id,
        currency: b.dataValues.currency,
        paymentMethod: b.dataValues.paymentMethod,
        totalAmount: b.dataValues.totalAmount,
        userId: b.dataValues.userId,
        createdAt: b.dataValues.createdAt
      })
    })
    console.log(resultParsed)
    return resultParsed
  } catch (error) {
    return new Error('Error al buscar todas las ventas de un usuario')
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
  getBuysByProducts,
  getSalesByUser
}
