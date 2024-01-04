import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from "./store/index.js";

import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBagde from "./components/ui/BaseBagde.vue";
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));
const BaseSpinner = defineAsyncComponent(()=> import("./components/ui/BaseSpinner.vue") );
const app = createApp(App);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-bagde', BaseBagde);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);


app.use(router);
app.use(store);
app.mount('#app')
