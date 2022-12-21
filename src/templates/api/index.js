module.exports = {
  description: 'API Layer Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'api name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/api/{{name}}/index.ts',
      templateFile: './src/templates/api/index.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/api/{{name}}/crud/get-{{name}}.api.ts',
      templateFile: './src/templates/api/get.ts.hbs',
    },

    {
      type: 'add',
      path: 'src/api/{{name}}/crud/create-{{name}}.api.ts',
      templateFile: './src/templates/api/create.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/api/{{name}}/crud/update-{{name}}.api.ts',
      templateFile: './src/templates/api/update.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/api/{{name}}/crud/delete-{{name}}.api.ts',
      templateFile: './src/templates/api/delete.ts.hbs',
    },
    {
      type: 'add',
      path: 'src/api/{{name}}/__test__/{{name}}.api.test.ts',
      templateFile: './src/templates/api/api.test.hbs',
    },
  ],
}
