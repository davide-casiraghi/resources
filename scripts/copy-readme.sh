#!/bin/bash

cp README.md docs/contribute.md
sed -i '1s/^/---\ntitle: Contribute\n---\n /' docs/contribute.md