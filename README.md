# Welcome

Hello and welcome to my submission for the Kong Konnect UI project.

## Get Started

No setup or build tooling was modified. To get started: 

1. `pnpm install`
1. `pnpm run dev:server`
1. `pnpm run dev:ui`

![Screenshot](./docs/screenshot.jpg)

## Assumptions

* The Service Catalog list result is only used on this page. If it were used elsewhere, I would have moved that state into a Pinia store to be shared across the app. 
* Pagination is client-side only