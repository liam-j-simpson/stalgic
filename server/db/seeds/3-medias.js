export async function seed(knex) {
  await knex('medias').insert([
    { id: 1, capsule_id: 1 },
    {
      id: 2,
      capsule_id: 2,
    },
  ])
}
