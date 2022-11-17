<script setup lang="ts">
    import {computed, watch, ref} from 'vue'
    import {useStore} from 'vuex'
    import AppToast from '@/components/AppToast.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const
        options = [20, 30, 50],
        store = useStore(),
        showToast = ref(false);

    const    
        isAppFirstRender = computed<boolean>(() => store.getters['utils/isAppFirstRender']),
        numberOfAlbumsToShow = computed<20|30|50>(() => store.state.user.globalSettings.albumsToShow);

    const 
        albumsToShow = computed({
            get: () => numberOfAlbumsToShow.value,
            set: (quantity) => store.dispatch('user/updateAlbumsToShow', Number(quantity))
        })

    watch(() => numberOfAlbumsToShow.value, () => {
        isAppFirstRender.value ? null : triggerToast()
    })
    
    function triggerToast():void{
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
                        :selected="albumsToShow === numberOfAlbumsToShow"
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