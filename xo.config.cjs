module.exports = {
	prettier: true,
	plugins: ['unused-imports', 'check-file'],
	files: [
		'./**/*.ts',
		'./**/*.tsx',
		'./**/*.stories.ts',
		'./**/*.stories.tsx',
		'./**/*.jsx',
		'./**/*.js',
		'./**/*.cjs',
	],
	ignorePatterns: ['**/*.d.ts', 'node_modules', 'dist', 'build'],
	extends: ['xo', 'xo-react', 'eslint-config-xo-typescript'],
	ignores: [
		'**/*.d.ts',
		'**/*/index.ts',
		'**/*/index.tsx',
		'bin',
		'data',
		'node_modules',
		'dist',
		'test-utilities',
		'template/**',
		'next.config.js',
		'playgrounds/*',
		'**/shadcn/**/*',
	],
	rules: {
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'check-file/folder-match-with-fex': [
			'error',
			{
				'*.{tsx}': 'src/**',
				'*.styled.{jsx,tsx}': '**/pages/',
			},
		],
		'check-file/no-index': 'off',
		'check-file/folder-naming-convention': [
			'error',
			{
				'src/*': 'FLAT_CASE',
				'src/components/atoms/*': 'PASCAL_CASE',
				'src/components/molecules/*': 'PASCAL_CASE',
				'src/components/organisms/*': 'PASCAL_CASE',
				'src/components/templates/*': 'PASCAL_CASE',
				'src/**/*.module.ts': 'CAMEL_CASE',
				'src/**/*.story.ts': 'CAMEL_CASE',
			},
		],
		'check-file/filename-blocklist': [
			'error',
			{
				'**/*.stories.ts': '*.story.ts',
				'**/*.modules.ts': '*.module.ts',
			},
		],
		'unicorn/template-indent': [
			'error',
			{
				indent: '\t',
			},
		],
		'import/extensions': ['off'],
		'unicorn/prefer-node-protocol': ['off'],
		'react/react-in-jsx-scope': ['off'],
		'react/no-unknown-property': ['warn', { ignore: ['css'] }],
		'react/no-danger': 'warn',
		'no-unused-vars': 'off',
		'no-warning-comments': 'off',
		'no-console': 'warn',
		'n/file-extension-in-import': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		'react/boolean-prop-naming': [
			'error',
			{ rule: '^(is|has|should)[A-Z]([A-Za-z0-9]?)+' },
		],
		'prefer-arrow-callback': ['warn', { allowNamedFunctions: true }],
		'max-params': ['warn', 6],
		'unicorn/filename-case': ['OFF'],
		'react/no-array-index-key': 'off',
		'@typescript-eslint/ban-types': 'off',
		'react/jsx-no-useless-fragment': 'off',
	},
	overrides: [
		{
			files: ['./**/*.ts', './**/*.tsx'],
			rules: {
				'@typescript-eslint/no-unsafe-assignment': 'warn',
				'@typescript-eslint/naming-convention': [
					'warn',
					{
						selector: 'variable',
						format: ['PascalCase'],
						prefix: [
							'is',
							'should',
							'has',
							'can',
							'did',
							'will',
							'show',
							'hide',
						],
						types: ['boolean'],
					},
					{
						selector: ['class'],
						format: ['PascalCase'],
						prefix: ['_'],
					},
					{
						selector: 'interface',
						format: ['PascalCase'],
						prefix: ['I'],
					},
					{
						selector: 'enum',
						format: ['PascalCase'],
						prefix: ['E'],
					},
					{
						selector: 'typeAlias',
						format: ['PascalCase'],
						prefix: ['T'],
					},
				],
			},
		},
		{
			files: ['./**/*.cjs'],
			rules: {
				'@typescript-eslint/naming-convention': 'OFF',
			},
		},
		{
			files: ['./**/*.stories.ts', './**/*.stories.tsx'],
			rules: {
				'react-hooks/rules-of-hooks': 'warn',
			},
		},
		{
			files: ['./**/*.cjs'],
			rules: {
				'@typescript-eslint/naming-convention': 'OFF',
			},
		},
	],
}
