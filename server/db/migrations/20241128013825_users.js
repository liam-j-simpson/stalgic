export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0_id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('dob')
    table.string('profile_image')
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}
