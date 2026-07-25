const request = require('supertest');
const app = require('../src/app');
const { connectTestDB, clearDB, disconnectDB, seedUsers } = require('./helpers/db');

let users;

beforeAll(async () => {
  await connectTestDB();
});

beforeEach(async () => {
  await clearDB();
  users = await seedUsers();
});

afterAll(async () => {
  await clearDB();
  await disconnectDB();
});

describe('Role & Permission Integration Tests', () => {
  it('Member on DELETE /api/leads/:id should return 403', async () => {
    // Stub an ID
    const res = await request(app)
      .delete('/api/leads/60f7b5f1f0a2b4b45c21b2d4')
      .set('Authorization', `Bearer ${users.memberToken}`);
    expect(res.status).toBe(403);
  });

  it('Member on POST /api/users should return 403', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${users.memberToken}`)
      .send({ name: 'Test', email: 'test@test.com', password: 'pass', role: 'Member' });
    expect(res.status).toBe(403);
  });

  it('Member on GET /api/activities should return 403', async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('Authorization', `Bearer ${users.memberToken}`);
    expect(res.status).toBe(403);
  });

  it('Unauthenticated on any protected route should return 401', async () => {
    const res = await request(app).get('/api/leads');
    expect(res.status).toBe(401);
  });

  it('Admin on GET /api/activities should return 200', async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('Authorization', `Bearer ${users.adminToken}`);
    expect(res.status).toBe(200);
  });
});
