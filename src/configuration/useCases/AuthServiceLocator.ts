import IUserReadOnlyRepository from "@pbb/application/repositories/IUserReadOnlyRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../application/constants/types";
import SigninUseCase from "../../application/usercase/SigningUseCase";

@injectable()
export default class AuthServiceLocator {

    constructor(
        @inject(TYPES.IUserReadOnlyRepository) private readRepository: IUserReadOnlyRepository
    ) { }

    public GetSignInUseCase(): SigninUseCase {
        return new SigninUseCase(this.readRepository);
    }
}