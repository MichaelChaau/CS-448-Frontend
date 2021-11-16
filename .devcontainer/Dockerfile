FROM mcr.microsoft.com/vscode/devcontainers/javascript-node

WORKDIR /usr/app
COPY ./ /usr/app

#RUN npm install -g @commitlint/cli @commitlint/config-conventional \
#    && echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js 
#    && npm install husky --save-dev 
#    && npx husky install \
#    && npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
