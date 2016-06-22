#!/bin/zsh

PRT=3000
CWD="${pwd}"

for i in "$@"
do
  case $i in
    -p=*|--port=*)
      PRT="${i#*=}"
      shift # past argument=value
      ;;
  esac
done

SOURCE="${BASH_SOURCE[0]}"

while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done

DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

cd "${DIR}/../"

if grep -Fxq "localhost:${PRT}" public/index.html
then
  echo build found! starting server..;
else
  echo build not found! yarak;

  #npm run deploy:prod && node_modules/.bin/http-server -p "${PRT}" -o
  node_modules/.bin/http-server -p "${PRT}" -o

fi

cd $CWD
