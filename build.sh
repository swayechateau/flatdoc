#!/bin/bash

THEMES_DIR="src/themes"
OUTPUT_DIR="build"

echo "Starting theme compilation..."

for theme_file in $THEMES_DIR/*.css; do
    theme_name=$(basename "$theme_file" .css)
    output_path="$OUTPUT_DIR/$theme_name/style.css"

    echo "Compiling theme: $theme_name"
    
    mkdir -p "$(dirname "$output_path")"
    
    # Combine the theme CSS with main.css and write to output file
    cat "src/main.css" "$theme_file" > "$output_path"
    
    echo "Compiled theme '$theme_name' saved at '$output_path'"
done

echo "Theme compilation completed!"
