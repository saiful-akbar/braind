#!/bin/sh
yarn build
cp public/_nuxt/index.html resources/views/index.blade.php
# sh deploy_hosting.sh