import { Router } from 'express'
import * as controllers from '../../controllers/products'
import verifyAuthToken from '../../middleware/auth'

const routes = Router()

// api/products
routes.route('/').get( controllers.index)
routes.route('/new').get(controllers.getnew)
routes.route('/featured').get(controllers.featured)
routes.route('/:id').get(controllers.show)
routes.route('/').post(verifyAuthToken, controllers.create)
routes.route('/:id').put(verifyAuthToken, controllers.update)
routes.route('/:id').delete(verifyAuthToken, controllers.destroy)
routes.route('/images/:id').get(controllers.images)
routes.route('/reviews/:id').get(controllers.reviews)
routes.route('/full/:id').get(controllers.full)

export default routes