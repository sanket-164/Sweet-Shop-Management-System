import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/server';

describe('Server Test', () => {
  test('GET / should return Hello, World!', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello, World!');
  });

  test('GET /nonexistent should return 404', async () => {
        const response = await request(app).get('/nonexistent');
        expect(response.status).toBe(404);
  });
});