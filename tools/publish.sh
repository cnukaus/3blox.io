#!/bin/bash
set -e

BUCKET=$1

if [ -z "$BUCKET" ] || [ "$BUCKET" == "-h" ]
  then
    echo "Usage: publish.sh [bucket_name]"
    echo "Follow this tutorial to setup the bucket:"
    echo "https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af"
    exit 1
fi

echo "Deploying to bucket \"$BUCKET\""

npm run build
aws s3 sync build/ s3://$BUCKET