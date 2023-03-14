import { IUserDto } from "./IUserDto";

export default interface ISigningUseCase {
    signin(userDto: IUserDto): Promise<IUserDto >
}