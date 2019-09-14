const express = require('express');
const router = express.Router();

const { putData, getData,putImageRef, getImageRef } = require('../models/registereddb.js');
const { getImageToLocal } = require('./helper/helper.js');
const imageFolder = '/home/ramprasath/Desktop/express project/public/images/';

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  putData(req.body);
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/login', async (req, res) => {
  try {
    const userDetail = await getData(req.body);

    res.redirect('/upload');
  }
  catch {
    res.send('connection failure');
  }
});

router.post('/upload', async (req, res) => {
  const { url } = req.query;
  console.log(url);

  try {
    const fileName = await getImageToLocal(url);

    await putImageRef(fileName);
    res.send('success');
  }
  catch {
    res.send('no image found to upload');
  }
});

router.get('/image/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const fileName = await getImageRef(id);

    res.sendFile(imageFolder+fileName['img']);
  }
  catch {
    res.send('no image for your id:   '+id);
  }
});

module.exports = router;
