source 'https://rubygems.org'

require "json"
require "open-uri"

versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem "nokogiri", ">= 1.10.4"
gem 'github-pages', versions['github-pages']
