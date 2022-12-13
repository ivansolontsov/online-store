import Admin from "./page/Admin"
import Auth from "./page/Auth"
import Cart from "./page/Cart"
import Product from "./page/Product"
import Shop from "./page/Shop"
import { ADMIN_ROUTE, CART_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Shop
    },
    {
        path: SIGNIN_ROUTE,
        Component: Auth
    },
    {
        path: SIGNUP_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
]