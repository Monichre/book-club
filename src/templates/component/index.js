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
    {
      type: 'add',
      path: 'src/components/{{properCase name}}/{{properCase name}}.css',
      templateFile: './src/templates/component/Component.css.hbs',
    },
    {
      type: 'add',
      path: 'src/components/{{properCase name}}/__tests__/{{properCase name}}.test.tsx',
      templateFile: './src/templates/component/Component.test.hbs',
    },
  ],
}
