#!/bin/bash

# If deploying, make sure you are on the gh-pages branch
ng build --prod --output-path docs --base-href /playlists-taylors-version/

cp docs/index.html docs/404.html