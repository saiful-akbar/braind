import Vue from "vue";
import Router from "vue-router";
import { scrollBehavior } from "~/utils";

Vue.use(Router);

const page = (path) => () =>
  import(`~/pages/${path}`).then((m) => m.default || m);

const routes = [
  {
    path: "/admin",
    component: page("admin.vue"),
    children: [
      {
        path: "/",
        name: "admin.dashboard",
        component: page("home"),
      },
      {
        path: "/admin/perusahaan/import",
        name: "perusahaan.import",
        component: page("perusahaan/Import"),
      },
      {
        path: "/admin/perusahaan/export",
        name: "perusahaan.export",
        component: page("perusahaan/Export"),
      },
      {
        path: "/admin/perusahaan/cukai-mmea",
        name: "perusahaan.cukai.mmea",
        component: page("perusahaan/CukaiMMEA"),
      },
      {
        path: "/admin/perusahaan/cukai-ht-hptl",
        name: "perusahaan.cukai.ht.hptl",
        component: page("perusahaan/CukaiHTHPTL"),
      },

      {
        path: "/admin/penerimaan/",
        name: "penerimaan",
        component: page("penerimaan/Index"),
      },

      {
        path: "/admin/pengawasan/export",
        name: "pengawasan.export",
        component: page("pengawasan/Export"),
      },
      {
        path: "/admin/pengawasan/import",
        name: "pengawasan.import",
        component: page("pengawasan/Import"),
      },
      {
        path: "/admin/pengawasan/cukai-mmea",
        name: "pengawasan.cukai.mmea",
        component: page("pengawasan/CukaiMMEA"),
      },
      {
        path: "/admin/pengawasan/cukai-ht",
        name: "pengawasan.cukai.ht",
        component: page("pengawasan/CukaiHT"),
      },
      {
        path: "/admin/pengawasan/cukai-ea",
        name: "pengawasan.cukai.ea",
        component: page("pengawasan/CukaiEA"),
      },
      {
        path: "/admin/pengawasan/penindakan",
        name: "pengawasan.penindakan",
        component: page("pengawasan/Penindakan"),
      },

      {
        path: "/admin/kerawanan",
        name: "kerawanan",
        component: page("home.vue"),
      },

      {
        path: "/admin/pengoperasian/kapal-patroli",
        name: "pengoperasian.kapal.patroli",
        component: page("pengoperasian/KapalPatroli"),
      },
      {
        path: "/admin/pengoperasian/alat-telekomunikasi",
        name: "pengoperasian.alat.telekomunikasi",
        component: page("pengoperasian/AlatTelekomunikasi"),
      },
      {
        path: "/admin/pengoperasian/senjata-api",
        name: "pengoperasian.senjata.api",
        component: page("pengoperasian/SenjataApi"),
      },
      {
        path: "/admin/pengoperasian/pemindai-pendeteksi",
        name: "pengoperasian.alat.pemindai.pendeteksi",
        component: page("pengoperasian/AlatPemindaiDanPendeteksi"),
      },
      {
        path: "/admin/pengoperasian/sarana-lain",
        name: "pengoperasian.sarana.operasi.lain",
        component: page("pengoperasian/SaranaOperasiLainnya"),
      },

      {
        path: "/admin/account/profile",
        name: "account.profile",
        component: page("account/profile.vue"),
      },
      {
        path: "/admin/account/password",
        name: "account.password",
        component: page("account/password.vue"),
      },

      {
        path: "/admin/sbp",
        name: "master.sbp",
        component: page("master/Sbp.vue"),
      },
      {
        path: "/admin/user",
        name: "master.user",
        component: page("master/User.vue"),
      },
      {
        path: "/admin/user/access/:id",
        name: "master.user.access",
        component: page("master/Access.vue"),
      },
      {
        path: "/admin/division",
        name: "master.kanwil",
        component: page("master/Division.vue"),
      },
      {
        path: "/admin/commodity",
        name: "master.commodity",
        component: page("master/Commodity.vue"),
      },

      {
        path: "/admin/division/profile",
        name: "admin.division.profile",
        component: page("master/DivisionProfile.vue"),
      },
      {
        path: "/admin/division/map",
        name: "admin.division.map",
        component: page("master/DivisionMap.vue"),
      },
    ],
  },
  {
    path: "/",
    component: page("public.vue"),
    children: [
      { path: "/", name: "public.dashboard", component: page("home") },
      {
        path: "/profile/:slug",
        name: "profile",
        component: page("ProfileKanwil.vue"),
      },
      {
        path: "/pengawasan/import",
        name: "pub.pengawasan.import",
        component: page("pub_pengawasan/Import.vue"),
      },
      {
        path: "/pengawasan/export",
        name: "pub.pengawasan.export",
        component: page("pub_pengawasan/Export.vue"),
      },
      {
        path: "/pengawasan/cukai/mmea",
        name: "pub.pengawasan.cukai.mmea",
        component: page("pub_pengawasan/CukaiMMEA.vue"),
      },
      {
        path: "/pengawasan/cukai/ht",
        name: "pub.pengawasan.cukai.ht",
        component: page("pub_pengawasan/CukaiHT.vue"),
      },
      {
        path: "/pengawasan/cukai/ea",
        name: "pub.pengawasan.cukai.ea",
        component: page("pub_pengawasan/CukaiEA.vue"),
      },
      {
        path: "/pengawasan/penindakan",
        name: "pub.pengawasan.penindakan",
        component: page("pub_pengawasan/Penindakan.vue"),
      },
      {
        path: "/sarana-operasi/:slug",
        name: "pub.operating.facilities",
        component: page("pub_operating_facilities/Index.vue"),
      },
      {
        path: "/persebaran/:slug",
        name: "pub.operating.persebaran",
        component: page("PetaPersebaran"),
      },
    ],
  },
  { path: "/", name: "home", component: page("home") },
  { path: "/login", name: "login", component: page("auth/login.vue") },
  { path: "/register", name: "register", component: page("auth/register.vue") },
  {
    path: "/password/reset",
    name: "password.request",
    component: page("auth/password/email.vue"),
  },
  {
    path: "/password/reset/:token",
    name: "password.reset",
    component: page("auth/password/reset.vue"),
  },
  {
    path: "/email/verify/:id",
    name: "verification.verify",
    component: page("auth/verification/verify.vue"),
  },
  {
    path: "/email/resend",
    name: "verification.resend",
    component: page("auth/verification/resend.vue"),
  },
];

export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: "history",
  });
}
