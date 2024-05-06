<template>
  <div class="navigation">
    <div>
      <router-link to="/">
        <img
          alt="Kong Konnect Logo"
          src="/logo.svg"
        >
      </router-link>
    </div>

    <div class="navigation__links">
      <router-link to="/">
        <KIcon
          color="currentColor"
          icon="organization"
        />
        Organization
      </router-link>
      <router-link to="/">
        <KIcon
          color="currentColor"
          icon="cogwheel"
        />
        Settings
      </router-link>
      <router-link to="/">
        <KIcon
          color="currentColor"
          icon="profile"
        />
        Katherine Ellis
      </router-link>
    </div>
  </div>
</template>

<style>
.navigation {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* FIXME: use css variables from kongponents */
  background: linear-gradient(#09224f, #073382);

  /* a {color: var(--white) !important;} */
}
.navigation .navigation__links {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .kong-icon {
    margin-right: 0.5rem;
  }

  a {
    font-size: var(--type-md);
    color: var(--white);
    display: flex;
    align-items: center;
    text-decoration: none;
    margin: 0 1rem;
  }
  a:hover {
    color: var(--blue-200);
  }
}
</style>
