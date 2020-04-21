const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secrets = require('../api/secrets.js');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const { username, password } = req.headers;
  const token = req.headers.authorization;

  const secret = secrets.jwSecret

  jwt.verify(token, secret, (error, decodedToken)=>{
    //if everything is goof with the token the error will be undefined
    if (error){
      console.log(error)
      res.status(401).json({messahe: "Nope!"})
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};
