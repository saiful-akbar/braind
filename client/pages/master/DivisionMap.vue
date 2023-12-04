<template>
  <div>
    <card v-if="data" :title="`Peta Kerawanan - ${data.name}`" class="mb-2">
      <div>
        <file-uploader-1
          id="Kerawanan"
          @change="uploadKerawanan"
          v-model="gallery1"
        />
      </div>
      <div class="galleries">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>File</th>
              <th>Judul</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody v-for="(v, k) in galleries1.data" :key="k">
            <tr>
              <td>
                <img :src="v.url" alt="" />
              </td>
              <td>
                <input
                  type="text"
                  v-model="v.title"
                  class="form-control"
                  v-if="v.ed"
                />
                <span v-else>{{ v.title }}</span>
              </td>
              <td>
                <textarea
                  v-if="v.ed"
                  v-model="v.description"
                  class="form-control"
                />
                <span v-else>{{ v.description }}</span>
              </td>
              <td>
                <a v-if="v.ed" class="link link-access" @click="doSave(v)">
                  Save
                </a>
                <a v-if="!v.ed" class="link link-edit" @click="doEdit(v)">
                  Edit
                </a>
                |
                <a class="link link-delete" @click="doDelete(v)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
    <card
      v-if="data"
      :title="`Peta Kerawanan Cukai - ${data.name}`"
      class="mb-2"
    >
      <div>
        <file-uploader-2
          id="Persabaran"
          @change="uploadPersebaran"
          v-model="gallery2"
        />
      </div>
      <div class="galleries">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>File</th>
              <th>Judul</th>
              <th>Keterangan</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, k) in galleries2.data" :key="k">
              <td>
                <table-number :paginate="galleries2.paginate" :index="k" />
              </td>
              <td><img :src="v.url" /></td>
              <td>
                <input
                  type="text"
                  v-model="v.title"
                  class="form-control"
                  v-if="v.ed"
                />
                <span v-else>{{ v.title }}</span>
              </td>
              <td>
                <textarea
                  v-if="v.ed"
                  v-model="v.description"
                  class="form-control"
                />
                <span v-else>{{ v.description }}</span>
              </td>
              <td>
                <a v-if="v.ed" class="link link-access" @click="doSave(v)">
                  Save
                </a>
                <a v-if="!v.ed" class="link link-edit" @click="doEdit(v)">
                  Edit
                </a>
                |
                <a class="link link-delete" @click="doDelete(v)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
  </div>
</template>

<script>
import FileUploader1 from '@/components/FileUploader'
import FileUploader2 from '@/components/FileUploader'
import TableNumber from '@/components/TableNumber'
import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
  components: {
    FileUploader1,
    FileUploader2,
    TableNumber
  },
  data: () => ({
    data: null,
    galleries1: [],
    galleries2: [],
    gallery1: null,
    gallery2: null,
  }),
  computed: mapGetters({
    user: 'auth/user'
  }),
  head () {
    return { title: 'Peta Kerawanan' }
  },

  created () {
    this.data = this.user.division
    this.galleries(this.data, 'dm')
    this.galleries(this.data, 'vm')
  },

  methods: {
    uploadPersebaran (file) {
      console.log('persebaran', this.gallery2)
      file.division_id = this.data.id
      file.type = 'dm';
      axios.post(`/gallery`, file).then(res => {
        this.galleries(this.data, 'dm')
      })
    },
    uploadKerawanan (file) {
      console.log('kerawanan', this.gallery1)
      file.division_id = this.data.id
      file.type = 'vm';
      axios.post(`/gallery`, file).then(res => {
        this.galleries(this.data, 'vm')
      })
    },
    galleries (data, type) {
      axios.get(`/gallery/${data.slug}?type=${type}`).then(res => {
        if (type == 'vm') {
          this.galleries1 = res.data
        } else {
          this.galleries2 = res.data
        }
      })
      this.gallery1 = null;
      this.gallery2 = null;
    },
    doSave (v) {
      axios.put(`/gallery/${v.id}`, v).then(res => {
        v.ed = false
      })
    },
    doEdit (v) {
      v.ed = true
    },
    async doDelete (v) {
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/gallery/${v.id}`)
          this.galleries(this.data, 'vm')
          this.galleries(this.data, 'dm')
        } catch (e) {

        }
      }
    }
  }
}

</script>

