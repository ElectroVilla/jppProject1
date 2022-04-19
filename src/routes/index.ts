import express from 'express'
import usersRoutes from './api/users.routes'
import brandsRoutes from './api/brands.routes'
import couponsRoutes from './api/coupons.routes'
import imagesRoutes from './api/images.routes'
import ordersRoutes from './api/orders.routes'
import productsRoutes from './api/products.routes'
import reviewsRoutes from './api/reviews.routes'
import categoriesRoutes from './api/categories.routes'
import carouselRoutes from './api/carousels.routes'
import cItemsRoutes from './api/cart_items.routes'
import branchesRoutes from './api/branches.routes'
import storeRoutes from './api/store.routes'

const routes = express.Router()

routes.use('/users', usersRoutes)
routes.use('/brands', brandsRoutes)
routes.use('/coupons', couponsRoutes)
routes.use('/images', imagesRoutes)
routes.use('/orders', ordersRoutes)
routes.use('/products', productsRoutes)
routes.use('/reviews', reviewsRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/carousels', carouselRoutes)
routes.use('/citems', cItemsRoutes)
routes.use('/branches', branchesRoutes)
routes.use('/store', storeRoutes)

export default routes
