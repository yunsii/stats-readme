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
Total Commits (2023)   671                 ╔═╗    
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
