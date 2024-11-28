export function up(knex) {
  return knex.schema.createTable('capsules', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('time')
    table.text('description').notNullable()
    table.text('tags').notNullable()
    table
      .string('user_id')
      .references('auth0_id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTable('capsules')
}
