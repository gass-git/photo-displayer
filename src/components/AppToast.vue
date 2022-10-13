<script setup>
    import {defineProps} from 'vue'

    const props = defineProps({message:String})
</script>

<template>
    <section class="toast-wrapper">
        <span class="material-symbols-outlined">
            check_circle 
        </span>
        <div>
            {{props.message}}
        </div>
    </section>
</template>

<style scoped>
.toast-wrapper{
    margin-left: 20px;
    display:flex;
}
.toast-wrapper span{
    margin-right:5px;
}
</style>