import User from "../../domain/User";

export default interface IUserWriteOnlyRepository {
    add(user: User): Promise<User>
}