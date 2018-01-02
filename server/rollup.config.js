import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify-es';

export default {
    entry: './index.ts',
    dest: 'index.js',
    format: 'cjs',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            preferBuiltins: true
        }),
        typescript({
            tsconfig: '../tsconfig.json'
        }),
        commonjs({
            extensions: ['.js', '.ts']
        }),
        json(),      
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