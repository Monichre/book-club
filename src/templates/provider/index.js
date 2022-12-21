const provider = {
  description: '⚛ react provider provider',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'provider name',
    },
  ],
  actions: [
    {
      type: 'append',
      path: 'src/providers/index.ts',
      templateFile: './src/templates/templates/provider/index.hbs',
    },
    {
      type: 'add',
      path: 'src/providers/{{pascalCase name}}.tsx',
      templateFile: './src/templates/templates/provider/provider.hbs',
    },
    {
      type: 'append',
      path: 'src/hooks/index.ts',
      templateFile: './src/templates/templates/hooks/index.hbs',
    },
    // {
    //   type: 'add',
    //   path: 'src/hooks/use{{pascalCase name}}/index.ts',
    //   templateFile: './src/templates/templates/hooks/hook/index.hbs',
    // },
    // {
    //   type: 'add',
    //   path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts',
    //   templateFile: './src/templates/templates/hooks/hook/hook.hbs',
    // },
    // {
    //   type: 'add',
    //   path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.test.ts',
    //   templateFile: './src/templates/templates/hooks/hook/hook.test.hbs',
    // },
  ],
}

module.exports = provider
