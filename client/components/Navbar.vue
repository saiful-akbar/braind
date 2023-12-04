<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white nav-top">
    <div class="container">
      <router-link
        :to="{ name: user ? 'admin.dashboard' : 'public.dashboard' }"
        class="navbar-brand"
      >
        Braind
      </router-link>

      <button
        :aria-label="$t('toggle_navigation')"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbarToggler" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <!-- <locale-dropdown /> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> -->
        </ul>

        <div class="col-md-4 row" v-if="user">
          <input
            type="text"
            class="form-control"
            @keyup="doSearch"
            placeholder="Ketikkan kata kunci"
            v-model="q"
          />
        </div>
        <ul class="navbar-nav ml-auto">
          <!-- Authenticated -->
          <li v-if="user" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-white"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                :src="user.photo_url"
                class="rounded-circle profile-photo mr-1"
              />
              {{ user.name }}
            </a>
            <div class="dropdown-menu">
              <router-link
                :to="{ name: 'settings.profile' }"
                class="dropdown-item pl-3"
              >
                <fa icon="cog" fixed-width />
                {{ $t("settings") }}
              </router-link>

              <div class="dropdown-divider" />
              <a class="dropdown-item pl-3" href="#" @click.prevent="logout">
                <fa icon="sign-out-alt" fixed-width />
                {{ $t("logout") }}
              </a>
            </div>
          </li>
          <!-- Guest -->
          <template v-else>
            <li class="nav-item">
              <router-link
                :to="{ name: 'login' }"
                class="nav-link"
                active-class="active"
              >
                Login
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
// import LocaleDropdown from './LocaleDropdown'

export default {
  components: {
    // LocaleDropdown
  },

  data: () => ({
    appName: process.env.appName,
    q: ''
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  created () {
    const query = this.$route.query
    if (query && query.q) {
      this.q = query.q
    }
  },

  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    },
    async doSearch (evt) {
      if (evt.keyCode == 13) {
        this.$router.push({ query: { q: this.q } })
      }
    }
  }
}
</script>

<style scoped>
.profile-photo {
  width: 2rem;
  height: 2rem;
  margin: -0.375rem 0;
}
</style>
