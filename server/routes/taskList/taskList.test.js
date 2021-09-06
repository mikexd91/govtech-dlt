const test = require('ava');
const request = require('supertest');
const app = require('../../index');

test('Post task', async (t) => {
  // in async tests, it's useful to declare the number of
  // assertions this test contains
  t.plan(4);

  // make a request with supertest
  const res = await request(app).post('/taskList').send({
    taskTitle: 'new task',
  });
  // make assertions on the response
  t.is(res.ok, true);
  t.is(res.type, 'application/json');
  t.is(res.status, 200);
  t.is(res.body.data.tasks.length, 1);
});

test('Get Task', async (t) => {
  // in async tests, it's useful to declare the number of
  // assertions this test contains
  t.plan(4);

  const res2 = await request(app).get('/taskList').send();

  // make assertions on the response
  t.is(res2.ok, true);
  t.is(res2.type, 'application/json');
  t.is(res2.status, 200);
  t.is(res2.body.data.tasks.length, 0);
});
