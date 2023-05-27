// `Proje` modeli buraya
const db = require("../../data/dbConfig");

async function getAll() {
  const allProjects = await db("projects");
  let transformedProjects = allProjects.map((item) => {
    return {
      ...item,
      project_completed: item.project_completed == 1,
    };
  });
  return transformedProjects;
}

function getById(project_id) {
  return db("projects").where("project_id", project_id).first();
}

async function create(project) {
  const [insertedId] = await db("projects").insert(project);
  const inserted = await db("projects").where("project_id", insertedId).first();

  inserted.project_completed = inserted.project_completed == 1;
  return inserted;
}

module.exports = {
  getAll,
  create,
  getById,
};
