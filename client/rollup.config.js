import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';
export default {
    input: './index.ts',
    output: {
        file: './static/scripts/index.js',
        format: 'cjs'
    },
    plugins: [          
        typescript({
            tsconfig: '../tsconfig.json'
        }),
        commonjs({
            extensions: ['.js', '.ts']
        }),          
        uglify({
            mangle: true,
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: false
            }
        }),
    ]
}