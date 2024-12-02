export function up(knex) {
  return knex.schema.createTable('medias', (table) => {
    table.increments('id').primary()
    table.integer('capsule_id').references('id').inTable('capsules')
    table.string('filename')
  })
}

export function down(knex) {
  return knex.schema.dropTable('medias')
}
