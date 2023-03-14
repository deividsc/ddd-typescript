import IUserReadOnlyRepository from "../../../src/application/repositories/IUserReadOnlyRepository";
import IUserWriteOnlyRepository from "../../../src/application/repositories/IUserWriteOnlyRepository";
import User from "../../../src/domain/User";

export default class FakeRepository implements IUserReadOnlyRepository, IUserWriteOnlyRepository {
    public users = [
        {
            email: "test@test.com",
            id: "1234",
            name: "Test User",
            password: "pass",
            type: "email"
        },
        {
            email: "test2@test.com",
            id: "12345",
            name: "Test User2",
            password: "pass2",
            type: "email"
        }
    ];
    public async fetch(user: User): Promise<User> {
        const res = await this.users.find(x => x.email === user.email);
        if (!res) {
            return null as any;
        }

        if (res.password !== user.password) {
            throw new Error("Imvalid email or password");
        }

        user.id = res.id;
        user.name = res.name;

        return user;
    }
    public async add(user: User): Promise<User> {
        const max = 9999;
        const min = 1000;
        user.id = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

        this.users.push(user);

        return user;
    }
}