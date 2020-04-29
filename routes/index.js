const router = require('express').Router(),
  userController = require('../controllers/user')

//user
router.get('/user/:id', userController.getUserById);

module.exports = router;
