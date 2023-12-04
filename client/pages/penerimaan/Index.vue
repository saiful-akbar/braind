<template>
  <card title="Data Penerimaan">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Kantor</label>
        <div class="col-md-7">
          <kanwil-selector
            v-model="form.division"
            :readonly="user && user.division"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Target Bea Masuk
        </label>
        <div class="col-md-7">
          <input
            v-model="form.target_import_duty"
            :class="{ 'is-invalid': form.errors.has('target_import_duty') }"
            type="number"
            name="target_import_duty"
            class="form-control"
          />
          <has-error :form="form" field="target_import_duty" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Realisasi Bea Masuk
        </label>
        <div class="col-md-7">
          <input
            v-model="form.realization_import_duty"
            :class="{
              'is-invalid': form.errors.has('realization_import_duty'),
            }"
            type="number"
            name="realization_import_duty"
            class="form-control"
          />
          <has-error :form="form" field="realization_import_duty" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Target Bea Keluar
        </label>
        <div class="col-md-7">
          <input
            v-model="form.target_export_duty"
            :class="{ 'is-invalid': form.errors.has('target_export_duty') }"
            type="number"
            name="target_export_duty"
            class="form-control"
          />
          <has-error :form="form" field="target_export_duty" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Realisasi Bea Keluar
        </label>
        <div class="col-md-7">
          <input
            v-model="form.realization_export_duty"
            :class="{
              'is-invalid': form.errors.has('realization_export_duty'),
            }"
            type="number"
            name="realization_export_duty"
            class="form-control"
          />
          <has-error :form="form" field="realization_export_duty" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Target Cukai
        </label>
        <div class="col-md-7">
          <input
            v-model="form.target_tax"
            :class="{ 'is-invalid': form.errors.has('target_tax') }"
            type="number"
            name="target_tax"
            class="form-control"
          />
          <has-error :form="form" field="target_tax" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Realisasi Cukai
        </label>
        <div class="col-md-7">
          <input
            v-model="form.realization_tax"
            :class="{ 'is-invalid': form.errors.has('realization_tax') }"
            type="number"
            name="realization_tax"
            class="form-control"
          />
          <has-error :form="form" field="realization_tax" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/receipt/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="receipts" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Nama Kantor</th>
            <th colspan="4">Target</th>
            <th colspan="4">Realisasi</th>
            <th rowspan="2">&nbsp;</th>
          </tr>
          <tr>
            <th>Bea Masuk</th>
            <th>Bea Keluar</th>
            <th>Cukai</th>
            <th>Total</th>
            <th>Bea Masuk</th>
            <th>Bea Keluar</th>
            <th>Cukai</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.division_name }}</td>
            <td class="text-right">{{ format(v.target_import_duty) }}</td>
            <td class="text-right">{{ format(v.target_export_duty) }}</td>
            <td class="text-right">{{ format(v.target_tax) }}</td>
            <td class="text-right">{{ format(v.target_total) }}</td>
            <td class="text-right">{{ format(v.realization_import_duty) }}</td>
            <td class="text-right">{{ format(v.realization_export_duty) }}</td>
            <td class="text-right">{{ format(v.realization_tax) }}</td>
            <td class="text-right">{{ format(v.realization_total) }}</td>
            <td>
              <a class="link" @click="doEdit(v)">Edit</a> |
              <a class="link" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>

        <tbody v-if="user && user.role == 'admin'">
          <tr>
            <td colspan="2">Jumlah</td>
            <td class="text-right">{{ format(summary.target_import_duty) }}</td>
            <td class="text-right">{{ format(summary.target_export_duty) }}</td>
            <td class="text-right">{{ format(summary.target_tax) }}</td>
            <td class="text-right">
              {{
                format(
                  summary.target_import_duty +
                    summary.target_export_duty +
                    summary.target_tax
                )
              }}
            </td>
            <td class="text-right">
              {{ format(summary.realization_import_duty) }}
            </td>
            <td class="text-right">
              {{ format(summary.realization_export_duty) }}
            </td>
            <td class="text-right">{{ format(summary.realization_tax) }}</td>
            <td class="text-right">
              {{
                format(
                  summary.realization_import_duty +
                    summary.realization_export_duty +
                    summary.realization_tax
                )
              }}
            </td>
          </tr>
        </tbody>

        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="7">Data tidak ditemukan</th>
          </tr>
        </tbody>
      </table>
    </div>
    <paginator :paginate="data.paginate" @changePage="changePage" />
  </card>
</template>

<script>
import Form from "vform";
import axios from "axios";
import TableNumber from "@/components/TableNumber";
import Paginator from "@/components/Paginator";
import ExportButton from "../../components/ExportButton.vue";
import ImportButtons from "../../components/ImportButtons.vue";
import { mapGetters } from "vuex";
import KanwilSelector from "../../components/KanwilSelector.vue";
import { numberFormat } from "@/utils";

export default {
  scrollToTop: false,
  data: () => ({
    form: new Form({
      id: 0,
      target_import_duty: 0,
      target_export_duty: 0,
      target_tax: 0,
      realization_import_duty: 0,
      realization_export_duty: 0,
      realization_tax: 0,
      input_date: null,
      division: null,
    }),
    data: {},
    page: 1,
    summary: {
      target_import_duty: 0,
      target_export_duty: 0,
      target_tax: 0,
      realization_import_duty: 0,
      realization_export_duty: 0,
      realization_tax: 0,
    },
  }),

  components: {
    TableNumber,
    Paginator,
    ExportButton,
    ImportButtons,
    KanwilSelector,
  },

  computed: mapGetters({
    user: "auth/user",
  }),

  head() {
    return { title: "Perusahaan HT HTPL" };
  },

  created() {
    this.getList(1);
    this.form.division =
      this.user && this.user.division ? this.user.division : null;
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/receipt/${this.form.id}`);
      } else {
        response = await this.form.post("/receipt");
      }
      this.getList(1);
      this.form.clear();
      this.form.reset();
    },

    async getList(page) {
      const query = this.$route.query;
      let q = "";
      if (query && query.q) {
        q = `q=${query.q}`;
      }
      const response = await axios.get(`/receipt?size=10&page=${page}&${q}`);
      this.data = response.data;
      const data = this.data.data;
      for (var i in data) {
        this.summary.target_import_duty += data[i].target_import_duty;
        this.summary.target_export_duty += data[i].target_export_duty;
        this.summary.target_tax += data[i].target_tax;
        this.summary.realization_import_duty += data[i].realization_import_duty;
        this.summary.realization_export_duty += data[i].realization_export_duty;
        this.summary.realization_tax += data[i].realization_tax;
      }
      // this.$router.push({ query: { p: response.data && response.data.paginate ? response.data.paginate.page : 1 } })
    },

    doEdit(v) {
      this.form.clear();
      this.form.reset();
      this.form.fill(v);
    },

    changePage(p) {
      this.getList(p);
    },

    async doDelete(v) {
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/receipt/${v.id}`);
          this.getList();
        } catch (e) {}
      }
    },

    // number format
    format(number) {
      return numberFormat(number, 2);
    },
  },
  watch: {
    $route(to, from) {
      this.getList(1);
    },
  },
};
</script>
