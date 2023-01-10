const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "Famous skyscraper in the world",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s1360-w1360-h1020",
    address: "20 W 34th St, New york, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided ID", 404)
    );
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const person = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!person) {
    return next(
      new HttpError("Could not find a place for the provided user ID", 404)
    );
  }

  res.json({ person });
});

module.exports = router;
