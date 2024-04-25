const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET TAG by IDEA ID
router.get('/:id', (req, res) => {
  console.log('specific tag GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('Get TAG by IDEA ID req.params.id:', req.params.id);
  // only do GET if authenticated:
  if (req.isAuthenticated()){
    
    let id = req.params.id;
    let queryText = `
      SELECT "tag".label AS "tag_label", "tag".hex AS "tag_hex" FROM "tag"
      JOIN "idea" ON "idea".tag_id = "tag".id
      WHERE "idea".id = $1 AND "idea"."user_id" = ${req.user.id};
    `;
    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows[0]);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  } else {
      res.sendStatus(403);
  }
});


module.exports = router;