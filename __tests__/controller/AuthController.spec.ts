import "reflect-metadata"
import "mocha";
import chai from "chai";
import { it } from "mocha";
import sinon, { SinonSandbox } from "sinon";
import sinonChai from "sinon-chai";
import AuthController from "../../src/entrypoint/controllers/AuthController";
import AuthServiceLocator from "../../src/configuration/useCases/AuthServiceLocator";
import { mockRequest, mockResponse } from "./helpers/helpers";
import FakeRepository from "./helpers/FakeRepository";

const { expect } = chai;

chai.use(sinonChai)

describe("AuthController", () => {
    let sut: AuthController;
    let sandbox: SinonSandbox;
    let serviceLocator: AuthServiceLocator;


    const user = {
        email: "test@test.com",
        id: "1234",
        name: "test",
        password: "pass",
        type: "email",
    };

    const req: any = mockRequest(user);
    const res: any = mockResponse();

    beforeEach(() => {
        let fakeRepository = new FakeRepository();
        serviceLocator = new AuthServiceLocator(fakeRepository);
        sandbox = sinon.createSandbox();

        sut = new AuthController(serviceLocator);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("sign", () => {
        it("should return 400 on empty request", async () => {
            sandbox.spy(res, "status");
            sandbox.spy(res, "json");

            const emptyReq: any = { body: {} };
            await sut.signin(emptyReq, res);

            expect(res.status).to.have.been.calledWith(400);
        });

        it("should return 200 abd a user", async () => {
            sandbox.spy(res, "status");
            sandbox.spy(res, "json");

            await sut.signin(req, res);

            expect(res.status).to.have.been.calledWith(200);
        });
    });
});