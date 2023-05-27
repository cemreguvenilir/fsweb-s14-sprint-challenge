// bu`Task` modeli buraya
const db = require("../../data/dbConfig");

async function getAll() {
  let allTasks = await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .select("p.*", "t.*");
  let transformedTasks = [];
  for (let i = 0; i < allTasks.length; i++) {
    let newModel = {
      task_id: allTasks[i].task_id,
      task_description: allTasks[i].task_description,
      task_notes: allTasks[i].task_notes,
      project_name: allTasks[i].project_name,
      project_description: allTasks[i].project_description,
      task_completed: allTasks[i].task_completed == 0 ? false : true,
    };
    transformedTasks.push(newModel);
  }
  return transformedTasks;
}

async function create(task) {
  const [insertedId] = await db("tasks").insert(task);
  const inserted = await db("tasks").where("task_id", insertedId).first();
  inserted.task_completed = inserted.task_completed == 1;
  return inserted;
}

module.exports = {
  getAll,
  create,
};
