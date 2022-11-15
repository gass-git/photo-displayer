<script setup lang="ts">
    import {defineProps} from 'vue'

    const props = defineProps({fill:Boolean, iconName:String, border:Boolean})
</script>

<template>
    <slot name="button-content">
        <div v-if="props.fill" class="profile-link-wrapper">
            <span class="material-symbols-outlined fill-icon">
                {{props.iconName}}
            </span>
        </div>
        <div v-else class="profile-link-wrapper">
            <span class="material-symbols-outlined">
                {{props.iconName}}
            </span>
        </div>
    </slot>
</template>

<style scoped>
.profile-link-wrapper{
    display:grid;
    place-items: center;
    aspect-ratio: 1;
    height:60px;
    border-left:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
    color:var(--dark-navy);
}
.profile-link-wrapper:hover{
    background:#fafafe;
}
</style>