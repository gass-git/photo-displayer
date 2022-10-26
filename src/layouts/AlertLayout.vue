<template>
    <div class="alert">
        <slot name="content" />
    </div>
</template>

<style scoped>
    .alert{
        margin:10px;
        padding:20px;
        width:70%;
        border-radius:5px;
        font-size:19px;
        line-height: 25px;
        background: #89a7e0;
        color:white;
    }
</style>