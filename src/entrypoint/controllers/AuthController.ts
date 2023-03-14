import { TYPES } from "@pbb/application/constants/types"
import { IUserDto } from "@pbb/application/usercase/IUserDto"
import AuthServiceLocator from "@pbb/configuration/useCases/AuthServiceLocator"
import { inject } from "inversify"
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils"
import ISigningUseCase from "../../application/usercase/ISigningUseCase"
import * as express from "express"

@controller("/auth")
export default class AuthController implements interfaces.Controller {
    private readonly signInUseCase: ISigningUseCase

    constructor(@inject(TYPES.AuthServiceLocator) serviceLocator: AuthServiceLocator) {
        this.signInUseCase = serviceLocator.GetSignInUseCase()
    }

    @httpPost("/signin")
    public async signin(@request() req: express.Request, @response() res: express.Response) {
        const userDto: IUserDto = req.body
        return this.signInUseCase.signin(userDto)
            .then((foundUserDto: IUserDto) => res.status(200).send(foundUserDto))
            .catch((err: Error) => res.status(400).json({ error: err.message }))
    }
}