const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//           Subscribe
//=================================

// 구독자 수 찾아서 client에 전달
router.post('/subscribeNumber', async (req, res) => {
  try {
    const subscribeNumber = await Subscriber.find({
      userTo: req.body.userTo,
    }).exec();

    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribeNumber.length });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/subscribed', async (req, res) => {
  try {
    const subscribed = await Subscriber.find({
      userTo: req.body.userTo,
      userForm: req.body.userFrom,
    }).exec();

    let result = false;

    // 구독을 하고있음
    if (subscribed.length !== 0) {
      result = true;
    }

    return res.status(200).json({ success: true, subscribed: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
