const express = require("express");
const argon2 = require("argon2");
const db = require("../models");

const { makeJWT } = require("../utils");
const validateSchema = require("../middlewares/validate.middleware");
const userSchemas = require("../validations/user.validation");
const router = express.Router();

router.post(
  "/login",
  validateSchema(userSchemas.userSchema),
  async (req, res, next) => {
    try {
      const user = await db.user.findOne({
        where: {
          name: req.body.name,
        },
        attributes: ["id", "name", "password"],
      });

      if (!user) {
        return res.status(403).send({
          message: "User is not present",
        });
      }

      const passwordOk = await argon2.verify(user.password, req.body.password);
      if (!passwordOk) {
        return res.status(403).send({
          message: "User credentials invalid",
        });
      }

      const token = makeJWT({
        user: user.id,
      });

      return res.send({
        token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/signup",
  validateSchema(userSchemas.userSchema),
  async (req, res, next) => {
    try {
      // TODO: do payload validation
      // check if the username is taken
      const userNameTaken = await db.user.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (userNameTaken) {
        return res.status(400).send({
          message: "Username already taken",
        });
      }

      const passwordHash = await argon2.hash(req.body.password);

      const userPayload = {
        name: req.body.name,
        password: passwordHash,
      };

      const newUser = await db.user.create(userPayload);

      return res.status(201).send({
        id: newUser.id,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const getData = await db.user.findAll({});
    res.status(200).send(getData);
  } catch (error) {
    return next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const getDataById = await db.user.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(getDataById);
  } catch (error) {
    return next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const editedValue = await db.user.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(editedValue);
  } catch (error) {
    return next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await db.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: "one item is deleted",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
