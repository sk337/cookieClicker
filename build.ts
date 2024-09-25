import autoprefixer from "autoprefixer";
import postcss from "postcss";
import * as fs from "fs";
import { build } from "bun";
import { BunPlugin, type OnLoadResult } from "bun";
import tailwind from "tailwindcss"

let postCssPlugin: BunPlugin = {
    name: "PostCss",
    setup: async function (build) {
        // @ts-expect-error it works :shrug:
        build.onLoad({ filter: /\.(css)$/ }, async (args) => {
            const text = await Bun.file(args.path).text();

            let result = await postcss([autoprefixer, tailwind]).process(text, { from: args.path })

            const v = {
                contents: result.css, loader: "text"
            }
            return v;

        })
    }
};


fs.rmdirSync("dist", { recursive: true });
fs.mkdirSync("dist")

build({
    entrypoints: ["src/index.ts"],
    minify: true,
    outdir: "dist",
    plugins: [postCssPlugin]
})

