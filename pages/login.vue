<script setup lang="ts">
import { defineComponent, computed } from 'vue';
import type { FormError } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Connexion'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Adresse mail',
  placeholder: 'Entrer votre adresse mail'
}, {
  name: 'password',
  type: 'password',
  label: 'Mot de passe',
  placeholder: 'Entrer votre mot de passe'
  }]

const loading = ref(false)

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Votre adresse mail est requise' })
  if (!state.password) errors.push({ path: 'password', message: 'Votre mot de passe est requis' })
  return errors
}

const providers = [{
  label: 'Se connecter avec Google',
  icon: 'i-simple-icons-google',
  color: 'gray' as const,
  click: () => {
    signInWithGithub()
  }
}]

const signIn = async (values: any) => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })
  if (error) {
    console.error('Error signing in:', error)
  }
  else {
    await navigateTo('/confirm')
  }
}

const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo }
  })
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/tasks')
  }
})

const onSubmit = (data: any) => {
  try {
    loading.value = true
    signIn(data)
  }
  catch (error) {
    console.error('Error signing in:', error)
  }
}

</script>

<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Se connecter"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid', label: 'Se connecter' }"
      divider="ou"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #description>
        Vous n'avez pas de compte Instant ? <NuxtLink to="/signup" class="text-primary font-medium">S'enregistrer</NuxtLink>.
      </template>

      <template #password-hint>
        <NuxtLink to="/" class="text-primary font-medium">Mot de passe oublier ?</NuxtLink>
      </template>

      <template #footer>
        En vous inscrivant, vous acceptez nos <NuxtLink to="/" class="text-primary font-medium">Conditions d'utilisations</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
