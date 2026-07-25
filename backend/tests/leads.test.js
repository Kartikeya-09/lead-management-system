const request = require('supertest');
const app = require('../src/app');
const { connectTestDB, clearDB, disconnectDB, seedUsers } = require('./helpers/db');
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

describe('Leads Integration Tests', () => {
  it('Admin creates lead returns 201', async () => {
    const res = await request(app)
      .post('/api/leads')
      .set('Authorization', `Bearer ${users.adminToken}`)
      .send({ name: 'John Doe', email: 'john@example.com', company: 'Acme Corp' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('John Doe');
    expect(res.body.status).toBe('New');
  });

  it('Member cannot create lead (403)', async () => {
    const res = await request(app)
      .post('/api/leads')
      .set('Authorization', `Bearer ${users.memberToken}`)
      .send({ name: 'Jane Doe', company: 'Acme Corp' });

    expect(res.status).toBe(403);
  });

  it('Member list returns only assigned leads', async () => {
    const lead1 = await Lead.create({ name: 'Lead 1', createdBy: users.admin._id, assignedTo: users.member._id });
    const lead2 = await Lead.create({ name: 'Lead 2', createdBy: users.admin._id, assignedTo: users.admin._id });

    const res = await request(app)
      .get('/api/leads')
      .set('Authorization', `Bearer ${users.memberToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Lead 1');
  });

  it('Search returns only matching leads', async () => {
    await Lead.create({ name: 'Unique Apple', createdBy: users.admin._id });
    await Lead.create({ name: 'Unique Banana', createdBy: users.admin._id });

    const res = await request(app)
      .get('/api/leads?search=Apple')
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Unique Apple');
  });

  it('Invalid status returns 422', async () => {
    const lead = await Lead.create({ name: 'Test Lead', createdBy: users.admin._id, assignedTo: users.member._id });

    const res = await request(app)
      .put(`/api/leads/${lead._id}/status`)
      .set('Authorization', `Bearer ${users.memberToken}`)
      .send({ status: 'InvalidStatus' });

    expect(res.status).toBe(422);
  });

  it('Soft-delete sets isActive=false and hides from list', async () => {
    const lead = await Lead.create({ name: 'Delete Me', createdBy: users.admin._id });

    const delRes = await request(app)
      .delete(`/api/leads/${lead._id}`)
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(delRes.status).toBe(200);

    const getRes = await request(app)
      .get('/api/leads')
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(getRes.body.data.length).toBe(0);
  });
});
