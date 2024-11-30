export async function seed(knex) {
  await knex('medias').insert([
    { id: 1, capsule_id: 1, image_url: 'https://i.redd.it/2q6r75jvuy261.jpg' },
    {
      id: 2,
      capsule_id: 2,
      image_url:
        'https://live-production.wcms.abc-cdn.net.au/43e4c7f0206cb5e5369e5f51fb944929?impolicy=wcms_crop_resize&cropH=1947&cropW=2918&xPos=41&yPos=0&width=862&height=575',
    },
  ])
}
