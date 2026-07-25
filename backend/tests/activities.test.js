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

describe('Activities Integration Tests', () => {
  it('Creating a lead creates an activity', async () => {
    const res = await request(app)
      .post('/api/leads')
      .set('Authorization', `Bearer ${users.adminToken}`)
      .send({ name: 'Act Lead', email: 'act@example.com', company: 'Act Corp' });

    expect(res.status).toBe(201);
    
    const actRes = await request(app)
      .get(`/api/leads/${res.body._id}/activities`)
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(actRes.status).toBe(200);
    expect(actRes.body.length).toBe(1);
    expect(actRes.body[0].action).toBe('Lead Created');
  });

  it('Paginated activity math correct', async () => {
    // Generate some activities by creating leads
    for(let i=0; i<15; i++) {
      await request(app)
        .post('/api/leads')
        .set('Authorization', `Bearer ${users.adminToken}`)
        .send({ name: `Lead ${i}`, company: 'Corp' });
    }

    const res = await request(app)
      .get('/api/activities?page=1&limit=10')
      .set('Authorization', `Bearer ${users.adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(10);
    expect(res.body.total).toBe(15);
    expect(res.body.totalPages).toBe(2);
  });
});
