export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('capsules').del()
  await knex('users').del()
  await knex('medias').del()
}
