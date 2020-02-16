const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const app = require("../app");
const model = require("../model/index");

module.exports = { chai, chaiHttp, expect, app, model };