<p align="center">
  <a href="https://github.com/yunsii/stats-readme/actions"><img alt="stats-readme status" src="https://github.com/yunsii/stats-readme/workflows/build-test/badge.svg"></a>
</p>

# Stats Readme

> GitHub Stats on your Profile Readme

## Gallery

✨ GitHub Stats

<!--START_SECTION:stats-->

```text
Total Stars Earned      857
Total Commits           4193
Total Commits (2024)    687                  ╔═╗
Total PRs               84                   ╠═╣
Total Issues            201                  ╩ ╩
Contributed to (2024)   26
```

<!--END_SECTION:stats-->

✨ Most Used Languages

<!--START_SECTION:stats:langs-->

```text
TypeScript   61.26%   >>>>>>>>>>>>>>>----------
JavaScript   18.01%   >>>>>--------------------
Less         13.08%   >>>----------------------
CSS          1.98%    -------------------------
HTML         1.58%    -------------------------
```

<!--END_SECTION:stats:langs-->

📦 Awesome NPM Packages

<!--START_SECTION:npm-packages-->


| Name | Description | Version | Downloads |
| ---- | ----------- | ------- | --------- |
| postcss-antd-fixes | - | [![NPM version](https://img.shields.io/npm/v/postcss-antd-fixes?color=a1b858)](https://www.npmjs.com/package/postcss-antd-fixes) | [![Download monthly](https://img.shields.io/npm/dm/postcss-antd-fixes.svg?color=a1b858)](https://www.npmjs.com/package/postcss-antd-fixes) |
| fasttext.wasm.js | Node and Browser env supported WebAssembly version of fastText: Library for efficient text classification and representation learning. | [![NPM version](https://img.shields.io/npm/v/fasttext.wasm.js?color=a1b858)](https://www.npmjs.com/package/fasttext.wasm.js) | [![Download monthly](https://img.shields.io/npm/dm/fasttext.wasm.js.svg?color=a1b858)](https://www.npmjs.com/package/fasttext.wasm.js) |
| tagged-classnames-free | Free to use tagged classnames, powered by clsx and tailwind-merge. | [![NPM version](https://img.shields.io/npm/v/tagged-classnames-free?color=a1b858)](https://www.npmjs.com/package/tagged-classnames-free) | [![Download monthly](https://img.shields.io/npm/dm/tagged-classnames-free.svg?color=a1b858)](https://www.npmjs.com/package/tagged-classnames-free) |
| unplugin-polish-tagged-templates | Remove unnecessary tagged templates at compile time. | [![NPM version](https://img.shields.io/npm/v/unplugin-polish-tagged-templates?color=a1b858)](https://www.npmjs.com/package/unplugin-polish-tagged-templates) | [![Download monthly](https://img.shields.io/npm/dm/unplugin-polish-tagged-templates.svg?color=a1b858)](https://www.npmjs.com/package/unplugin-polish-tagged-templates) |
| pixi-tagged-text-plus | TaggedText for pixi.js | [![NPM version](https://img.shields.io/npm/v/pixi-tagged-text-plus?color=a1b858)](https://www.npmjs.com/package/pixi-tagged-text-plus) | [![Download monthly](https://img.shields.io/npm/dm/pixi-tagged-text-plus.svg?color=a1b858)](https://www.npmjs.com/package/pixi-tagged-text-plus) |
| tailwindcss-plugin-iconify | Use any SVG icon powered by Iconify for Tailwind CSS, easy to use local icons and figma icons in particular. | [![NPM version](https://img.shields.io/npm/v/tailwindcss-plugin-iconify?color=a1b858)](https://www.npmjs.com/package/tailwindcss-plugin-iconify) | [![Download monthly](https://img.shields.io/npm/dm/tailwindcss-plugin-iconify.svg?color=a1b858)](https://www.npmjs.com/package/tailwindcss-plugin-iconify) |
| unplugin-svg-sprite | Unified plugin system for svg sprite | [![NPM version](https://img.shields.io/npm/v/unplugin-svg-sprite?color=a1b858)](https://www.npmjs.com/package/unplugin-svg-sprite) | [![Download monthly](https://img.shields.io/npm/dm/unplugin-svg-sprite.svg?color=a1b858)](https://www.npmjs.com/package/unplugin-svg-sprite) |
| lingui-swc-plugin-patch | A SWC Plugin for LinguiJS | [![NPM version](https://img.shields.io/npm/v/lingui-swc-plugin-patch?color=a1b858)](https://www.npmjs.com/package/lingui-swc-plugin-patch) | [![Download monthly](https://img.shields.io/npm/dm/lingui-swc-plugin-patch.svg?color=a1b858)](https://www.npmjs.com/package/lingui-swc-plugin-patch) |
| @jannajs/lint | > 代码规范初始化工具 | [![NPM version](https://img.shields.io/npm/v/@jannajs/lint?color=a1b858)](https://www.npmjs.com/package/@jannajs/lint) | [![Download monthly](https://img.shields.io/npm/dm/@jannajs/lint.svg?color=a1b858)](https://www.npmjs.com/package/@jannajs/lint) |
| lingui-message-utils-patch | Make `@lingui/message-utils` generated id without `"/"` | [![NPM version](https://img.shields.io/npm/v/lingui-message-utils-patch?color=a1b858)](https://www.npmjs.com/package/lingui-message-utils-patch) | [![Download monthly](https://img.shields.io/npm/dm/lingui-message-utils-patch.svg?color=a1b858)](https://www.npmjs.com/package/lingui-message-utils-patch) |


<!--END_SECTION:npm-packages-->

## Usage

- Save the README file after copy-pasting the following special comments. Your GitHub stats will show up in between.

  ```md
  <!--START_SECTION:stats-->
  <!--END_SECTION:stats-->

  <!--START_SECTION:stats:langs-->
  <!--END_SECTION:stats:langs-->

  <!--START_SECTION:npm-packages-->
  <!--END_SECTION:npm-packages-->
  ```

- Create a new workflow file (`stats-readme.yml`) inside `.github/workflows/` folder of your repository. You can create it from a template using *the actions* tab of your repository too.
- Clear any existing contents, add the following lines and save the file.

  ```yml
  name: Stats Readme

  on:
    workflow_dispatch:
    schedule:
      - cron: "0 21 */2 * *" # Runs at 21:00 UTC on the 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29 and 31st of every month

  jobs:
    update-readme:
      name: Update GitHub Stats
      runs-on: ubuntu-latest
      steps:
        - uses: yunsii/stats-readme@main
          with:
            npm-packages-author: theprimone
            # npm-packages-exclude: demo
            # npm-packages-max-show-packages: 10
            # npm-packages-version-badge-color: a1b858
            # npm-packages-download-badge-color: a1b858
  ```


## Credits

- [athul/waka-readme](https://github.com/athul/waka-readme)
- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
