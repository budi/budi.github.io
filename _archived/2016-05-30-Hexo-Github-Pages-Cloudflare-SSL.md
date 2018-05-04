---
title: 'Hexo, Github Pages, CloudFlare, SSL : Holy Shit'
layout: post
tags:
  - Techy
  - Hexo
  - Github
  - CloudFlare
date: 2016-05-30 11:53:40
---
If the title is not obscure enough, this post is all you need to create a [Hexo](https://hexo.io/) blog, publish it on [Github Pages](https://pages.github.com/), set up your custom domain, and use the [flexible SSL](https://www.cloudflare.com/ssl/) from [CloudFlare](https://www.cloudflare.com/). Your shiny [blag](https://xkcd.com/148/) will soon be served over https! Yay!

I assume that you are familiar with Hexo and Github, and you know how to push things to a repository.

If you're not &mdash; but willing to learn, &mdash; spend a couple minutes doing Christopher's "[Getting Started with the Hexo Blogging Framework](https://www.cgmartin.com/2016/01/03/getting-started-with-hexo-blog/)" and Github's [Hello World Project](https://guides.github.com/activities/hello-world/). As the more advanced people already being impatient, let's get started.
<!-- more -->
This post is heavily inspired by Sheharyar Naseer's article "[Set Up SSL on Github Pages With Custom Domains for Free](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains/)" with some adaptation for Hexo. Check out his blog! He writes interesting stuffs.

## TL;DR

- Create a Github repository `<username>.github.io`
- Install [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
- Change the main `_config.yml` to include git deployment
- Generate and deploy to the repository: `hexo g && hexo d`
- Update __A__-records and __CNAME__ on CloudFlare to match [Github's IP](https://help.github.com/articles/setting-up-an-apex-domain/)
- Change CloudFlare __SSL__ setting on `Crypto` tab to `Flexible`
- Add CNAME file with your domain on `source` directory
- Re-generate and re-deploy to the repository

## Getting Your Blog Up on Github Pages

So you wrote your post and it's served on your port 4000 when you run `hexo s`. Neat.  Now, create a new repository on Github called `<username>.github.io` (mine would be [budi.github.io](https://github.com/budi/budi.github.io)) &mdash; yes, that is a repository name.

You would also want to install [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) to ease up things. On your project directory, run:

    npm install hexo-deployer-git --save

Edit your main `_config.yml` file to include these lines:

    deploy:
      type: git
      repo: git@github.com:<username>/<username>.github.io.git

If you haven't [setup your SSH public key](https://help.github.com/articles/generating-an-ssh-key/), you might want to use https on the `repo` field instead, like so:

    deploy:
      type: git
      repo: https://github.com/<username>/<username>.github.io.git

Generate your blog with `hexo g`, and you will see files piling up on the `public` folder of your project directory. Now run `hexo d`, wait until it's all done and viola! Your blog is now up on Github Pages! Open up `<username>.github.io` on your browser and rejoice.

## Setting Up CloudFlare

I'm not gonna go into details here, just follow [these steps](https://support.cloudflare.com/hc/en-us/categories/200275218-Getting-Started) to change your domain name servers to use CloudFlare. If you already setup your domain using CloudFlare before, you can skip ahead to the next step. Upon adding your website, CloudFlare should automatically detect and generate records that match the records on your registrar.

While you're on CloudFlare, you can add your domain to point to your Github Pages. My strategy is to use my apex domain (budidharmawan.com) and redirect my `www` subdomain to my apex domain. So on my DNS records, I made sure of these three records:

    TYPE    NAME                VALUE               TTL         DNS & HTTP PROXY
    ----------------------------------------------------------------------------
    A       budidharmawan.com   192.30.252.153      Automatic   Both
    A       budidharmawan.com   192.30.252.154      Automatic   Both
    CNAME   www                 budidharmawan.com   Automatic   Both

The two IP addresses above is what Github use to serve custom domains. Still on CloudFlare, also check on the `Crypto` tab on your domain and make sure to set the SSL to `Flexible`.

Next step is to setup CNAME so that Github knows you're using custom domain. On your `source` directory, add a file called `CNAME` &mdash; all caps &mdash; with your domain name in it. You can just run this command:

    echo your-domain.com >> CNAME

Generate and deploy your blog to your Github page once again (on your project directory):

    hexo g && hexo d

Check if the site is live on your custom domain. Open up your browser and go to your custom domain. It should already display your site! Nice~

## Details, details, details

Now you can _actually_ try to open your site over https and it will show up just fine. But there are some things you need to add/change to make it better.

On your main `_config.yml` file, edit the `url` setting to use https:

    url: https://your-domain.com

Add canonical link to your site's `<head>`:

    <link rel="canonical" href="<%= config.url %>" />

As mentioned on Sheharyar's post, also add this script on your head to redirect user from http to https:

    <script type="text/javascript">
      var host = "yoursite.com";
      if ((host == window.location.host) && (window.location.protocol != "https:"))
        window.location.protocol = "https";
    </script>

## That's It!

Now your site is served over https! For free! &mdash; <sup><sub>Aside for the domain etc, etc..</sub></sup>

