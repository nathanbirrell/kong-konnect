# Welcome

Hello and welcome to my submission for the Kong Konnect UI project.

## Get Started

No setup or build tooling was modified. To get started: 

1. `nvm use` to ensure you're on a supported Node version
1. `pnpm install`
1. `pnpm run dev:server`
1. `pnpm run dev:ui`

![App demo](./docs/demo.gif)

## Assumptions

* The Service Catalog list result is only used on this page. If it were used elsewhere, I would have moved that state into a Pinia store to be shared across the app. 
* As a team we prefer to re-use existing components over creating new ones to match a design. This is why I used Kongponents for the majority of the UI, which diverge from the mocks slightly.
* Pagination is client-side only
* As most of my experience is in React, my understanding of the Vue component lifecycle is limited, so apologies for any antipatterns!

## To do

- [x] List ServicePackages as cards
- [x] Search functionality
- [x] Pagination functionality
- [x] Build ServiceDetails page
- [ ] Make Cards clickable
- [ ] Add Vue test setup so that Kongponents functions
- [ ] Replace any leftover hex colors with CSS variables
- [ ] Add E2E test, rather than simply testing component in isolation
- [ ] Break down UI elements into more re-usable and focused components
- [ ] Move ServiceCatalog list into Pinia store for reusable state management
- [ ] Rename usage of `ServiceCatalog` to `ServicePackage` to align with Kong's business entity terminology
- [ ] Add functionality for `Create Service Package` button