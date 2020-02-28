exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        { id: 1, username: "wes", password: "moody" },
        { id: 2, username: "jose", password: "rivera" },
        { id: 3, username: "ark", password: "raga" }
      ]);
    });
};
