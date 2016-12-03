#!/usr/bin/env bash
docker build . -f Dockerfile_testStage -t michaelbahr/horde-delivery-frontend:test
docker push michaelbahr/horde-delivery-frontend:test
