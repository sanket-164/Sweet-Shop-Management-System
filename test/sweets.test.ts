import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import server from '../src/server';

describe('Sweets API Tests', () => {

    let newSweetId = 0;

    test('POST /sweets should create a new sweet', async () => {
        const newSweet = { name: 'Chocolate Bar', price: 10, category: 'Chocolate', quantity: 100 };
        const response = await request(server)
        .post('/sweets')
        .send(newSweet);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newSweet.name);
        expect(parseInt(response.body.price)).toBe(newSweet.price);
        expect(response.body.category).toBe(newSweet.category);
        expect(parseInt(response.body.quantity)).toBe(newSweet.quantity);

        newSweetId = response.body.id; // Store the ID for later tests
    });

    test('POST /sweets should return 400 for invalid data', async () => {
        const invalidSweet = { name: '', price: -5, category: 'Chocolate', quantity: -10 };
        const response = await request(server)
        .post('/sweets')
        .send(invalidSweet);

        expect(response.status).toBe(400);
    });

    test('POST /sweets should return 400 for missing fields', async () => {
        const incompleteSweet = { name: 'Chocolate Candy' }; // Missing price, category, and quantity
        const response = await request(server)
        .post('/sweets')
        .send(incompleteSweet);
        expect(response.status).toBe(400);
    });

    test('GET /sweets should return a list of sweets', async () => {
        const response = await request(server).get('/sweets');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /sweets/:id should return a specific sweet', async () => {
        const response = await request(server).get(`/sweets/${newSweetId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(newSweetId);
    });

    test('GET /sweets/:id should return 404 for non-existing sweet', async () => {
        const response = await request(server).get('/sweets/9999'); // Assuming 9999 does not exist
        expect(response.status).toBe(404);
    });

    test('PUT /sweets/:id should update a specific sweet', async () => {
        const updatedSweet = { name: 'Vanilla Chocolate', price: 2.0, category: 'Chocolate', quantity: 50 };
        const response = await request(server)
        .put(`/sweets/${newSweetId}`)
        .send(updatedSweet);
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedSweet.name);
        expect(parseInt(response.body.price)).toBe(updatedSweet.price);
        expect(response.body.category).toBe(updatedSweet.category);
        expect(parseInt(response.body.quantity)).toBe(updatedSweet.quantity);
    });

    test('PUT /sweets/:id should return 404 for non-existing sweet', async () => {
        const updatedSweet = { name: 'Non-Existent Sweet', price: 5, category: 'Candy', quantity: 20 };
        const response = await request(server)
        .put('/sweets/9999') // Assuming 9999 does not exist
        .send(updatedSweet);

        expect(response.status).toBe(404);
    });

    test('PUT /sweets/:id should return 400 for invalid data', async () => {
        const invalidSweet = { name: '', price: -5, category: 'Chocolate', quantity: -10 };
        const response = await request(server)
        .put(`/sweets/${newSweetId}`)
        .send(invalidSweet);

        expect(response.status).toBe(400);
    });

    test('DELETE /sweets/:id should delete a specific sweet', async () => {
        const response = await request(server).delete(`/sweets/${newSweetId}`);
        expect(response.status).toBe(204);
        expect(response.body).toEqual({}); // Expect no content on successful delete
    });

    test('DELETE /sweets/:id should return 404 for non-existing sweet', async () => {
        const response = await request(server).delete('/sweets/9999')
        expect(response.status).toBe(404);
    });
});