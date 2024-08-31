import { Router } from "express"
const userRoutes = Router()

import { CreateUser } from "./create"
import { AuthenticateUser } from "./authenticate"

const createUser = new CreateUser()
const authenticateUser = new AuthenticateUser()

userRoutes.post('/', createUser.execute)
userRoutes.post('/auth', authenticateUser.execute)

export { userRoutes }