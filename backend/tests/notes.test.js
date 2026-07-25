const request = require('supertest');
const app = require('../src/app');
const { connectTestDB, clearDB, disconnectDB, seedUsers } = require('./helpers/db');
const Lead = require('../src/models/Lead.model');

let users;
let lead;

beforeAll(async () => {
  await connectTestDB();
});

beforeEach(async () => {
  await clearDB();
  users = await seedUsers();
  lead = await Lead.create({ name: 'Test Lead', createdBy: users.admin._id, assignedTo: users.member._id });
});

afterAll(async () => {
  await clearDB();
  await disconnectDB();
});

describe('Notes Integration Tests', () => {
  it('Assigned member adds note successfully', async () => {
    const res = await request(app)
      .post(`/api/leads/${lead._id}/notes`)
      .set('Authorization', `Bearer ${users.memberToken}`)
      .send({ text: 'This is a test note' });

    expect(res.status).toBe(201);
    expect(res.body.text).toBe('This is a test note');
    expect(res.body.author).toBe(users.member._id.toString());
  });

  it('Unassigned member gets 403', async () => {
    const unassignedLead = await Lead.create({ name: 'Unassigned', createdBy: users.admin._id });
    const res = await request(app)
      .post(`/api/leads/${unassignedLead._id}/notes`)
      .set('Authorization', `Bearer ${users.memberToken}`)
      .send({ text: 'Sneaky note' });

    expect(res.status).toBe(403);
  });

  it('Empty text returns 422', async () => {
    const res = await request(app)
      .post(`/api/leads/${lead._id}/notes`)
      .set('Authorization', `Bearer ${users.memberToken}`)
      .send({ text: '' });

    expect(res.status).toBe(422);
  });

  it('Notes are returned newest-first', async () => {
    // We add via service/API to ensure timestamps
    await request(app)
      .post(`/api/leads/${lead._id}/notes`)
      .set('Authorization', `Bearer ${users.adminToken}`)
      .send({ text: 'First Note' });
    
    // Add small delay to ensure timestamp difference
    await new Promise(r => setTimeout(r, 10));
    
    await request(app)
      .post(`/api/leads/${lead._id}/notes`)
      .set('Authorization', `Bearer ${users.adminToken}`)
      .send({ text: 'Second Note' });

    const res = await request(app)
      .get(`/api/leads/${lead._id}/notes`)
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].text).toBe('Second Note');
    expect(res.body[1].text).toBe('First Note');
  });
});
