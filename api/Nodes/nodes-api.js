const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json()); // Parse JSON bodies
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const { id, data, position } = req.body;

  if (!data || !data.label) {
    return res.status(400).send('Invalid data format');
  }

  const sql = 'INSERT INTO nodes (id, label, positionX, positionY) VALUES (?, ?, ?, ?)';
  const values = [id, data.label, position.x, position.y];

  // Proceed with database operation
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding new node:', err);
      return res.status(500).send('Failed to add new node');
    }
    console.log('New node added to database');
    res.status(200).send('Node added successfully');
  });
});

module.exports = router;
