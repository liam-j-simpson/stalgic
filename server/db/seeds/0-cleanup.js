export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('medias').del()
  await knex('capsules').del()
  await knex('users').del()
}
