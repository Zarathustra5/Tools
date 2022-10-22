#!/usr/bin/env
# build.sh

#Colors
fg_cyan="\033[0;36m"
fg_purple="\033[0;35m"
fg_yellow="\033[1;33m"
fg_green="\033[1;32m"
bg_green="\033[30;42m"
bg_red="\033[1;41m"
nc="\e[0m"

#Startup
echo -e "$fg_cyan
       ▄▄▄▄▄  ▄▄▄ · ▄▄▄             ▄▄▄▄▄· ▄▄▄   ▄▄▄
      ▐█ . ▪ █  ▐▌ █  ▐▌             ▪ ▐█ █  ▐▌ █ ▪▐▌
       ▀▀▀█▄ █  ▐▌ █  ▐▌ ▄█▀▄  ▄▀▀▄     █ █ .▐▌ █  ▐▌
       ▄  ▐█ █▌.▐▌ █▌ ▐▌ █▌ ▐▌ █▀▀█ .  ▐█ █▌ ▐▌ █▌.▐▌
        ▀▀▀   ▀▀▀▪  ▀▀▀  ▀▀ ▀▀ ▀  ▀    ▀▀  ▀▀▀  ▪▀▀▀
$nc"

cd !site-path!
echo -ne "$fg_purple ==> $nc Current location is: "; pwd; echo

git pull

res=$?
if [[ $res -ne 0 ]]
then
  echo -e "\n $bg_red Error: git pull failed $nc"
  exit $res
fi

build(){
  if [[ `git diff HEAD@{1} -- $1/assets/ $1/src/ $1/gulpfile.js $1/package.json` ]]; then
    cd $1
    echo -e "\n  $fg_purple ==> $nc Current location is:"; pwd; echo
    $2
    if [[ $? -ne 0 ]]; then
      echo -e "\n  $fg_yellow ==> $nc Warning: $2 of the $3 failed, trying npm install"
      npm i
      $2
      res=$?
      if [[ $res -ne 0 ]]; then
        echo -e "\n $bg_red Error: $2 of the $3 failed $nc"
        exit $res
      fi
    fi
    cd -
    echo -e "\n  $fg_green ==> $nc Success $2 of the $3"
  else
    echo -e "\n  $fg_purple ==> $nc No need in $2 of the $3"
  fi
}

build !build-diretory-path! !build-command! !build-name!

echo -e "\n $bg_green Job successed $nc \n"
