---
title: Dapp Tutorial
---

In this tutorial we'll go through the steps for building a simple application that interacts with the Aztec Sandbox. We'll be building a console application using Javascript and NodeJS, but you may reuse the same concepts here for a web-based app. All Aztec libraries are written in Typescript and fully typed, so you can use Typescript instead of Javascript to make the most out of its type checker.

This tutorial will focus on environment setup, including creating accounts and deployments, as well as interacting with your contracts. It will not cover [how to write contracts in Noir](/aztec/aztec/concepts/smart_contracts/index.md).

The full code for this tutorial is [available on the `aztec-packages` repository](https://github.com/AztecProtocol/aztec-packages/blob/master/yarn-project/end-to-end/src/sample-dapp).

## Dependencies

- Linux or OSX environment
- [NodeJS](https://nodejs.org/) 18 or higher
- [Aztec Sandbox](/getting_started/getting_started)
- [Aztec CLI](/reference/reference/sandbox_reference)

## Prerequisites

Basic understanding of NodeJS and Javascript should be enough to follow this tutorial. Along the way, we'll provide links to dig deeper into Aztec concepts as we introduce them.