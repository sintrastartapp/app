#!/bin/bash

# If the below command fails, stop the script.
set -e

#  Read TIPTAP_PRO_TOKEN from .env file and export it as an environment variable
export TIPTAP_PRO_TOKEN=$(grep 'TIPTAP_PRO_TOKEN=' .env | sed 's/TIPTAP_PRO_TOKEN=//')

# Check if TIPTAP_PRO_TOKEN is set
if [ -z "$TIPTAP_PRO_TOKEN" ]; then
  echo "TIPTAP_PRO_TOKEN is not set"
  exit 1
fi

# Build the project
docker build --platform linux/amd64 --build-arg TIPTAP_PRO_TOKEN=$TIPTAP_PRO_TOKEN -t ghcr.io/sintrastartapp/app:latest . || exit 1


# Push the image to the registry
docker push ghcr.io/sintrastartapp/app:latest

echo "Build and push completed successfully."