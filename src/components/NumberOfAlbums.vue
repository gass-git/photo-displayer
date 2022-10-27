<script setup>
    import {computed, watch, ref} from 'vue'
    import {useStore} from 'vuex'
    import AppToast from '@/components/AppToast.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const options = [20, 30, 50]
    const store = useStore()
    const showToast = ref(false)

    const albumsToShow = computed({
        get: () => store.getters['user/albumsToShow'],
        set: (quantity) => store.dispatch('user/updateAlbumsToShow', Number(quantity))
    })

    watch(() => store.getters['user/albumsToShow'], () => {
        triggerToast()
    })

    function triggerToast(){
        showToast.value = true
        
        setTimeout(() => {
            showToast.value = false
        },2500)
    }
</script>

<template>
    <WhiteWrapperLayout>
        <template v-slot:content>
                <label>Number of albums to show</label>
                <select v-model="albumsToShow">
                    <option 
                        v-for="number in options" 
                        :key="number" 
                        :selected="albumsToShow === store.getters['user/albumsToShow']"
                    >
                        {{number}}
                    </option>
                </select>

                <div v-if="showToast">
                    <AppToast message="value updated!"/>
                </div>
        </template>
    </WhiteWrapperLayout>
</template>

<style scoped>
select{
    width:100px;
    margin-left:10px;
    font-size:17px;
    color:grey;
}
</style>