import autoprefixer from "autoprefixer";
import postcss from "postcss";
import * as fs from "fs";
import { build } from "bun";
import postCssPlugin from "./postCssPlugin";

fs.rmdirSync("dist", {recursive: true });
fs.mkdirSync("dist")

build({
    entrypoints: ["src/index.ts"],
    minify: true,
    outdir: "dist",
    plugins: [postCssPlugin]
})

// fs.readFile('src/app.css', (err, css) => {
//     postcss([autoprefixer])
//         .process(css, { from: 'src/app.css', to: 'dest/app.css' })
//         .then(result => {
//             fs.writeFile('dest/app.css', result.css, () => true)
//             if (result.map) {
//                 fs.writeFile('dest/app.css.map', result.map.toString(), () => true)
//             }
//         })
// })