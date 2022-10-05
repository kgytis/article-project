<template>
    <div>
        <ul>
            <router-link to="/articles"><li>Home</li></router-link>
            <router-link to="/articles"><li>Articles</li></router-link>
            <li>+ New Article</li>
        </ul>
    </div>
</template>

<style scoped>
    ul {
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    li{
        border : 1px solid #9fd3c7;
        padding : 0.2rem 1rem;
        border-radius: 1rem;
        color : white;
        background-color: #9fd3c7;
        
    }
    a{
        text-decoration: none;
    }

    div{
        margin: 1rem 0;
    }
</style>