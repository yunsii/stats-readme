<p align="center">
  <a href="https://github.com/yunsii/stats-readme/actions"><img alt="stats-readme status" src="https://github.com/yunsii/stats-readme/workflows/build-test/badge.svg"></a>
</p>

# Stats Readme

> GitHub Stats on your Profile Readme

## Gallery

✨ GitHub Stats

<!--START_SECTION:stats-->

```text
Total Stars Earned     734                
Total Commits (2023)   680                 ╔═╗    
Total PRs              60                  ╠═╣ ═╬═
Total Issues           139                 ╩ ╩    
Contributed to         36                 
```

<!--END_SECTION:stats-->

✨ Most Used Languages

<!--START_SECTION:stats:langs-->

```text
TypeScript   60.40%   >>>>>>>>>>>>>>>----------
JavaScript   18.66%   >>>>>--------------------
Less         13.59%   >>>----------------------
HTML         1.61%    -------------------------
MDX          1.52%    -------------------------
```

<!--END_SECTION:stats:langs-->

📦 Awesome NPM Packages

<!--START_SECTION:npm-packages-->

```text

| Name | Description | Version | Downloads |
| ---- | ----------- | ------- | --------- |
| tailwindcss-plugin-iconify | Use any SVG icon powered by Iconify for Tailwind CSS, easy to use local icons and figma icons in particular. | [![NPM version](https://img.shields.io/npm/v/tailwindcss-plugin-iconify?color=a1b858)](https://www.npmjs.com/package/tailwindcss-plugin-iconify) | [![Download monthly](https://img.shields.io/npm/dm/tailwindcss-plugin-iconify.svg?color=a1b858))](https://www.npmjs.com/package/tailwindcss-plugin-iconify |
| @jannajs/lint | - | [![NPM version](https://img.shields.io/npm/v/@jannajs/lint?color=a1b858)](https://www.npmjs.com/package/@jannajs/lint) | [![Download monthly](https://img.shields.io/npm/dm/@jannajs/lint.svg?color=a1b858))](https://www.npmjs.com/package/@jannajs/lint |
| selection-extra | - | [![NPM version](https://img.shields.io/npm/v/selection-extra?color=a1b858)](https://www.npmjs.com/package/selection-extra) | [![Download monthly](https://img.shields.io/npm/dm/selection-extra.svg?color=a1b858))](https://www.npmjs.com/package/selection-extra |
| postcss-antd-fixes | - | [![NPM version](https://img.shields.io/npm/v/postcss-antd-fixes?color=a1b858)](https://www.npmjs.com/package/postcss-antd-fixes) | [![Download monthly](https://img.shields.io/npm/dm/postcss-antd-fixes.svg?color=a1b858))](https://www.npmjs.com/package/postcss-antd-fixes |
| fasttext.wasm.js | - | [![NPM version](https://img.shields.io/npm/v/fasttext.wasm.js?color=a1b858)](https://www.npmjs.com/package/fasttext.wasm.js) | [![Download monthly](https://img.shields.io/npm/dm/fasttext.wasm.js.svg?color=a1b858))](https://www.npmjs.com/package/fasttext.wasm.js |
| tagged-classnames-free | - | [![NPM version](https://img.shields.io/npm/v/tagged-classnames-free?color=a1b858)](https://www.npmjs.com/package/tagged-classnames-free) | [![Download monthly](https://img.shields.io/npm/dm/tagged-classnames-free.svg?color=a1b858))](https://www.npmjs.com/package/tagged-classnames-free |
| idlization | - | [![NPM version](https://img.shields.io/npm/v/idlization?color=a1b858)](https://www.npmjs.com/package/idlization) | [![Download monthly](https://img.shields.io/npm/dm/idlization.svg?color=a1b858))](https://www.npmjs.com/package/idlization |
| use-selection-extra | - | [![NPM version](https://img.shields.io/npm/v/use-selection-extra?color=a1b858)](https://www.npmjs.com/package/use-selection-extra) | [![Download monthly](https://img.shields.io/npm/dm/use-selection-extra.svg?color=a1b858))](https://www.npmjs.com/package/use-selection-extra |
| onionkit | - | [![NPM version](https://img.shields.io/npm/v/onionkit?color=a1b858)](https://www.npmjs.com/package/onionkit) | [![Download monthly](https://img.shields.io/npm/dm/onionkit.svg?color=a1b858))](https://www.npmjs.com/package/onionkit |
| @vitjs/vit | 🛠 React application framework inspired by UmiJS. | [![NPM version](https://img.shields.io/npm/v/@vitjs/vit?color=a1b858)](https://www.npmjs.com/package/@vitjs/vit) | [![Download monthly](https://img.shields.io/npm/dm/@vitjs/vit.svg?color=a1b858))](https://www.npmjs.com/package/@vitjs/vit |

```

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
