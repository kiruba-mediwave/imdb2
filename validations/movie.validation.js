const joi = require("joi");

const movieSchema = joi.object().keys({
  name: joi.string().required(),
  genre: joi.string().required(),
  language: joi.string().required(),
  yearOfRelease: joi.number().required(),
});

module.exports = {
  movieSchema,
};
