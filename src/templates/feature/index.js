module.exports = {
  description: 'Feature Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Feature name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/features/{{properCase name}}/index.ts',
      templateFile: './src/templates/feature/index.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{properCase name}}/{{properCase name}}.tsx',
      templateFile: './src/templates/feature/Feature.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{properCase name}}/{{properCase name}}.stories.tsx',
      templateFile: './src/templates/feature/Feature.stories.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{properCase name}}/{{properCase name}}.style.tsx',
      templateFile: './src/templates/feature/Feature.style.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{properCase name}}/{{properCase name}}.scss',
      templateFile: './src/templates/feature/Feature.css.hbs',
    },
    {
      type: 'add',
      path: 'src/features/{{properCase name}}/__tests__/{{properCase name}}.test.tsx',
      templateFile: './src/templates/feature/Feature.test.hbs',
    },
  ],
}
