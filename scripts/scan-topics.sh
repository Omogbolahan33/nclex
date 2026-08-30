#!/bin/bash
# Collision checker. Usage: ./scan.sh "term1|term2" "term3" ...
# NOTE: always bare-pipe ERE. A backslash-pipe in ERE is a LITERAL pipe.
for t in "$@"; do
  printf "%-50s " "$t"
  c=$(grep -rliE "$t" js/*.js 2>/dev/null | tr '\n' ' ')
  echo "${c:-FREE}"
done
