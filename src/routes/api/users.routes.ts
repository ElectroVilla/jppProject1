import { Router } from 'express'
import * as controllers from '../../controllers/users'
import verifyAuthToken from '../../middleware/auth'

const routes = Router()

// api/users
routes.route('/').get( controllers.index)
routes.route('/:id').get(verifyAuthToken, controllers.show)
routes.route('/').post(controllers.create)
routes.route('/:id').put(verifyAuthToken, controllers.update)
routes.route('/:id').delete(verifyAuthToken, controllers.destroy)
// authentication
routes.route('/login').post(controllers.authenticate)
routes.route('/pw/:id').put(verifyAuthToken, controllers.updatePassword)

export default routes