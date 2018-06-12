#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run parcel

# navigate into build output directory
cd dist

# initialize git and deploy build files
git init
git config user.name "Romanna Semenyshyn"
git config user.email "romasemenyshyn@gmail.com"
git add -A
git commit -m 'deploy'
git push -f https://github.com/RomSem/To-do-List master:gh-pages

# remove git folder
rm -rf .git

# go back
cd -
