import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/server';

describe('Order Sweets', () => {
    test('should create an order with sweets', async () => {
        const response = await request(app)
            .post('/orders')
            .send({
                userId: 1,
                sweets: [
                    { sweetId: 1, quantity: 2 },
                    { sweetId: 2, quantity: 1 },
                    { sweetId: 3, quantity: 3 }
                ]
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    test('should return 400 for invalid order data', async () => {
        const response = await request(app)
            .post('/orders')
            .send({
                userId: 1,
                sweets: [
                    { sweetId: 1, quantity: -2 }, // Invalid quantity
                ]
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid quantity for sweet');
    });

    test('should return 404 for non-existent sweet', async () => {
        const response = await request(app)
            .post('/orders')
            .send({
                userId: 1,
                sweets: [
                    { sweetId: 999, quantity: 1 } // Non-existent sweet
                ]
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Sweet not found');
    });

    test('should return 404 for non-existent user', async () => {
        const response = await request(app)
            .post('/orders')
            .send({
                userId: 999, // Non-existent user
                sweets: [
                    { sweetId: 1, quantity: 2 }
                ]
            })
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('User not found');
    });

    test('should retrieve all orders for a user', async () => {
        const response = await request(app)
            .get('/orders/user/1')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 404 for non-existent user orders', async () => {
        const response = await request(app)
            .get('/orders/user/999')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('User not found');
    });
});