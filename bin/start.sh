#!/bin/bash

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

NODE_ENV=production PORT=PRT npm run deploy:prod && node_modules/.bin/http-server -p "${PRT}" -o
