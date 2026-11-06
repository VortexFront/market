import parser from '@typescript-eslint/parser';
export default [{ignores:['dist/**','node_modules/**','.test-results/**']},{
  files:['src/**/*.{ts,tsx}'],
  languageOptions:{parser,parserOptions:{ecmaVersion:'latest',sourceType:'module',ecmaFeatures:{jsx:true}}},
  rules:{'no-console':'error','no-debugger':'error','no-unreachable':'error'}
}];
