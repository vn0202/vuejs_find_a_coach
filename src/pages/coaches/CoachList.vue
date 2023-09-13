<template>
  <div>
    <coach-filter :filter="filter" @change-filter="setFilters"></coach-filter>

    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="refresh">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/registers">Register as a Coach</base-button>
      </div>
      <section>
        <div v-if="hasCoaches">
          <TransitionGroup name="list" tag="ul">

          <coach-item
            v-for="coach in filterdCoaches"
            :key="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            :id="coach.id"
          ></coach-item>
          </TransitionGroup>
          </div>
        <h3 v-else>No coaches</h3>
      </section>
    </base-card>
  </div>
</template>
<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(newFilter) {
      this.filter = newFilter;
      console.log(this.filter);
    },
    refresh()
    {
       this.filter =  {
        frontend: true,
        backend: true,
        career: true,
      };
    },
  },
  computed: {
    isCoach()
    {
        return this.$store.getters['coaches/isCoach'];
    },
    filterdCoaches() {
      const listCoaches = this.$store.getters["coaches/coaches"];
      return listCoaches.filter((coach) => {
        if (this.filter.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.filter.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.filter.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
