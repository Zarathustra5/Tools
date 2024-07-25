#!/usr/bin/env bash
# backup.sh

TAR_CMD='tar -cJf'

if [ -z "$1" ]; then
  echo "Usage: " $0 " <dir_1> <dir_2> .. <dir_n>"
else
  while (( "$#" )); do
    BACKUP_DIR=$1
    B_FILE_TMPL="backup"
    F_NAME=$B_FILE_TMPL-$(echo $BACKUP_DIR | tr '/' '-')-$(date +%Y-%m-%d_%H:%M).tar.xz
    $TAR_CMD $HOME/$F_NAME $BACKUP_DIR
    shift
  done
fi
