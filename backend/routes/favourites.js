const express = require('express');
const Favourite = require('../models/Favourite');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/favourites
router.get('/', auth, async (req, res) => {
  try {
    const favs = await Favourite.find({ user: req.user._id }).sort('-createdAt');
    res.json(favs);
  } catch (err) {
    console.log('Get favourites error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/favourites
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId, title, location, price } = req.body;

    if (!propertyId || !title) {
      return res.status(400).json({ msg: 'propertyId and title are required' });
    }

    const existing = await Favourite.findOne({ user: req.user._id, propertyId });
    if (existing) {
      return res.status(400).json({ msg: 'Already in favourites' });
    }

    const fav = await Favourite.create({
      user: req.user._id,
      propertyId,
      title,
      location,
      price
    });

    res.status(201).json(fav);
  } catch (err) {
    console.log('Add favourite error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE /api/favourites/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const fav = await Favourite.findById(req.params.id);

    if (!fav) {
      return res.status(404).json({ msg: 'Favourite not found' });
    }

    if (fav.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await fav.deleteOne();
    res.json({ msg: 'Removed from favourites' });
  } catch (err) {
    console.log('Delete favourite error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
