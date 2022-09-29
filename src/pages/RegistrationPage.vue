<template>
  <q-page class="flex flex-center absolute-center">
  <div id="q-app">
    <div class="q-pa-md" style="max-width: 400px; min-width: 300px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="email"
          label="Ваш email *"
          hint="Введите ваш email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Введите что нибудь']"
        ></q-input>

        <q-input
          filled
          type="password"
          v-model="password"
          label="Придумайте пароль *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Нужно придумать пароль',
          val => val.length >= 4 && val.length <= 16 || 'Пароль должен быть больше 4 символов и меньше 16 символов'
        ]"
        ></q-input>

        <q-toggle v-model="accept" label="Мы соглашаемся, что принимаем вас на стажировку"></q-toggle>

        <div>
          <q-btn label="Зарегистрироваться" type="submit" color="primary"></q-btn>
        </div>
      </q-form>

    </div>
  </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {LocalStorage, useQuasar} from "quasar";
import {api} from "boot/axios";
import {useRouter} from "vue-router/dist/vue-router";

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const email = ref(null)
    const password = ref(null)
    const accept = ref(false)
    return {
      email,
      password,
      accept,
      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Нужно согласиться с принятием на стажировку)'
          })
        }
        else {
          api.post('/auth/registration', {email: email.value, password: password.value})
            .then((response) => {
              email.value = null
              password.value = null
              accept.value = false
              const accessToken = response.data.accessToken
              LocalStorage.set('accessToken' ,accessToken)

              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Вы зарегистрировались'
              })

              router.push({path: '/login'})
            })
            .catch((reason ) => {
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: reason?.response?.data?.message || "Непредвиденная ошибка"
              })
            })
        }
      },
      onReset () {
        email.value = null
        password.value = null
        accept.value = false
      }
    }
  }
})
</script>
