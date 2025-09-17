#!/bin/bash

# Script to install dependencies in all project folders

folders=(
  "01-server-components/checkpoint"
  "01-server-components/complete"
  "02-react-patterns/start"
  "02-react-patterns/checkpoint"
  "02-react-patterns/complete"
  "03-tanstack-query/start"
  "03-tanstack-query/checkpoint"
  "03-tanstack-query/complete"
  "04-advanced-patterns/start"
  "04-advanced-patterns/checkpoint"
  "04-advanced-patterns/complete"
)

for folder in "${folders[@]}"; do
  echo "Installing dependencies in $folder..."
  cd "$folder"
  rm -rf node_modules package-lock.json .next
  npm install --silent
  cd - > /dev/null
  echo "✓ Completed $folder"
done

echo "All dependencies installed!"