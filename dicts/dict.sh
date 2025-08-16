#!/usr/bin/env bash
# dict.sh

for i in $(seq 13620243 99999999); do
  printf '%08d\n' $i >> 0-9-8.txt
done
