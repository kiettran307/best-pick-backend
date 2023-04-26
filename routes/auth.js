const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  //Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMTNAZ21haWwuY29tIiwiaWQiOiI1ZTcyZTNhYTIyN2ExZTY5ZGI2OGZkZTYiLCJleHAiOjE1ODk3NzMyNTEsImlhdCI6MTU4NDU4OTI1MX0.BF-KK0FUrXOA3RdJzLsE2S9zPhYFU35PAhLF6RyNQ_c
  console.log('headers ', req.headers.authorization);
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'body',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'body',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;