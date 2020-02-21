

exports.up = function (knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments()
            tbl.string("name").notNullable()
            tbl.string("description").notNullable()
            tbl.boolean("completed").notNullable()
        })
        .createTable("tasks", tbl => {
            tbl.increments()
            tbl.string("description").notNullable()
            tbl.string("notes")
            tbl.boolean("completed").notNullable()
            tbl
                .integer("project_id")
                .references("id")
                .inTable("projects")
                .notNullable()
        })
        .createTable("resources", tbl => {
            tbl.increments()
            tbl
                .string("name")
                .unique()
                .notNullable()
            tbl.string("description")
        })
        .createTable("projectResources", tbl => {
            tbl
                .integer("project_id")
                .references("id")
                .inTable("projects")
            tbl
                .integer("resource_id")
                .references("id")
                .inTable("resources")
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("projectResources")
        .dropTableIfExists("resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("projects")
}
