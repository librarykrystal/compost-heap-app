const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET (ALL)
router.get('/', (req, res) => {
  console.log('all projects GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // only do GET if authenticated:
  if (req.isAuthenticated()){
    let queryText = `SELECT * FROM "project" WHERE "user_id" = $1 ORDER BY "id" ASC`;
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

// POST / ADD
router.post('/', (req, res) => {
  console.log('project POST route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('REQ.BODY for PROJECT ADD:', req.body);
  // only do POST if authenticated:
  if (req.isAuthenticated()){
    const addQuery = `
    INSERT INTO "project" ("user_id", "title", "type", "genre", "notes")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING "id";
    `
    pool.query(addQuery, [
      req.user.id,
      req.body.title,
      req.body.type,
      req.body.genre,
      req.body.notes
    ])
    .then(result => {
      console.log('New project ID:', result.rows[0].id);
      res.send({ id: result.rows[0].id });
    }).catch(err => {
      console.log('PROJECT POST ERROR:', err);
      res.sendStatus(500)
    })
  } else {
    res.sendStatus(403);
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  console.log('router.delete ID:', req.params.id);
  // only do DELETE if authenticated:
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `DELETE FROM project WHERE id = $1;`;
    pool.query(queryText, [id])
    .then((result) => {
        console.log('DELETE result:', result);
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('DELETE ERROR:', error);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;