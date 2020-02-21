

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("resources").insert([{
          name: "Wallet",
          description: "Your Bank Roll Dummy"
        },
        {
          name: "Mind",
          description: "Good Luck Here Buddy!"
        },
        {
          name: "Brute Strength",
          description: "If Its Anywhere Equal To The Strength Of Your Foul Oder... You Got This!"
        }
      ])
    })
}
