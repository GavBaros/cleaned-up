## Cloning locally via SSH

`git clone git@github.com:GavBaros/cleaned-up.git`

## Installing NPM modules

In both the `backend` and `frontend` project directories, ensure NPM modules are installed.

From the root `cleaned-up` directory, change into `packages`, then in `backend`, then run `npm install`. Repeat with `frontend`.

## Getting started locally

Then for a local development mode, change into parent directory `cleaned-up` and run:

### `npm start`

This allows Lerna to run both the `backend` and `frontend` folders locally in parallel.

## Running tests

Change your terminal into the `backend` folder and run:

### `npm test`

I decided to only write tests for the `backend` as this is where the core business logic resides.
