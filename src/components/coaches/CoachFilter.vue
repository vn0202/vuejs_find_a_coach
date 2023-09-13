<template>
  <section>
    <base-card>
    <h2>Find your coach</h2>
    <div class="flex">
        <span class="filter-option">
        <input type="checkbox" id="frontend" :checked="filter.frontend" @change="changeFilter">
        <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" id="backend" :checked="filter.backend"  @change="changeFilter">
        <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" id="career" :checked="filter.career" @change="changeFilter" >
        <label for="career">Career</label>
    </span>
    </div>
  
</base-card>
  </section>
</template>
<script>
export default{
props:['filter'],
 methods:{
    changeFilter(event){
        const input = event.target.id;
        const value = event.target.checked;
        const newFilter = {
            ...this.filter,
            [input]:value
        };
        this.$emit('change-filter', newFilter);

    }
 }

}</script>