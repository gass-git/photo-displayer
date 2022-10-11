<script setup>
    import HomeButton from '@/components/HomeButton.vue'
</script>

<template>
    <section id="wrapper">
        <div id="header">
            <slot name="header-content" />
            <HomeButton />
        </div>
        <div id="main">
            <slot name="main-content" />
        </div>
    </section>
</template>

<style scoped>
#wrapper{
    width: 100%;
    height: auto;
}
#header{
    display: flex;
    justify-content: space-between;
    padding:0 0 0 35px;
    align-items: center;
    height: 60px;
    font-size:20px;
    text-transform: capitalize;
    background:white;
    border-bottom:1px solid #e0e0e0;
}
#main{
    padding:20px 0 0 25px;
}
</style>