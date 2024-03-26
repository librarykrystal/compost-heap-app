const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET (ALL)
router.get('/', (req, res) => {
  console.log('heap GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // only do GET if authenticated:
  if (req.isAuthenticated()){
      let queryText = `SELECT * FROM "idea" WHERE "user_id" = $1 ORDER BY "id" ASC`;
      pool.query(queryText, [req.user.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
      });
  } else {
      res.sendStatus(403);
  }
});

// GET (DETAILS of ONE IDEA by ID)
router.get('/:id', (req, res) => {
  console.log('heap GET ONE route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('Get IDEA by ID req.params.id:', req.params.id);
    // only do GET if authenticated:
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `SELECT * FROM idea WHERE "id" = $1 AND "user_id" = ${req.user.id};`;
    pool.query(queryText, [id])
    .then((result) => {
        console.log('GET IDEA by ID RESULTS:', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Get IDEA by ID ERROR:', error);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
  });



module.exports = router;