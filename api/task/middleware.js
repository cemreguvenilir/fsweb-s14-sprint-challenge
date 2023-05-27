const taskModel = require("./model");
const projectModel = require("../project/model");

function checkPayload(req, res, next) {
  try {
    const { task_description, project_id } = req.body;
    if (!task_description || !project_id || project_id <= 0) {
      res.status(400).json({ message: "alanları kontrol ediniz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkProjectId(req, res, next) {
  try {
    const isExist = await projectModel.getById(req.body.project_id);
    if (!isExist) {
      res.status(400).json({ message: "alanları kontrol ediniz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkPayload,
  checkProjectId,
};
