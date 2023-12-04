<template>
  <div>
    <card :title="`Galeri Kanwil ${data.name}`">
      <file-upload v-model="image" @change="upload" />
      <div class="galleries">
        <table class="table table-bordered">
          <tbody>
            <tr v-for="(g, k) in gallery.data" :key="k">
              <td>
                <video v-if="g.mime_type == 'video/quicktime'" controls>
                  <source :src="g.url" :type="g.mime_type" />
                </video>
                <img v-else :src="g.url" />
              </td>
              <td>
                <a class="link link-delete" @click="doDelete(g)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
    <card :title="`Profile Kanwil ${data.name}`">
      <form @submit.prevent="action" @keydown="form.onKeydown($event)">
        <alert-success :form="form" :message="$t('info_updated')" />

        <div class="form-group">
          <label> Deskripsi </label>
          <textarea
            class="form-control"
            v-model="form.description"
            :class="{ 'is-invalid': form.errors.has('description') }"
          />
          <has-error :form="form" field="description" />
        </div>

        <div class="form-group">
          <label> Kegiatan </label>
          <textarea
            class="form-control"
            v-model="form.activity"
            :class="{ 'is-invalid': form.errors.has('activity') }"
          />
          <has-error :form="form" field="activity" />
        </div>

        <div class="form-group">
          <label> Wilayah Pengawasan </label>
          <textarea
            class="form-control"
            v-model="form.surveillance_area"
            :class="{ 'is-invalid': form.errors.has('surveillance_area') }"
          />
          <has-error :form="form" field="surveillance_area" />
        </div>

        <!-- Submit Button -->
        <div class="form-group">
          <div class="ml-md-auto">
            <v-button :loading="form.busy" type="success"> Simpan </v-button>
          </div>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import Form from 'vform';
import axios from 'axios';
import FileUpload from '@/components/FileUploader'
import { mapGetters } from 'vuex';

export default {
  scrollToTop: false,
  data: () => ({
    form: new Form({
      id: 0,
      description: '',
      activity: '',
      surveillance_area: '',
    }),
    data: {},
    image: {},
    gallery: {
      data: []
    },
    page: 1,
  }),

  components: {
    FileUpload,
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  head () {
    return { title: 'Profile Kanwil' }
  },

  created () {
    this.form.division = this.user.division
    this.get()
  },

  methods: {
    async action () {
      const response = await this.form.post('/division/profile/byme');
    },
    async get () {
      const response = await axios.get(`/division/profile/byme`);
      this.data = response.data.data
      if (this.data && this.data.profile) {
        this.form.clear();
        this.form.reset();
        this.form.fill(this.data.profile);
      }
      this.galleries(this.data, 1)
    },
    upload (file) {
      file.division_id = this.data.id
      file.type = 'gl';
      axios.post(`/gallery`, file).then(res => {
        this.galleries()
      })
    },
    galleries (data, page) {
      axios.get(`/gallery/${data.slug}?type=gl&page=${page}&size=3`).then(res => {
        this.gallery = res.data
      })
    },
    doDelete (v) {
      if (confirm(`Yakin akan menghapus data ?`)) {
        try {
          const response = axios.delete(`/gallery/${v.id}`)
          this.get()
        } catch (e) {

        }
      }
    }
  }
}
</script>
