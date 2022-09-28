echo $SHELL
cat /etc/shells
echo 'abc123!' | chsh -s /bin/zsh
echo $SHELL
cd dictionary-api
pwd
node ./src/service.js --NODE_ENV=prod &
# pm2 start ./src/service.js
