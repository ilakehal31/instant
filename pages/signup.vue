<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: "S'inscrire"
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const successMsg = ref('')
const loading = ref(false)

const fields = [{
  name: 'name',
  type: 'text',
  label: 'Prénom et nom',
  placeholder: 'Entrer votre nom et prénom'
}, {
  name: 'email',
  type: 'text',
  label: 'Adresse mail',
  placeholder: 'Entrer votre adresse mail'
}, {
  name: 'password',
  label: 'Mot de passe',
  type: 'password',
  placeholder: 'Entrer votre mot de passe'
}]

const validate = (state: any) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Votre adresse mail est requise' })
  if (!state.password) errors.push({ path: 'password', message: 'Votre mot de passe est requis' })
  return errors
}

const providers = [{
  label: 'Inscription avec Google',
  icon: 'i-simple-icons-google',
  color: 'gray' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

const signUp = async (values: any) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { 'full_name': values.name } },
    });
    if (error) throw error

    successMsg.value = 'Un email de confirmation vous a été envoyé'
  }
  catch (error) {
    console.error('Error signing up:', error)
  }
}

function onSubmit (data: any) {
  try {
    signUp(data)
    navigateTo('/confirm')
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
      align="top"
      title="Créer votre compte"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Créer votre compte' }"
      divider="ou"
      :loading="loading"
      @submit="onSubmit"
    >
      <template #description>
        Vous possèdez déjà un compte Instant ? <NuxtLink to="/login" class="text-primary font-medium">Connexion</NuxtLink>.
      </template>

      <template #footer>
        En vous inscrivant, vous acceptez nos <NuxtLink to="/" class="text-primary font-medium">Conditions d'utilisations</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
