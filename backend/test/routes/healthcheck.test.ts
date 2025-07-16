import * as chai from 'chai';
import chaiHttp, { request } from 'chai-http';
import app from '../../src/server';

const { expect } = chai;
chai.use(chaiHttp);

describe('Healthcheck endpoint', () => {
  it('Should be able to get healthcheck', async () => {
    const res = await request.execute(app).get('/api/healthcheck');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('uptime');
  });
});
