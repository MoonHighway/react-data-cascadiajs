#!/bin/bash

# Script to test builds for all project folders

folders=(
  "00-starter"
  "01-server-components/start"
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

echo "Testing builds for all projects..."
echo "=================================="

failed_builds=()

for folder in "${folders[@]}"; do
  echo -n "Testing $folder... "
  cd "$folder"

  if npm run build > /dev/null 2>&1; then
    echo "✅ PASS"
  else
    echo "❌ FAIL"
    failed_builds+=("$folder")
  fi

  cd - > /dev/null
done

echo "=================================="
if [ ${#failed_builds[@]} -eq 0 ]; then
  echo "🎉 All builds passed!"
else
  echo "❌ Failed builds:"
  for failed in "${failed_builds[@]}"; do
    echo "  - $failed"
  done
fi