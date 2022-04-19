import { Router } from 'express'
import * as controllers from '../../controllers/store'
import verifyAuthToken from '../../middleware/auth'

const routes = Router()

// api/store
routes.route('/ordercart/:id').get(verifyAuthToken, controllers.ordercart)
routes.route('/cartproduct').post(verifyAuthToken, controllers.cartproduct)

export default routes