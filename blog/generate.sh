#!/bin/zsh
mv _config.butterfly.yml config2.yml
mv config-butterfly-en.yml _config.butterfly.yml
hexo clean && hexo g --config="config-en.yml"
mv -f _config.butterfly.yml config-butterfly-en.yml
mv -f config2.yml _config.butterfly.yml
hexo clean && hexo g
mv -f public-en/ public/en/