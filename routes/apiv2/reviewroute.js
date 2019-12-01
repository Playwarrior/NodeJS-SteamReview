const express = require('express');
const request = require('request');

const NullSector = require('../../util/nullsector');
const {formatReview} = require("../../util/format");

const router = express.Router();

router.get('/:id', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id}, (error, bool, review) => {
      if(error)
          next(error);

      else if(!bool)
          res.status(204);

      else {
          res.status(200).json(formatReview(review));
      }
    });
});

module.exports = router;
