<script setup lang="ts">
definePageMeta({
    layout: 'auth'
})

const user = useSupabaseUser()

watch(user, () => {
    if (user.value) {
        return navigateTo('/feed')
    }
}, { immediate: true })
</script>

<template>
    <div>
        <p class="u-text-black">
            Un email de confirmation vous a été envoyé !
        </p>
         <p class="u-text-black">
            Veuillez valider votre adresse mail avant de continuer.
        </p>
    </div>
</template>