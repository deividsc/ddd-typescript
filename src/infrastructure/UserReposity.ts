import { injectable } from "inversify";
import IUserReadOnlyRepository from "../application/repositories/IUserReadOnlyRepository";
import User from "../domain/User";

@injectable()
export default class UserRepository implements IUserReadOnlyRepository {

    public async fetch(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}