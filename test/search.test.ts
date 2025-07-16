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

const minPrice = 10;
const maxPrice = 20;

describe('Search Sweets', () => {
    test('should return all sweets when no query is provided', async () => {
        const response = await request(app).get('/sweets/search');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    
    test('should return sweets matching the name', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ name: 'chocolate' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((sweet:Sweet) => {
            expect(sweet.name.toLowerCase()).toContain('chocolate');
        });
    });

    test('should return sweets matching the category', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ category: 'chocolate' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((sweet:Sweet) => {
            expect(sweet.category.toLowerCase()).toContain('chocolate');
        });
    });

    test('should return sweets with price greater than or equal ' + minPrice, async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ minPrice: minPrice });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((sweet:Sweet) => {
            expect(parseInt(sweet.price)).toBeGreaterThanOrEqual(minPrice);
        });
    });

    test('should return sweets with price less than or equal ' + maxPrice , async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ maxPrice: maxPrice });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((sweet:Sweet) => {
            expect(parseInt(sweet.price)).toBeLessThanOrEqual(maxPrice);
        });
    });

    test('should return sweets within the specified price range', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ minPrice: minPrice, maxPrice: maxPrice });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((sweet:Sweet) => {
            expect(parseInt(sweet.price)).toBeGreaterThanOrEqual(minPrice);
            expect(parseInt(sweet.price)).toBeLessThanOrEqual(maxPrice);
        });
    });

    test('should return sweets matching multiple criteria', async () => {
        const response = await request(app)
            .get('/sweets/search')
            .query({ name: 'chocolate', category: 'chocolate', minPrice: minPrice, maxPrice: maxPrice });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach((sweet:Sweet) => {
            expect(sweet.name.toLowerCase()).toContain('chocolate');
            expect(sweet.category.toLowerCase()).toContain('chocolate');
            expect(parseInt(sweet.price)).toBeGreaterThanOrEqual(minPrice);
            expect(parseInt(sweet.price)).toBeLessThanOrEqual(maxPrice);
        });
    });
});