const db = require("./../data/db-config")

module.exports = {
    get,
    getById,
    add,
    addProjectTask,
    getProjectTasks
}

function get() {
    return db("projects")
}

function getById(id) {
    return db("projects")
        .select("*")
        .where({
            id
        })
}

async function add(project) {
    const [id] = await db("projects").insert(project)

    return db("projects")
        .select("*")
        .where({
            id: id
        })
}

function addProjectTask(taskData) {
    return db("tasks").insert(taskData)
}

function getProjectTasks(id) {
    return db("tasks")
        .select("*")
        .where({
            project_id: id
        })
}