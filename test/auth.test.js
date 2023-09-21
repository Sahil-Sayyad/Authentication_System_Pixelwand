const request = require('supertest');
const app = require('../app');

describe('User Registration', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        confirm_password:"testpassword"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should handle registration validation errors', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        // Invalid data that should trigger validation errors
      });
    expect(response.statusCode).toBe(400);
  });
});

describe('User Login and Logout', () => {
    let token; // Store the token for authenticated requests
    beforeAll(async () => {
      // Register a test user or use an existing one
      // Store the token in the 'token' variable
    });
  
    it('should log in a user', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword',
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
    });
  
    it('should handle login authentication errors', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword',
        });
      expect(response.statusCode).toBe(400);
    });
  
    it('should log out a user', async () => {
      const response = await request(app)
        .get('/logout')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  });
  
  