---
title: My Vim Broke — Or My Go?
layout: post
tags:
  - Techy
  - Vim
  - Golang
  - Challenge
date: 2016-06-09 03:37:56
---
For the past three days, I have a problem with my Vim. My [MacVim](https://macvim-dev.github.io/macvim/), to be precise. I have been working on some [Golang](https://golang.org/) projects lately, and I use [vim-go](https://github.com/fatih/vim-go) for quite some time. For reasons unknown &mdash; okay, I *forgot* what I did &mdash; it spewed out an error saying that `goimports does not support srcdir` when I tried to save a file.

At that very first occurrence, I decided: __*I will not Google this shit*__.

I took notes for the steps I did and hoped I  don't get stuck and succumb.
<!-- more -->
As it turns out, by some great luck, it's fixed. Here's what happened.

__TL;DR__ &rarr; I re-installed some stuff using different configurations.

The error popped out. MacVim forced me to tap a key after the error shows up and I can get to edit again. I checked my `.vimrc`&hellip; nothing seems out of context. I checked my `go env`, all looks good. Strange.

I remember I installed go from the official package, so my `$GOROOT` is pointed to `/usr/local/go`. Oh well, it's been long since I updated to 1.5 anyway, let's just demolish them and try installing them via [Homebrew](http://brew.sh/). So I did. I removed `usr/local/go` and execute `brew install go`. Hello, 1.6.2!

MacVim still broken. Of course.

After I read some `:help vim-go`, I tried `:GoUpdateBinaries` and let it install things to my `$GOPATH/bin`. Error message still persists. At that time I got my [iTerm](https://www.iterm2.com/) opened and I just want to double check my environment variables on my `.zshrc`.

So I fired up `vim` &mdash; <sup><sub>hooray muscle memory</sub></sup>.

Just when I opened my [session](https://github.com/xolox/vim-session) menu, I thought hey, "_Hold on a second. Let's try do some Go stuff from terminal vim_". Shocking truth: __everything works__. The troubled `goimports`, `:GoDef`, everything works.

For the next four days, I did my daily tasks using terminal vim. I really have nothing to complain except for its rendering time.

Four days. Slow renders. I miss MacVim.

I tried switching back and used `gofmt` instead of `goimports`. It works, but no imports automation. Sucks.

I tried re-installing my MacVim with system Ruby, Python 2, etc. Back to basic. No Python 3, lua-jit, etc. Removed not-that-much-used plugins&hellip; no luck. Then I realized, `gofmt` is installed in `/usr/local/go/bin` and it works, but my `$GOPATH/bin` didn't get picked up.

I set my`$GOBIN`, then. I pointed my `$GOBIN` to `/usr/local/go/bin` and run `:GoUpdateBinaries`.

Voila! MacVim now works with `vim-go` and all its binaries installed on `/usr/local/go/bin`.

## Conclusions

I'm not really sure I fixed it because I:

- Re-installed Go using Homebrew, now using Go 1.6.2 instead of 1.5
- Re-installed MacVim using system Ruby
- Point `$GOBIN` to `/usr/local/go/bin`

&hellip; but I fixed it without Googling. It takes more time, for sure, but I think I'll do this kind of practice every once in a while. I don't want to be that one guy who just so good at querying questions. I want to fix things.

