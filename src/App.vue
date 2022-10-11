<script setup>
    import {onMounted} from 'vue'
    import {useStore} from 'vuex'
    import AppLayout from '@/layouts/AppLayout.vue'
    import AppName from '@/components/AppName.vue'
    import MenuOptions from '@/components/MenuOptions.vue'

    const store = useStore()

    onMounted(() => {
        store.dispatch('albums/fetch')
    })
</script>

<template>
    <AppLayout>

        <template v-slot:sidebar-header>
            <AppName />
        </template>
        
        <template v-slot:sidebar-content>
            <MenuOptions />
        </template>

        <template v-slot:content>
            <div id="content">
                <router-view />
            </div>
        </template>
        
    </AppLayout>
</template>

<style>
#content{
    width:100%;
    display:flex;
    justify-content: flex-start;
    flex-flow:row wrap;
}
</style>