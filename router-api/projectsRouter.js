const express = require("express")

const router = express.Router()

const Projects = require("./projectsModel")


// GET all Projects
router.get("/", async (req, res) => {
    try {
        let projects = await Projects.get()
       
        projects = projects.map(project => {
            return {
                ...project,
                completed: Boolean(project.completed)
            }
        })
        res.status(200).json(projects)
    } catch (error) {
        res.status(400).json({
            erorMessage: "Could not retrieve projects"
        })
    }
})

// GET Project by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id

    try {
        const [project] = await Projects.getById(id)
        res.status(200).json({
            ...project,
            completed: Boolean(project.completed)
        })
    } catch (error) {
        res
            .status(400)
            .json({
                errorMessage: "Could not get Project with specified ID"
            })
    }
})

// POST new Project
router.post("/", async (req, res) => {
    const projectData = req.body

    try {
        let [newProject] = await Projects.add({
            ...projectData,
            completed: projectData.completed || false
        })
        res
            .status(201)
            .json({
                ...newProject,
                completed: Boolean(newProject.completed)
            })
    } catch (error) {
        res.status(400).json({
            errorMessage: "Could not add project to database"
        })
    }
})

// GET Project tasks
router.get("/:id/tasks", async (req, res) => {
    const id = req.params.id

    try {
        let tasks = await Projects.getProjectTasks(id)
        tasks = tasks.map(task => {
            return {
                ...task,
                completed: Boolean(task.completed)
            }
        })
        if (!tasks.length) {
            res.status(400).json({
                message: "This project has no tasks"
            })
        } else {
            res.status(200).json(tasks)
        }
    } catch (error) {
        res.status(400).json({
            errorMessage: "could not retrieve tasks for project with specified ID"
        })
    }
})

// POST new task to Project
router.post("/tasks", async (req, res) => {
    const taskData = req.body

    if (!taskData.project_id) {
        res.status(400).json({
            errorMessage: "Please provide a project ID"
        })
    }

    try {
        await Projects.addProjectTask({
            ...taskData,
            completed: taskData.completed || false
        })
        const project = await Projects.getProjectTasks(taskData.project_id)
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({
            errorMessage: "Could not add task to project"
        })
    }
})

module.exports = router
