<template>
  <div class="row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by cacCode"
          v-model="searchCacCode"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="page = 1; retrieveCacCodes();"
          >
            Search
          </button>
        </div>
      </div>
    </div>



    <div class="col-md-12">
      <h4>CAC Code List</h4>
      <!--<ul class="list-group" id="caccode-list">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(cacObj, index) in cacCodes"
          :key="index"
          @click="setActiveTutorial(cacObj, index)"
        >
          {{ cacObj.cacCode }} | {{cacObj.cacGroup }}
        </li>
      </ul>-->
<table class="table table-striped" id="caccode-list">
  <thead class="thead-dark">
  <tr>

    <th scope="col"> CODE</th>
    <th scope="col"> DESC</th>
    <th scope="col"> GROUP</th>
    <th scope="col"> GROUP DESC</th>
    <th scope="col"> LONG DESC</th>
    <th scope="col"> BUS TYPE</th>
    <th scope="col"> RETAIL FLAG</th>
    <th scope="col"> SUB GROUP</th>
    <th scope="col"> TYPE</th>
    <th scope="col"> TYPE DESC</th>
    <th scope="col"> VALID FLAG</th>
    <th scope="col"> DATEMOD</th>
    <th scope="col"> JOB FLAG</th>
    <th scope="col"> PM FLAG</th>
    <th scope="col"> USERIDMOD</th>

  </tr>
  </thead>
  <tbody>
  <tr
       :class="{ active: index == currentIndex }"
       v-for="(cacObj, index) in cacCodes"
       :key="index"
       @click="setActiveTutorial(cacObj, index)">
    <td> {{ cacObj.cacCode }}</td>
    <td> {{ cacObj.cacDesc }}</td>
    <td> {{ cacObj.cacGroup }}</td>
    <td> {{ cacObj.cacGroupDesc }}</td>
    <td>  {{ cacObj.cacLongDesc }}</td>
    <td> {{ cacObj.cacBusType }}</td>
    <td> {{ cacObj.cacRetailFlag }}</td>
    <td>  {{ cacObj.cacSubGroup }}</td>
    <td> {{ cacObj.cacType }}</td>
    <td> {{ cacObj.cacTypeDesc }}</td>
    <td>  {{ cacObj.cacValidFlag }}</td>
    <td>  {{ cacObj.dateMod }}</td>
    <td>  {{ cacObj.jobCacFlag }}</td>
    <td>  {{ cacObj.pmCacFlag }}</td>
    <td>  {{ cacObj.userIdMod }}</td>
  </tr>
  </tbody>
</table>

    </div>
    <div class="col-md-4">
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCACCodes">
        Remove All
      </button>
    </div>
    <div class="col-md-4">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-4">
      <b-pagination
              v-model="page"
              :total-rows="count"
              :per-page="pageSize"
              prev-text="Prev"
              next-text="Next"
              @change="handlePageChange"
      ></b-pagination>
    </div>
    <div class="col-md-12">
      <div v-if="currentCACCode">
        <h4>CAC Code Form</h4>
        <div>
          <label><strong>CAC Code:</strong></label> {{ currentCACCode.cacCode }}
        </div>
        <div>
          <label><strong>CAC Group:</strong></label>
          {{ currentCACCode.cacGroup }}
        </div>
        <div>
          <label><strong>CAC Type:</strong></label>
          {{ currentCACCode.cacType}}
        </div>

        <a
          class="badge badge-warning"
          :href="'/cacCodes/' + currentCACCode.cacCode"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a CAC Code Entry...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CACCodeDataService from "../services/CACCodeDataService";

export default {
  name: "caccode-list",
  data() {
    return {
      cacCodes: [],
      currentCACCode: null,
      currentIndex: -1,
      searchCacCode: "",

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    getRequestParams(searchCacCode, page, pageSize) {
      let params = {};

      if (searchCacCode) {
        params["cacCode"] = searchCacCode;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveCacCodes() {
      const params = this.getRequestParams(
        this.searchCacCode,
        this.page,
        this.pageSize
      );

      CACCodeDataService.getAll(params)
        .then((response) => {
          const { cacCodes, totalItems } = response.data;
          this.cacCodes = cacCodes;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveCacCodes();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveCacCodes();
    },

    refreshList() {
      this.retrieveCacCodes();
      this.currentCACCode = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(cacObj, index) {
      this.currentCACCode = cacObj;
      this.currentIndex = index;
    },

    removeAllCACCodes() {
      CACCodeDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveCacCodes();
  },
};
</script>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>
