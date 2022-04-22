import { Router } from 'express'
import * as controllers from '../../controllers/store'
import verifyAuthToken from '../../middleware/auth'

const routes = Router()

// api/store
routes.route('/ordercart/:id').get(verifyAuthToken, controllers.ordercart)
routes.route('/cartproduct').post(verifyAuthToken, controllers.cartproduct)
routes.route('/orderCartPost').post(verifyAuthToken, controllers.orderCartPost)
routes.route('/admin').get(verifyAuthToken, controllers.admin)
routes.route('/search').post(controllers.search)
routes.route('/orderproduct').post(verifyAuthToken, controllers.orderProduct)
routes.route('/filter').post(controllers.filter)

export default routes