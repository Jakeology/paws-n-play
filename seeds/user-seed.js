const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'jwithers',
    email: 'j.wiz@gmail.com',
    password: 'bones1'
  },
  {
    username: 'fishfins01',
    email: 'f.fin@gmail.com',
    password: 'bones2'
  },
  {
    username: 'pocketppolly',
    email: 'p.cracker@gmail.com',
    password: 'bones3'
  },
  {
    username: 'kimmybear123',
    email: 'k.wall@gmail.com',
    password: 'bones4'
  },
  {
    username: 'oceanman06',
    email: 's.blue@gmail.com',
    password: 'bones5'
  },
];

  const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

  module.exports = seedUsers;
  