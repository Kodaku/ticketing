import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
    var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51JhoyoI8uxOYxrSzNy0N8SM00QnSmGw8dKLqgjCmExJ36n3CVX8a7Sv7vcMF0FDQKcR4fQM9pccEVqB395m54vMn00cLn1B5sv';

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = (id?: string) => {
    //Build a JWT payload
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'mario@bros.com',
    };
    //Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //Build the session object {jwt: my_jwt}
    const session = { jwt: token };

    //Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
}