#!/bin/zsh

PRT=3000

for i in "$@"
do
  case $i in
    -p=*|--port=*)
      PRT="${i#*=}"
      shift # past argument=value
      ;;
  esac
done

DROOT=$(npm root)/test-designer-gui/public
node_modules/.bin/http-server $DROOT -p $PRT -d False -o
