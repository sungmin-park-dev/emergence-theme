# frozen_string_literal: true

source "https://rubygems.org"

# Core Jekyll
gem "jekyll", "~> 4.3"

# Jekyll plugins
gem "jekyll-archives"
gem "jekyll-seo-tag"
gem "jekyll-sitemap"
gem "jekyll-feed"
gem "jekyll-paginate"

# Sass compiler (required for @use module system / Dart Sass)
gem "sass-embedded"

# Markdown processor
gem "kramdown-parser-gfm"

# HTML validation
gem "html-proofer", "~> 5.0", group: :test

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:mingw, :x64_mingw, :mswin]
