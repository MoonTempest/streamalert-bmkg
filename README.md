# streamalert-bmkg

Get alerts for Indonesian earthquakes as a stream overlay, using BMKG data.

## Installation instructions

1. Create a new Browser Source inside OBS
2. Set the source URL to the static app: https://streamalert-bmkg.netlify.app/

## Contents of this projects

This project contains:

* The Cloudflare Worker powering the presentation layer, caching BMKG API

* The actual stream overlay itself, hosted as a static page
