export async function seed(knex) {
  await knex('capsules').insert([
    {
      id: 1,
      title: 'Prediction',
      time: '22/12/2035 14:00',
      description: 'This Prediction I want to keep for 10 years',
      tags: JSON.stringify(['prediction', 'plan', 'prediction']),
      user_id: 'auth0|6747c8bd793f0b9a3e761250',
    },
    {
      id: 2,
      title: 'Plan',
      time: '22/12/2045 10:00',
      description: 'This Plan I want to keep for 20 years',
      tags: JSON.stringify(['prediction', 'plan', 'prediction']),

      user_id: 'auth0|0987654321',
    },
  ])
}
