const router = require('express').Router();
const {
  createReaction,
  deleteReaction
} = require('../controllers/reactionController');

router.route('/')
  .post(createReaction);

router.route('/:id')
  .delete(deleteReaction);

module.exports = router;
