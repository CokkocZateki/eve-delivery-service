rm -Rf dist

pidof angular-cli | xargs kill -9
nohup ng serve -prod > web.out 2> web.err < /dev/null &
