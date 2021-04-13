#!/usr/bin/env bash
export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
ENV_JSON=/usr/share/nginx/html/env.json
cat $ENV_JSON | envsubst $EXISTING_VARS | tee $ENV_JSON
nginx -g 'daemon off;'
