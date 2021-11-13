#!/bin/bash -

input_dir="public/images/originals"
output_dir="public/images"

# for each jpg in the input directory
for img in $( find $input_dir -type f -iname "*.jpg" -o -iname "*.jpeg" );
do
  # convert to png first
  convert $img ${img%.*}.png
  cwebp ${img%.*}.png -resize 1000 0 -o ${img%.*}.webp
  # delete intermediate png file
  rm ${img%.*}.png
done

# for each png in the input directory
for img in $( find $input_dir -type f -iname "*.png" );
do
  cwebp $img -resize 1000 0 -o ${img%.*}.webp
done

mv "${input_dir}"/*.webp $output_dir
