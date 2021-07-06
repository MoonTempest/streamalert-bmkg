# streamalert-bmkg

Get alerts for Indonesian earthquakes as a stream overlay, using BMKG data. The alert will show Magnitude, Depth, Epicenter Location, and Affected areas of the Earthquake. Due to the nature of BMKG, the alert may / most likely will trigger after the Earthquake already happened.

## Installation instructions

1. Create a new Browser Source inside OBS
2. Set the source URL to the static app: https://streamalert-bmkg.netlify.app/
3. Make sure the Browser Source Resolution matches your Canvas (1280 x 720 or 1920 x 1080)
4. Put it as the First layer to make sure its visible when it got triggered, and lastly
5. Put it on every scene

## Contents of this projects

This project contains:

* The Cloudflare Worker powering the presentation layer, caching BMKG API

* The actual stream overlay itself, hosted as a static page
