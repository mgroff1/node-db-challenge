
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([{
          name: "Do Something With Your Life",
          description: "Very Confused ",
          completed: false
        },
        {
          name: "Crayon Taste Test",
          description: "Log Flavors Of Each Crayon In A Box Of 64",
          completed: false
        },
        {
          name: "Natural Flight",
          description: "Dont Forget Your Cape, Top Of Tower 2PM",
          completed: true
        }
      ])
    })
}
