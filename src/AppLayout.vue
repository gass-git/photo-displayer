<template>
    <section id="app-wrapper">

        <!-- header -->
        <div id="app-header"><slot name="header" /></div>

        <!-- main -->
        <section id="app-main">
            <div id="sidebar"><slot name="sidebar" /></div>
            <div id="content"><slot name="content" /></div>
        </section>

    </section>
</template>

<style>
    :root{
        --header-height: 70px;
        --sidebar-width: 250px;
        --line-color:#cecece;
    }
    #app-wrapper{
        height:100vh;
        width: 100vh;
    }
    #app-header{
        height:var(--header-height);
        width:100vw;
        display: flex;
        padding:0 0 0 20px;
        border-bottom:1px solid var(--line-color);
    }
    #app-main{
        display:flex;
        width:100vw;
        height:calc(100vh - var(--header-height));
    }
    #sidebar{
        width:var(--sidebar-width);
        border-right:1px solid var(--line-color);
    }
    #content{
        width:calc(100vw - var(--sidebar-width));
        height:auto;
    }
</style>