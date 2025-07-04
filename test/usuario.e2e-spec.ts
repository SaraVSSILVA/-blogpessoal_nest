import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('User and Auth Module Tests (e2e)', () => {
  let token: any;
  let userId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Must create a User', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Root',
        user: 'root@root.com',
        password: 'rootroot',
        photo: '-',
      })
      .expect(201);

    userId = response.body.id;
  });

  it('02 - Must Not Register a Duplicate User', async () => {
    return await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Root',
        user: 'root@root.com',
        password: 'rootroot',
        photo: '-',
      })
      .expect(400);
  });

  it('03 - Must Authenticate User (Login)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        user: 'root@root.com',
        password: 'rootroot',
      })
      .expect(200);

    token = response.body.token;
    expect(token).toBeDefined(); // extra verificação opcional
  });

  it('04 - Must List all Users', async () => {
    return await request(app.getHttpServer())
      .get('/users/all')
      .set('Authorization', `${token}`)
      .expect(200);
  });

  it('05 - Must Update a User', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/update')
      .set('Authorization', `${token}`)
      .send({
        id: userId,
        name: 'Root Updated',
        user: 'root@root.com',
        password: 'rootroot',
        photo: '-',
      })
      .expect(200);

    expect(response.body.name).toEqual('Root Updated');
  });

  it('06 - Should Not Authenticate with Wrong Password', async () => {
  return await request(app.getHttpServer())
    .post('/users/login')
    .send({
      user: 'root@root.com',
      password: 'incorrectPassword',
    })
    .expect(401);
  });

  it('07 - Should Not Access Protected Route Without Token', async () => {
    return await request(app.getHttpServer()).get('/users/all').expect(401);
  });
});