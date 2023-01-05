module.exports = {
  description: 'Component Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/components/{{properCase name}}/index.tsx',
      templateFile: './src/templates/component/index.hbs',
    },
    {
      type: 'add',
      path: 'src/components/{{properCase name}}/{{properCase name}}.tsx',
      templateFile: './src/templates/component/Component.hbs',
    },

    {
      type: 'add',
      path: 'src/components/{{properCase name}}/{{properCase name}}.style.tsx',
      templateFile: './src/templates/component/Component.style.hbs',
    },
  ],
}
