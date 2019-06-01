require('./globals');


import intro from './components/intro.vue';

var routes = {

    '/intro': {
        name: 'intro'
    }    
};

global.app = new Vue({
    el: '#app',
    data: {
        app_name: '<?= app.name ?>',
        current_route: '/intro',
        params: {}
    },
    components: {
        'intro': intro,        
    },

    computed: {
        formatedRoute: function () {
            var route = routes[this.current_route];
            if (!route) {
                return 'intro';
            }
            return route.name;
        }
    },


});