<template>
  <q-page padding>
    <q-card class="bg-secondary text-white">
      <q-card-section>
        Почта пользователя: {{ email }}
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="name"
          label="Имя"
          square
          color="white"
          label-color="white"
        >
<!--          <q-btn-->
<!--            style="height: 80%; margin-top: auto; margin-bottom: auto"-->
<!--            @click="deleteHandler"-->
<!--          >УДАЛИТЬ</q-btn>-->
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="address"
          label="Адрес"
          square
          color="white"
          label-color="white"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="phone"
          label="Телефон"
          square
          color="white"
          label-color="white"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          filled
          v-model="about"
          label="Обо мне"
          square
          color="white"
          label-color="white"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          label="Обновить данные о пользователе"
          type="submit"
          color="secondary"
          @click="updateHandler"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {onMounted, ref} from "vue";
import {api} from "boot/axios";
import MyInput from "components/MyInput";

export default {
  name: 'UserInfo',
  components: {
    MyInput
  },
  setup() {
    const email = ref(null)
    const name = ref(null)
    const address = ref(null)
    const phone = ref(null)
    const about = ref(null)
    onMounted(() => {
      api.get('/users')
        .then((response) => {
          const data = response.data
          email.value = data.email
          name.value = data.name
          address.value = data.address
          phone.value = data.phone
          about.value = data.about
        })
    })
    return {
      email,
      name,
      address,
      phone,
      about,
      updateHandler() {
        api.patch('/users/update', {
          name: name.value,
          address: address.value,
          phone: phone.value,
          about: about.value
        })
          .catch((e) => console.log(e))
      },
      // deleteHandler(e) {
      //   const res = e.target.closest('div')
      //   console.log(res.childNodes[0])
      //   res.childNodes[0].value = ''
      //   console.log(e)
      // }
    }
  }
}
</script>
