// `/api/resources` router buraya

const router = require("express").Router();
const resourcesModel = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const allResources = await resourcesModel.getAll();
    res.json(allResources);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { resource_name } = req.body;
    if (!resource_name) {
      res.status(400).json({ message: "alan eksik" });
    } else {
      let resourceModel = {
        resource_name: req.body.resource_name,
        resource_description: req.body.resource_description,
      };
      const inserted = await resourcesModel.create(resourceModel);
      res.status(201).json(inserted);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
