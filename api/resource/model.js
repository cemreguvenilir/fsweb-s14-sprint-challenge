// `Resource` modeli buraya

const db = require("../../data/dbConfig");

function getAll() {
  return db("resources");
}

async function create(resource) {
  const [insertedId] = await db("resources").insert(resource);
  const inserted = await db("resources")
    .where("resource_id", insertedId)
    .first();
  return inserted;
}

module.exports = {
  getAll,
  create,
};
