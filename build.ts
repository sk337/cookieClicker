import autoprefixer from "autoprefixer";
import postcss from "postcss";
import * as fs from "fs";
import { build, Plugin } from "esbuild";
import tailwind from "tailwindcss"

let postCssPlugin: Plugin = {
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
    entryPoints: ["src/index.ts"],
    format: "cjs",
    bundle: true,
    minify: true,
    legalComments: "none",
    outdir: "dist",
    plugins: [postCssPlugin],
})

