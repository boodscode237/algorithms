#!/bin/bash


if [ -z "$1" ]; then
  echo "Usage: $0 \"Your commit message here\""
  exit 1
fi

COMMIT_MESSAGE="$1"

echo "--- Starting automated deployment ---"

echo "Adding all changes to Git..."
git add .
if [ $? -ne 0 ]; then
  echo "Error: git add failed. Please resolve any conflicts or issues."
  exit 1
fi

echo "Committing changes with message: \"$COMMIT_MESSAGE\""
git commit -m "$COMMIT_MESSAGE"
if [ $? -ne 0 ]; then
  echo "Error: git commit failed. No changes to commit or other Git issue."
  exit 1
fi

echo "Pushing changes to 'main' branch on GitHub..."
git push origin main
if [ $? -ne 0 ]; then
  echo "Error: git push failed. Check your internet connection or Git credentials."
  exit 1
fi
echo "Changes pushed to 'main' branch successfully."

echo "Running npm deploy to update GitHub Pages..."
npm run deploy
if [ $? -ne 0 ]; then
  echo "Error: npm run deploy failed. Check your package.json scripts or build process."
  exit 1
fi

echo "--- Deployment process completed successfully! ---"
echo "Your GitHub Pages site should update shortly."
