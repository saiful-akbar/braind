<template>
  <div class="row">
    <div class="col-md-3">
      <card title="Modul" class="settings-card sidebar-menu">
        <ul class="nav flex-column nav-pills nav-sidebar">
          <li v-for="(tab, k) in tabs" :key="k" class="nav-item parent">
            <a
              v-if="tab.route == 'parent'"
              class="nav-link link"
              @click="expand(tab)"
            >
              <fa
                v-if="tab.expand || $route.name.includes(tab.route_name)"
                icon="chevron-down"
                fixed-width
              />
              <fa v-else icon="chevron-right" fixed-width />
              {{ tab.name }}
            </a>
            <router-link
              v-else
              :to="{ name: tab.route }"
              :class="`nav-link ${$route.name == tab.route ? 'active' : ''}`"
            >
              <fa icon="chevron-right" fixed-width />
              {{ tab.name }}
            </router-link>

            <ul
              v-show="tab.expand || $route.name.includes(tab.route_name)"
              :class="`nav flex-column`"
            >
              <li v-for="(c, ky) in tab.children" :key="ky" class="child">
                <router-link
                  v-if="c.url && c.url != ''"
                  :to="c.url"
                  :class="`nav-link ${$route.name == c.route ? 'active' : ''}`"
                >
                  <fa
                    v-if="$route.name == c.route"
                    icon="toggle-on"
                    fixed-width
                  />
                  <fa v-else icon="toggle-off" fixed-width />
                  {{ c.name }}
                </router-link>

                <router-link
                  v-else
                  :to="{ name: c.route }"
                  :class="`nav-link ${$route.name == c.route ? 'active' : ''}`"
                >
                  <fa
                    v-if="$route.name == c.route"
                    icon="toggle-on"
                    fixed-width
                  />
                  <fa v-else icon="toggle-off" fixed-width />
                  {{ c.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </card>
    </div>
    <div class="col-md-9">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Form from "vform";

export default {
  middleware: "auth",
  data: () => ({
    form: new Form(),
    tabs: [],
  }),

  created() {
    this.getMenu();
  },

  methods: {
    getMenu() {
      this.form.get("/menu").then((res) => {
        this.tabs = res.data.data;
      });
    },
    expand(tab) {
      tab.expand = !tab.expand;
    },
  },
};
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
</style>
