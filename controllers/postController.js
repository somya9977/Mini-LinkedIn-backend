const pool = require('../config/db');

exports.getPosts = async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT posts.id, posts.content, posts.created_at AS createdAt,
             users.id AS userId, users.name
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);
    const formatted = posts.map(p => ({
      id: p.id,
      content: p.content,
      createdAt: p.createdAt,
      author: { id: p.userId, name: p.name }
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

exports.createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [req.user.id, content]
    );
    res.json({
      id: result.insertId,
      content,
      createdAt: new Date(),
      author: { id: req.user.id, name: req.user.name }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const [posts] = await pool.query(
      'SELECT id, content, created_at AS createdAt FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user posts', error: err.message });
  }
};
