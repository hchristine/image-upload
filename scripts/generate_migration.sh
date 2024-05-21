#!/bin/sh

npx typeorm-ts-node-commonjs migration:generate ./migrations/$1 -d ./datasource.ts