import { BunPlugin, type OnLoadResult } from "bun";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss"
import postcss from "postcss";
import * as fs from "fs";

export default {
    name: "PostCss",
    setup: async function (build) {
        // @ts-expect-error it works :shrug:
        build.onLoad({ filter: /\.(css)$/ }, async (args) => {
            const text = await Bun.file(args.path).text();

            let result = await postcss([autoprefixer, tailwind]).process(text, {from: args.path})

            const v = {
                contents: result.css, loader: "text"
            }
            return v;

        })
    }
} as BunPlugin
