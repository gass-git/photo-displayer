<script setup>
    import {onMounted} from 'vue'
    import {useStore} from 'vuex'
    import AppLayout from '@/assets/AppLayout.vue'
    import AppName from '@/components/AppName.vue'
    import HomeButton from '@/components/HomeButton.vue'
    import MenuTitle from '@/components/MenuTitle.vue'
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
            <HomeButton />
        </template>
        
        <template v-slot:sidebar-content>
            <MenuTitle name="Albums"/>
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
    width: calc(100vw - var(--sidebar-width) - var(--sidebar-right-margin));
    display:flex;
    justify-content: flex-start;
    flex-flow:row wrap;
}


</style>