<template>
  <div class="row dashboard">
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
                $route.query && $route.query.im == 'income_duty' ? 'active' : ''
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
                    <td class="text-right">{{ v.value | formatNumber}}</td>
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
                $route.query && $route.query.ex == 'export_duty' ? 'active' : ''
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
                    <td class="text-right">{{ v.value | formatNumber }}</td>
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  head () {
    return { title: "Dashboard" }
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
  }),

  created () {
    const query = this.$route.query
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
    this.loadMmeas();
    this.loadHts();
  },

  methods: {
    loadImport (param) {
      this.query.im = param
      this.$router.push({ query: this.query }).catch(() => { })
      axios.get(`/pub/import-company/0?size=5&ord=${param}`).then(res => {
        this.imports = res.data.data
      })
    },
    loadExport (param) {
      this.query.ex = param
      this.$router.push({ query: this.query }).catch(() => { })
      axios.get(`/pub/export-company/0?size=5&ord=${param}`).then(res => {
        this.exportss = res.data.data
      })
    },
    loadMmeas () {
      axios.get(`/pub/cukai-mmea-company/0?size=5`).then(res => {
        this.mmeas = res.data.data
      })
    },
    loadHts () {
      axios.get(`/pub/cukai-ht-company/0?size=5`).then(res => {
        this.hts = res.data.data
      })
    },
  }
}
</script>
