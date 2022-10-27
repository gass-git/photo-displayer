<script setup>
    import {computed, watch, ref, watchEffect} from 'vue'
    import {useStore} from 'vuex'
    import AppToast from '@/components/AppToast.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const
        options = [20, 30, 50],
        store = useStore(),
        showToast = ref(false),
        isFirstRender = ref(true);

    const albumsToShow = computed({
        get: () => store.getters['user/albumsToShow'],
        set: (quantity) => store.dispatch('user/updateAlbumsToShow', Number(quantity))
    })

    watch(() => store.getters['user/albumsToShow'], () => {
 
        // condition to prevent the toast from triggering on first render
        isFirstRender.value ? (isFirstRender.value = false) : triggerToast()
    })
    
    watchEffect(() => {
        triggerToast    
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

                <AppToast v-if="showToast" message="value updated!"/>
        </template>
    </WhiteWrapperLayout>
</template>

<style scoped>
select{
    width:100px;
    padding:5px 10px 5px 10px;
    margin-left:10px;
    font-size:17px;
    color:grey;
}
</style>