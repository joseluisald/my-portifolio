#!/bin/bash
git pull origin main

bun install
bun run build
