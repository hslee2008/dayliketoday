<template>
  <v-app>
    <v-app-bar flat height="50">
      <v-toolbar-title class="">
        {{ string }}
      </v-toolbar-title>

      <input
        ref="dateInput"
        class="mr-3"
        type="date"
        :value="formatDate(dateValue)"
        @blur="changeDate"
      />
    </v-app-bar>

    <div v-if="nodata" class="my-auto mx-auto">
      <img
        src="https://ccei.creativekorea.or.kr/jeonnam/resources/images/common/nones.png"
        width="300"
      />
    </div>
    <div v-else class="text-center" style="margin-top: 60px">
      <p class="mb-2">{{ events[index].name }}</p>
      <h1 class="text-h3">{{ events[index].value.title }}</h1>

      <p class="text-justify ma-3">
        {{ events[index].value.description }}
      </p>

      <img
        v-if="events[index].value.image !== ''"
        :src="events[index].value.image"
        width="350"
      />
      <v-sheet
        width="350"
        elevation="4"
        class="my-4 py-3 text-pink mx-auto"
        v-else
      >
        죄송합니다. 이미지가 존재하지 않습니다.
      </v-sheet>

      <div>
        <v-btn
          v-for="link in events[index].value.links"
          :key="link.link"
          flat
          @click="openPage(link.link, link.source)"
        >
          {{ link.source }}
        </v-btn>
      </div>

      <v-bottom-navigation elevation="0" grow>
        <v-btn
          v-for="(diff, i) in yeardifference"
          :key="diff"
          color="blue"
          @click="index = i"
        >
          <v-icon>mdi-{{ icons[i] }}</v-icon>

          <span> {{ diff }}년 전 </span>
        </v-btn>
      </v-bottom-navigation>
    </div>

    <v-dialog
      v-model="webpage"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="webpage = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ webtitle }}</v-toolbar-title>
      </v-toolbar>

      <v-card>
        <iframe width="100%" height="100%" :src="weblink" />
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import data from "./data";
import { formatDate } from "./utils/date";

const webpage = ref(false);
const weblink = ref("https://google.com");
const webtitle = ref("Google");

const nodata = ref(false);

const events = ref([]);
const yeardifference = ref([]);
const icons = ref([]);
const index = ref(0);

const dateValue = ref("");
const defaultDate = ref(new Date());
let date, month, year, string, foundData;

onMounted(() => {
  defaultDate.value = new Date(localStorage.getItem("date"))
  initialize(defaultDate.value);
});

function initialize(now) {
  events.value = [];
  yeardifference.value = [];
  icons.value = [];

  date = now.getDate();
  month = now.getMonth() + 1;
  year = now.getFullYear();
  dateValue.value = `${year}-${month}-${date}`;
  string = `${month}월 ${date}일`;

  foundData = data[month][date];

  if (foundData) {
    nodata.value = false;

    const keys = Object.keys(foundData);
    const values = Object.values(foundData);

    keys.forEach((key, index) => {
      events.value.push({
        name: key,
        value: values[index],
      });

      yeardifference.value.push(parseInt(year) - parseInt(key));
      icons.value.push(values[index].icon);
    });
  } else {
    nodata.value = true;
  }
}

initialize(defaultDate.value);

function openPage(link, source) {
  webpage.value = true;
  weblink.value = link;
  webtitle.value = source;
}

function changeDate(e) {
  const date = new Date(e.target.value);

  localStorage.setItem("date", e.target.value);

  initialize(date);
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
