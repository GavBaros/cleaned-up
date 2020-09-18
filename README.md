# Installing NPM modules

In both the `backend` and `frontend` project directories, ensure NPM modules are installed.

From the root (`ChargedUpTest`) directory, change into `packages`, then in `backend`, then run `npm install`. Repeat with `frontend`.

# Getting started locally

Then for a local development mode, change into parent directory `CleanedUpTest` and run:

### `npm start`

This allows Lerna to run both the `backend` and `frontend` folders locally in parallel.

# Running tests

Change your terminal into the `backend` folder and run:

### `npm test`

I decided to only write tests for the `backend` as this is where the core business logic resides.
