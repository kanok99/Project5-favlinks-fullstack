const express = require('express');
const db = require('../db');

const router = express.Router();

/**
 * GET /api/links
 * Get all favorite links
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, url, description, created_at FROM favlinks ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching links:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/links/:id
 * Get a single link by id
 */
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const result = await db.query(
      'SELECT id, name, url, description, created_at FROM favlinks WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/links
 * Create a new link
 */
router.post('/', async (req, res) => {
  const { name, url, description } = req.body;

  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO favlinks (name, url, description)
       VALUES ($1, $2, $3)
       RETURNING id, name, url, description, created_at`,
      [name, url, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/links/:id
 * Update an existing link
 */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, url, description } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL are required' });
  }

  try {
    const result = await db.query(
      `UPDATE favlinks
       SET name = $1, url = $2, description = $3
       WHERE id = $4
       RETURNING id, name, url, description, created_at`,
      [name, url, description || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/links/:id
 * Delete a link
 */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const result = await db.query(
      'DELETE FROM favlinks WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting link:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
