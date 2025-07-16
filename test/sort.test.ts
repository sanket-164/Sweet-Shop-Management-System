import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/server';

interface Sweet {
    id: number;
    name: string;
    price: string;
    category: string;
    quantity: number;
}

describe('Search Sweets', () => {
    test('should return sweets with ascending order by name', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ orderBy: 'name', orderDirection: 'asc' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const names = response.body.map((sweet:Sweet) => sweet.name.toLowerCase());
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('should return sweets with descending order by name', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ orderBy: 'name', orderDirection: 'desc' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const names = response.body.map((sweet:Sweet) => sweet.name.toLowerCase());
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    test('should return sweets with ascending order by price', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ orderBy: 'price', orderDirection: 'asc' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const prices = response.body.map((sweet:Sweet) => parseInt(sweet.price));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('should return sweets with descending order by price', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ orderBy: 'price', orderDirection: 'desc' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const prices = response.body.map((sweet:Sweet) => parseInt(sweet.price));
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

    test('should return sweets with ascending order by quantity', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ orderBy: 'quantity', orderDirection: 'asc' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const quantities = response.body.map((sweet:Sweet) => sweet.quantity);
        const sortedQuantities = [...quantities].sort((a, b) => a - b);
        expect(quantities).toEqual(sortedQuantities);
    });

    test('should return sweets with descending order by quantity', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ orderBy: 'quantity', orderDirection: 'desc' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        const quantities = response.body.map((sweet:Sweet) => sweet.quantity);
        const sortedQuantities = [...quantities].sort((a, b) => b - a);
        expect(quantities).toEqual(sortedQuantities);
    });
});