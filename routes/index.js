const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/Restaurant')

/* GET home page */
router.get('/', (req, res, next) => {

  Restaurant.find()
  .then(restaurants => {
    res.render('index', {result: JSON.stringify(restaurants)});
  })
  .catch(err => {
    console.log(err)
  })
  
});

router.post('/restaurants', (req, res, next) => {

  const {name, description, latitude, longitude} = req.body

  let location = {
    type: "Point",
    coordinates: [longitude, latitude]
  }

  const newRestaurant = new Restaurant({
    name : name,
    description: description,
    location: location
  })

  newRestaurant.save(err => {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })

})

module.exports = router;
