//  `/api/projects` router buraya

const router = require("express").Router();
const projectModel = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectModel.getAll();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    let { project_name } = req.body;
    if (!project_name) {
      res.status(400).json({ message: "eksik alan mevcut" });
    } else {
      let model = {
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        project_completed: req.body.project_completed,
      };
      const insertedProject = await projectModel.create(model);
      res.status(201).json(insertedProject);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
