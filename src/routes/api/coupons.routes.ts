import { Router } from 'express'
import * as controllers from '../../controllers/coupons'
import verifyAuthToken from '../../middleware/auth'

const routes = Router()

// api/coupons
routes.route('/').get( controllers.index)
routes.route('/:id').get(controllers.show)
routes.route('/').post(verifyAuthToken, controllers.create)
routes.route('/:id').put(verifyAuthToken, controllers.update)
routes.route('/:id').delete(verifyAuthToken, controllers.destroy)

export default routes