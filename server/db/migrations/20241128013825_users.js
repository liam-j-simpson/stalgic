export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('name').notNullable()
<<<<<<< HEAD
    table.string('email').notNullable()
    table.string('dob').notNullable()
    table.string('profile_image')
=======
    table.string('email').notNullable().unique()
    table.string('dob').notNullable()
>>>>>>> beb55e6 (add user table with columns)
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}
