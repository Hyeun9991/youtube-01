const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//           Subscribe
//=================================

// 구독자 수 - db에서 구독자 수 찾아서 client에 전달
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

// 구독 여부 - db에서 구독여부 정보를 client에 전달
router.post('/subscribed', async (req, res) => {
  try {
    const subscribed = await Subscriber.find({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
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

// 구독 취소 - db에서 userTo, userFrom을 찾고 삭제
router.post('/unSubscribe', (req, res) => {
  try {
    const unSubscribe = Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec();

    res.status(200).json({ success: true, unSubscribe });
  } catch (err) {
    res.status(400).send(err).json({ success: false, err });
  }
});

// 구독 하기 - db에 userTo, userFrom 저장
router.post('/subscribe', async (req, res) => {
  try {
    const subscribe = new Subscriber(req.body);

    await subscribe.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).send(err).json({ success: false, err });
  }
});

module.exports = router;
