import express from 'express'
import UserRoute from './UserRoute.js'
import ProductRoute from './ProductRoute.js'
import AuthRoute from './AuthRoute.js'

const router = express.Router()

router.use(
  '/', 
  ProductRoute,
  UserRoute,
  AuthRoute
)

export default router
