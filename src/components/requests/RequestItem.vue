<template>
     <li>
        <div>
            <a :href="emailLink">{{ email }}</a>
        </div>
        <p>{{ message }}</p>
     </li>
</template>
<script>
export default{
    props:['email', 'message'], 
    computed:{
        emailLink(){
            return "mailto:" + this.email;
        }

    },

}</script>



<style scoped>
li{
    list-style:none;
    border-radius:6px;
    padding: 8px;
    border:1px solid #ccc;
}
    
</style>