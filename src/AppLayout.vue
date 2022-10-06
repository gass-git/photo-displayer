<template>
    <section id="app-wrapper">

        <!-- main -->
        <section id="app-main">
            <div id="sidebar-container">
                <slot name="sidebar-header" />
                <slot name="sidebar-content" />
            </div>
            <div id="content-container">
                <slot name="content-header" />
                <slot name="content" />
            </div>
        </section>

    </section>
</template>

<style>
    :root{
        --sidebar-width: 320px;
        --line-color:#c0c0c0;
        --header-padding:5px 0 5px 30px;
        --light-gray:#ededed;
    }
    #app-wrapper{
        height: auto;
    }
    #app-header{
        width:auto;
        display: flex;
        padding:var(--header-padding);
        background: var(--light-gray);
    }
    #app-main{
        display:flex;
        width:auto;
        height:fit-content;
        background:var(--app-main-bg);
    }
    #sidebar-container{
        padding: 20px;
        margin-right:20px;
        width:var(--sidebar-width);
        background: var(--light-gray);
    }
    #content-container{
        width:calc(100vw - var(--sidebar-width));
        height:auto;
        padding:10px;
    }
</style>