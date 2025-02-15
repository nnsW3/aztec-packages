#!/usr/bin/env bash

echo "Installing foundry..."
rm -rf broadcast cache out
. ./scripts/install_foundry.sh
forge install --no-commit
# Ensure libraries are at the correct version
git submodule update --init --recursive ./lib

echo "Installing barretenberg..."
git submodule init
git submodule update

echo "Downloading srs..."
cd ../cpp/srs_db
./download_ignition.sh 3
#./download_ignition_lagrange.sh 12
cd ../../sol

echo "Building c++ binaries..."
cd ../cpp
cmake --preset clang16
cmake --build --preset clang16 --target solidity_key_gen solidity_proof_gen honk_solidity_proof_gen honk_solidity_key_gen
cd ../sol

echo "Generating keys..."
./scripts/init.sh
./scripts/init_honk.sh

echo "Formatting code..."
forge fmt
forge build

echo "Targets built, you are good to go!"
