const express = require('express');
const { auth } = require('../middleware/auth');
const Card = require('../models/Card');
const router = express.Router();

// @route   GET /api/cards
// @desc    Get all cards for authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const cards = await Card.find({ 
      createdBy: req.user._id,
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });
    
    res.json(cards);
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/cards/:id
// @desc    Get single card
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json(card);
  } catch (error) {
    console.error('Get card error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cards
// @desc    Create a new card
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, type, imageUrl, buttonText, buttonAction, backgroundColor, textColor, order } = req.body;

    // Validation
    if (!title || !content || !type) {
      return res.status(400).json({ message: 'Title, content, and type are required' });
    }

    const validTypes = ['text', 'image', 'mixed', 'interactive', 'large-featured'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid card type' });
    }

    const card = new Card({
      title,
      content,
      type,
      imageUrl,
      buttonText,
      buttonAction,
      backgroundColor,
      textColor,
      order: order || 0,
      createdBy: req.user._id
    });

    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/cards/:id
// @desc    Update a card
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, type, imageUrl, buttonText, buttonAction, backgroundColor, textColor, order } = req.body;

    let card = await Card.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Validate type if provided
    if (type) {
      const validTypes = ['text', 'image', 'mixed', 'interactive', 'large-featured'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid card type' });
      }
    }

    // Update fields
    card.title = title || card.title;
    card.content = content || card.content;
    card.type = type || card.type;
    card.imageUrl = imageUrl !== undefined ? imageUrl : card.imageUrl;
    card.buttonText = buttonText !== undefined ? buttonText : card.buttonText;
    card.buttonAction = buttonAction !== undefined ? buttonAction : card.buttonAction;
    card.backgroundColor = backgroundColor || card.backgroundColor;
    card.textColor = textColor || card.textColor;
    card.order = order !== undefined ? order : card.order;

    await card.save();
    res.json(card);
  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/cards/:id
// @desc    Delete a card (soft delete)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    card.isActive = false;
    await card.save();

    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/cards/reorder
// @desc    Reorder cards
// @access  Private
router.patch('/reorder', auth, async (req, res) => {
  try {
    const { cardOrders } = req.body; // Array of { id, order }

    if (!Array.isArray(cardOrders)) {
      return res.status(400).json({ message: 'cardOrders must be an array' });
    }

    const bulkOps = cardOrders.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id, createdBy: req.user._id },
        update: { order }
      }
    }));

    await Card.bulkWrite(bulkOps);
    res.json({ message: 'Cards reordered successfully' });
  } catch (error) {
    console.error('Reorder cards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;