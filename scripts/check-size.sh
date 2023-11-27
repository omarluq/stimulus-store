#!/bin/bash

convertToBytes() {
  local size=$1
  local unit=$(echo "$2" | tr '[:upper:]' '[:lower:]')

  case "$unit" in
    "b")
      echo "$size"
      ;;
    "kb")
      echo $(awk "BEGIN {print $size * 1024}")
      ;;
    "mb")
      echo $(awk "BEGIN {print $size * 1024 * 1024}")
      ;;
    *)
      echo "Unknown unit: $unit"
      exit 1
  esac
}

# Hardcoded limit
limit="1.26kB"
size=${limit%%[a-zA-Z]*}
unit=${limit#$size}

while IFS= read -r line
do
  line=${line// /}
  actualSize=${line%%[a-zA-Z]*}
  actualUnit=${line#$actualSize}

  actualSizeInBytes=$(convertToBytes $actualSize $actualUnit)
  limitInBytes=$(convertToBytes $size $unit)

  if (( $(awk "BEGIN {print ($actualSizeInBytes > $limitInBytes)}") )); then
    echo "$line size is greater than limit of $limit"
    exit 1
  fi

  echo "Actual size: $line"
  echo "Size limit: $limit"
  echo "Noice 🚀"
done