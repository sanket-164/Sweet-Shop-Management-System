import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import server from '../src/server';

describe('Authentication', () => {
    const user = {
        name: 'testuser',
        password: 'password123',
        email: `test${new Date().getTime()}@gmail.com`
    }

    test('should register a new user with valid data', async () => {
        const res = await request(server).post('/auth/register').send(user);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(user.name);
        expect(res.body.email).toBe(user.email);
    });

    test('should not register a user with missing fields', async () => {
        const res = await request(server).post('/auth/register').send({ email: user.email, password: user.password });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("All fields are required");
    });

    test('should not register a user that already exists', async () => {
        const res = await request(server).post('/auth/register').send(user);
        expect(res.status).toBe(409);
        expect(res.body.message).toBe("User already exists");
    });

    test('should login with valid credentials', async () => {
        const res = await request(server).post('/auth/login').send(user);
        expect(res.status).toBe(200);
    });

    test('should not login with invalid credentials', async () => {
        const res = await request(server).post('/auth/login').send({ email: user.email, password: 'password' });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
    });
});