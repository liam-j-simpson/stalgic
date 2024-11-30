export async function seed(knex) {
  await knex('users').insert([
    {
      auth0_id: 'auth0|6747c8bd793f0b9a3e761250',
      name: 'John Doe',
      email: 'john.doe@example.com',
      dob: '1990-01-01',
      profile_image: 'https://example.com/profile-image.jpg',
    },
    {
      auth0_id: 'auth0|0987654321',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      dob: '1985-05-15',
      profile_image: 'https://example.com/profile-image-2.jpg',
    },
  ])
}
