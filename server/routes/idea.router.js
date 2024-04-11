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

// POST NEW IDEA
router.post('/', (req, res) => {
  console.log('idea POST route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('REQ.BODY for IDEA ADD:', req.body);
  // only do POST if authenticated:
  if (req.isAuthenticated()){
    const addQuery = `
    INSERT INTO "idea" ("user_id", "headline", "notes", "tag", "project", "star")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id";
    `
    pool.query(addQuery, [
      req.user.id,
      req.body.headline,
      req.body.notes,
      req.body.tag,
      req.body.project,
      req.body.star
    ])
    .then(result => {
      console.log('New idea ID:', result.rows[0].id);
      res.send({ id: result.rows[0].id });
    }).catch(err => {
      console.log('POST ERROR:', err);
      res.sendStatus(500)
    })
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;