#!/bin/sh

aws s3 rm s3://kansenfrontend/ --recursive
aws s3 cp dist s3://kansenfrontend/ --recursive