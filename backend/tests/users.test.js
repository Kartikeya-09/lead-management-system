const request = require('supertest');
const app = require('../src/app');
const { connectTestDB, clearDB, disconnectDB, seedUsers } = require('./helpers/db');
const User = require('../src/models/User.model');
const Lead = require('../src/models/Lead.model');

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

describe('Users Integration Tests', () => {
  it('Admin creates user (201) and DB has hash', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${users.adminToken}`)
      .send({ name: 'New User', email: 'new@test.com', password: 'password', role: 'Member' });

    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty('password');

    const dbUser = await User.findById(res.body._id);
    expect(dbUser.password).not.toBe('password');
    expect(dbUser.password).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt hash format
  });

  it('Duplicate email returns 409', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${users.adminToken}`)
      .send({ name: 'Dup', email: 'admin@test.com', password: 'password', role: 'Member' });

    expect(res.status).toBe(409);
  });

  it('Self-delete returns 400', async () => {
    const res = await request(app)
      .delete(`/api/users/${users.admin._id}`)
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(res.status).toBe(400);
  });

  it('Deactivate user nulls their assigned leads', async () => {
    const lead = await Lead.create({ name: 'Lead', createdBy: users.admin._id, assignedTo: users.member._id });

    await request(app)
      .delete(`/api/users/${users.member._id}`)
      .set('Authorization', `Bearer ${users.adminToken}`);

    const updatedLead = await Lead.findById(lead._id);
    expect(updatedLead.assignedTo).toBeNull();
  });
});
