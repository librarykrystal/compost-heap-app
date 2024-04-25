const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET (ALL)
router.get('/', (req, res) => {
  console.log('all tags GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // only do GET if authenticated:
  if (req.isAuthenticated()){
    let queryText = `SELECT * FROM "tag" WHERE "user_id" = $1 ORDER BY "id" ASC`;
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


// GET TAG by IDEA ID
// router.get('/:id', (req, res) => {
//   console.log('specific tag GET route');
//   console.log('is authenticated?', req.isAuthenticated());
//   console.log('user', req.user);
//   console.log('Get TAG by IDEA ID req.params.id:', req.params.id);
//   // only do GET if authenticated:
//   if (req.isAuthenticated()){
    
//     let id = req.params.id;
//     let queryText = `
//       SELECT "tag".label AS "tag_label", "tag".hex AS "tag_hex" FROM "tag"
//       JOIN "idea" ON "idea".tag_id = "tag".id
//       WHERE "idea".id = $1 AND "idea"."user_id" = ${req.user.id};
//     `;
//     pool.query(queryText, [id]).then((result) => {
//         res.send(result.rows[0]);
//     }).catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     });
//   } else {
//       res.sendStatus(403);
//   }
// });


// POST NEW TAG
router.post('/', (req, res) => {
  console.log('tag POST route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('REQ.BODY for TAG ADD:', req.body);
  // only do POST if authenticated:
  if (req.isAuthenticated()){
    const addQuery = `
    INSERT INTO "tag" ("user_id", "label", "hex")
    VALUES ($1, $2, $3)
    RETURNING "id";
    `
    pool.query(addQuery, [
      req.user.id,
      req.body.label,
      req.body.hex
    ])
    .then(result => {
      console.log('New tag ID:', result.rows[0].id);
      res.send({ id: result.rows[0].id });
    }).catch(err => {
      console.log('TAG POST ERROR:', err);
      res.sendStatus(500)
    })
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;