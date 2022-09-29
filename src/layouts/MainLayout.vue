<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          JWT авторизация
        </q-toolbar-title>

        <router-link to="/">Регистрация</router-link>
        <router-link to="/login">Логин</router-link>
        <router-link to="/user">Данные о пользователе</router-link>

        <q-btn
          label="Выйти"
          color="primary"
          @click="logoutHandler"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Ссылки на исходники
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {useRouter} from "vue-router/dist/vue-router";
import {api} from "boot/axios";
import {useQuasar} from "quasar";

const linksList = [
  {
    title: 'Исходный код клиентской части',
    caption: 'github.com',
    icon: 'school',
    link: 'https://github.com/kirill55580666/quasar_jwt'
  },
  {
    title: 'Исходный код серверной части',
    caption: 'github.com',
    icon: 'school',
    link: 'https://github.com/kirill55580666/quasar_jwt'
  },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const router = useRouter()

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logoutHandler () {
        api.get('/auth/logout')
          .then(() => {
            router.push({path: '/'})
          })
          .catch((e) => {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Вы не вошли, чтобы выходить'
            })
          })
      }
    }
  }
})
</script>

<style lang="scss">
  a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
    text-transform: uppercase;
    transition: color .3s ease-in-out;
    &:hover {
      color: #b4b4b4;
    }
  }
</style>
