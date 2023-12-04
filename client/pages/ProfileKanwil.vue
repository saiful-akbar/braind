<template>
  <div class="row dashboard">
    <card
      :title="`Profile ${division && division.name ? division.name : '-'}`"
      class="col-md-12"
    >
      <button class="btn btn-primary" @click="loadVideo">Video</button>
      <button class="btn btn-warning" @click="loadPhoto">Photo</button>
      <hr />
      <div
        class="gallery"
        v-if="
          (photos && photos.data.length > 0) ||
          (videos && videos.data.length > 0)
        "
      >
        <div
          id="carouselPhotos"
          class="carousel slide"
          data-ride="carousel"
          v-if="isPhoto"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselPhotos"
              :data-slide-to="k"
              :class="`${k == 0 ? 'active' : ''}`"
              v-for="(v, k) in photos.data"
              :key="k"
            ></li>
          </ol>
          <div class="carousel-inner">
            <div
              :class="`carousel-item ${k == 0 ? 'active' : ''}`"
              v-for="(g, k) in photos.data"
              :key="k"
            >
              <img class="d-block w-100" :src="g.url" :alt="g.url" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselPhotos"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselPhotos"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div
          id="carouselVideos"
          class="carousel slide"
          data-ride="carousel"
          v-if="isVideo"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselVideos"
              :data-slide-to="k"
              :class="`${k == 0 ? 'active' : ''}`"
              v-for="(v, k) in videos.data"
              :key="k"
            ></li>
          </ol>
          <div class="carousel-inner">
            <div
              :class="`carousel-item ${k == 0 ? 'active' : ''}`"
              v-for="(g, k) in videos.data"
              :key="k"
            >
              <video
                class="d-block w-100"
                controls
                v-if="g.mime_type.includes('video')"
              >
                <source :src="g.url" type="video/mp4" />
              </video>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselVideos"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselVideos"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="gallery" v-else>
        <h5>Photo / Video belum tersedia</h5>
      </div>
      <hr />
      <div class="mb-4" v-if="division && division.profile">
        <div class="mt-3">
          {{ division.profile.description }}
        </div>
        <div class="mt-3">
          {{ division.profile.activity }}
        </div>
        <div class="mt-3">
          {{ division.profile.surveillance_area }}
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <h6 class="text-center text-bold">Data 5 besar perusahaan impor</h6>
          <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                @click="loadImport('pib')"
                :class="`link nav-link ${
                  $route.query && $route.query.im == 'pib' ? 'active' : ''
                }`"
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected="true"
                >PIB</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                @click="loadImport('total_pay')"
                :class="`link nav-link ${
                  $route.query && $route.query.im == 'total_pay' ? 'active' : ''
                }`"
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-2"
                aria-selected="false"
                >Total BY</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                @click="loadImport('income_duty')"
                :class="`link nav-link ${
                  $route.query && $route.query.im == 'income_duty'
                    ? 'active'
                    : ''
                }`"
                id="ex1-tab-3"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected="false"
                >BM</a
              >
            </li>
          </ul>
          <!-- Tabs navs -->

          <!-- Tabs content -->
          <div class="tab-content" id="ex1-content">
            <div
              class="tab-pane fade show active"
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >
              <div>
                <table class="table table-bordered">
                  <tbody>
                    <tr v-for="(v, k) in imports" :key="k">
                      <td width="40">{{ k + 1 }}</td>
                      <td>{{ v.name }}</td>
                      <td>{{ v.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="text-center text-bold">Data 5 besar perusahaan ekpor</h6>
          <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                @click="loadExport('peb')"
                :class="`link nav-link ${
                  $route.query && $route.query.ex == 'peb' ? 'active' : ''
                }`"
                id="ex1-tab-1"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected="true"
                >PEB</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                @click="loadExport('devisa')"
                :class="`link nav-link ${
                  $route.query && $route.query.ex == 'devisa' ? 'active' : ''
                }`"
                id="ex1-tab-2"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-2"
                aria-selected="false"
                >Devisa</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                @click="loadExport('netto')"
                :class="`link nav-link ${
                  $route.query && $route.query.ex == 'netto' ? 'active' : ''
                }`"
                id="ex1-tab-3"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected="false"
                >Netto</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                @click="loadExport('export_duty')"
                :class="`link nav-link ${
                  $route.query && $route.query.ex == 'export_duty'
                    ? 'active'
                    : ''
                }`"
                id="ex1-tab-3"
                data-mdb-toggle="tab"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected="false"
                >BK</a
              >
            </li>
          </ul>
          <!-- Tabs navs -->

          <!-- Tabs content -->
          <div class="tab-content" id="ex1-content">
            <div
              class="tab-pane fade show active"
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >
              <div>
                <table class="table table-bordered">
                  <tbody>
                    <tr v-for="(v, k) in exportss" :key="k">
                      <td width="40">{{ k + 1 }}</td>
                      <td>{{ v.name }}</td>
                      <td>{{ v.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="text-center text-bold">Data 5 besar Cukai MMEA</h6>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Jumlah CK1</th>
                  <th>Liter</th>
                  <th>Cukai</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, k) in mmeas" :key="k">
                  <td width="40">{{ k + 1 }}</td>
                  <td>{{ v.name }}</td>
                  <td class="text-right">{{ v.number_of_documents | formatNumber }}</td>
                  <td class="text-right">{{ v.number_of_liters | formatNumber }}</td>
                  <td class="text-right">{{ v.amount_of_excise_duty | formatNumber }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-6">
          <h6 class="text-center text-bold">Data 5 besar Cukai HT</h6>
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Jumlah CK1</th>
                  <th>Cukai</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, k) in hts" :key="k">
                  <td width="40">{{ k + 1 }}</td>
                  <td>{{ v.name }}</td>
                  <td class="text-right">{{ v.ck_amount | formatNumber }}</td>
                  <td class="text-right">{{ v.amount_of_excise_duty | formatNumber }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import Paginator from '@/components/Paginator';
export default {
  head () {
    return { title: "Dashboard" }
  },
  components: {
    Paginator
  },

  data: () => ({
    query: {
      im: 'pib',
      ex: 'peb'
    },
    imports: [],
    exportss: [],
    mmeas: [],
    hts: [],
    div: null,
    photos: null,
    videos: null,
    isVideo: false,
    isPhoto: true
  }),

  created () {
    const query = this.$route.query
    const params = this.$route.params
    if (query && query.im) {
      this.loadImport(query.im);
    } else {
      this.loadImport('pib');
    }
    if (query && query.ex) {
      this.loadExport(query.ex);
    } else {
      this.loadExport('peb');
    }
    this.loadDivision(params.slug)
    this.loadGalleries(params.slug, 1)
  },

  methods: {
    loadImport (param) {
      this.query.im = param
      this.$router.push({ query: this.query }).catch(() => { })
      axios.get(`/pub/import-company/${this.division.id}?size=10&ord=${param}`).then(res => {
        this.imports = res.data.data
      })
    },
    loadExport (param) {
      this.query.ex = param
      this.$router.push({ query: this.query }).catch(() => { })
      axios.get(`/pub/export-company/${this.division.id}?size=10&ord=${param}`).then(res => {
        this.exportss = res.data.data
      })
    },
    loadMmeas () {
      axios.get(`/pub/cukai-mmea-company/${this.division.id}?size=10`).then(res => {
        this.mmeas = res.data.data
      })
    },
    loadHts () {
      axios.get(`/pub/cukai-ht-company/${this.division.id}?size=10`).then(res => {
        this.hts = res.data.data
      })
    },
    loadDivision (slug) {
      axios.get(`/pub/division/${slug}`).then(res => {
        this.division = res.data.data;
        const query = this.$route.query
        this.loadImport(query && query.im ? query.im : 'pib');
        this.loadExport(query && query.ex ? query.ex : 'peb');
        this.loadMmeas();
        this.loadHts();
      })
    },
    loadGalleries (slug, page) {
      axios.get(`/pub/galleries/byslug/${slug}?page=${page}&type=gl&mt=image&size=10`).then(res => {
        this.photos = res.data;
      })
      axios.get(`/pub/galleries/byslug/${slug}?page=${page}&type=gl&mt=video&size=10`).then(res => {
        this.videos = res.data;
      })
    },
    loadVideo () {
      this.isVideo = true
      this.isPhoto = false
    },
    loadPhoto () {
      this.isVideo = false
      this.isPhoto = true
    },
  },
  watch: {
    $route (to, from) {
      this.loadDivision(to.params.slug);
      this.loadGalleries(to.params.slug, 1);
    },
  }
}
</script>
