---
title: Vim + Standard.js
layout: post
tags:
  - Techy
  - Vim
  - StandardJS
date: 2016-09-22 03:16:38
---
I never really took an in-depth look into [React](https://facebook.github.io/react/) because for the past ~~weeks~~ ~~months~~ year my work only demands things grown out of [Ruby](https://www.ruby-lang.org/en/) or [Go](https://golang.org/), and if I have to write things in JavaScript (that's quite a lot, too, but let's save it for later), I keep using my outdated `.eslintrc` because that's how I usually typed them.

After spending an hour on [ReactJS Program](http://www.reactjsprogram.com/) &mdash;<sup><sub>kudos to Tyler McGinnis, what a great mentor!</sub></sup>&mdash; I finally realized that it is time to update my linter configurations. Nobody likes to do that. This ritual has to end. So, no motives, I was just being lazy when I found out about [StandardJS](http://standardjs.com/).

Where have I been? I know, right? This whole article is about laziness and living under a rock. Also, I hate iOS 10.
<!-- more -->
Naturally, the first thing I did was, as stated on [StandardJS' Github Page](https://github.com/feross/standard):

    npm install standard --global

Then I scrolled down a bit and found out that the command `standard` can be used as a [Syntastic](https://github.com/scrooloose/syntastic) checker as well. Neat. So I put this on my `.vimrc`

    let g:syntastic_javascript_checkers = ['standard']
    autocmd bufwritepost *.js silent !standard-format -w %
    set autoread

It worked. It auto-formatting my poorly written JavaScript. No semicolons. Cool. So I boldly removed my other checkers (at that time, [ESlint](http://eslint.org/) and [JShint](http://jshint.com/)), and all their `rc` files.

As I mentioned earlier, I was doing this [ReactJS Program](http://www.reactjsprogram.com/), and boy, jsx sure makes me cringe. That's when I found out that the `standard` Syntastic checker is not as.. hm, how should I put it.. strict.

I messed things up hoping for a warning to pop out, but it didn't. Well, I guess it's not _really there_ yet.

Fuck it. I'm being lazy. Phoenix Down.

    npm install -g eslint eslint-config-standard \
      eslint-config-standard-react eslint-config-standard-jsx \
      eslint-plugin-promise eslint-plugin-react eslint-plugin-standard

There.

I resurrected my `.eslintrc` to my home folder, swapping all my rules with only this line:

    { "extends": ["standard", "standard-react"] }

Then I found out that [standard-format](https://github.com/maxogden/standard-format) is actually **experimental**, so here's my final `.vimrc` to get ESlint and StardardJS dance with my Vim.

    let g:syntastic_javascript_checkers = ['standard', 'eslint']
    let g:syntastic_javascript_standard_exec = "/usr/local/bin/standard"
    let g:syntastic_javascript_eslint_exec = "/usr/local/bin/eslint"
    autocmd bufwritepost *.js silent !standard --fix -w %
    set autoread

Laziness 1 - 0 Configs.
