#!/usr/bin/env
# deploy.sh

#Colors
fg_cyan="\033[0;36m"
fg_purple="\033[0;35m"
fg_yellow="\033[1;33m"
fg_green="\033[1;32m"
bg_green="\033[30;42m"
fg_red="\033[1;31m"
bg_red="\033[1;41m"
nc="\e[0m"

clear

#Startup
echo -ne "\n $fg_red ==> $nc Welcome to the deploy application!!! $fg_red <== $nc\n"

echo -e "$fg_red
       ▄▄▄▄▄  ▄▄▄ · ▄▄▄             ▄▄▄▄▄· ▄▄▄   ▄▄▄     
      ▐█ . ▪ █  ▐▌ █  ▐▌             ▪ ▐█ █  ▐▌ █ ▪▐▌    
       ▀▀▀█▄ █  ▐▌ █  ▐▌ ▄█▀▄  ▄▀▀▄     █ █ .▐▌ █  ▐▌    
       ▄  ▐█ █▌.▐▌ █▌ ▐▌ █▌ ▐▌ █▀▀█ .  ▐█ █▌ ▐▌ █▌.▐▌    
        ▀▀▀   ▀▀▀▪  ▀▀▀  ▀▀ ▀▀ ▀  ▀    ▀▀  ▀▀▀  ▪▀▀▀      
$nc"

echo -ne "\n $fg_purple ==> $nc Current location is: "; pwd

installWP(){
  echo -ne "\n $fg_purple ==> $nc Wordpress version: "
  read version
  wget "https://wordpress.org/wordpress-$version.tar.gz"
  res=$?
  if [[ $res -ne 0 ]]; then
    echo -e "\n $bg_red Error: Wordpress version was not found $nc"
    exit $res
  fi
  tar -xvf "wordpress-$version.tar.gz" &&
  rm "wordpress-$version.tar.gz" &&
  rm -r wordpress/wp-content/ &&
  mv wordpress/* ./ &&
  rmdir wordpress
}
installWP

build(){
  cd wp-content/themes/
  count=0
  echo -e "\n $fg_purple ==> $nc Available themes: "
  for i in */; do
    echo -e "$fg_green    + $nc $i"
    theme=$i
    count=$count+1
  done
  if [[ $count -gt 1 ]]; then
    theme=0
    while ! [[ `find -maxdepth 1 -name $theme` ]]; do
      echo -ne "\n $fg_purple ==> $nc Write theme's name: "
      read theme
    done
  elif [[ $count -lt 1 ]]; then
    echo -e "\n $bg_red Error: No themes found $nc"
    exit 1
  fi
  cd $theme
  npm i
  gulp build
  composer i
}
build

importDB(){
  echo -e "\n $fg_yellow ==> $nc Warning, database should be already created in the ispmanager"
  echo -ne "\n $fg_purple ==> $nc Enter a database's name: "
  read database
  echo -e "\n $fg_yellow ==> $nc Warning, the importing file should be in the /root/ directory"
  echo -ne "\n $fg_purple ==> $nc Enter a name of the exported file (name.sql.gz): "
  read path
  gunzip < "/root/$path" | mysql -u root $database
  echo -ne "\n $fg_purple ==> $nc Importing: "
  while ps -p $! > /dev/null; do
    echo -n "- "
    sleep 1
  done
  echo
}

echo -ne "\n $fg_purple ==> $nc Would you like to import a database? (y/N): "
read answer
case $answer in
  "y" | "Y" | "e" | "E" | "yes" | "YES" | "Yes" ) importDB;;
esac

echo -e "\n $bg_green Deploy successed $nc \n"
