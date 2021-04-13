Vue.createApp({
    data() {
        return {
            env: null,
            items: null,
            status: 'loading', // loaded, errored
            newItemName: '',
            addItemStatus: 'idle', // sending, errored
        }
    },
    async mounted() {
        try {
            await this.getEnv();
            this.getItems();
        }
        catch (error) {
            console.error(error);
        }
    },
    methods: {
        async getEnv() {
            let response = await axios.get(window.location.href + "env.json");
            this.env = response.data;
        },
        async getItems() {
            try {
                let itemsUrl = this.env.BACKEND_BASE_URL + "/items";
                console.log(itemsUrl);
                let response = await axios.get(itemsUrl);
                this.items = response.data;
                this.status = 'loaded';
            } catch (error) {
                console.error(error);
                this.status = 'errored';
            }
        },
        addItem() {
            let newItem = { name: this.newItemName };
            this.newItemName = '';
            this.addItemStatus = 'sending';
            axios.post(this.env.BACKEND_BASE_URL + "/items", newItem)
                .then(() => {
                    this.addItemStatus = 'idle';
                    this.getItems();
                })
                .catch(error => {
                    console.error(error);
                    this.addItemStatus = 'errored';
                })
        }
    }
}).mount("#app");
