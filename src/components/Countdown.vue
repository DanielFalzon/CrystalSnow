<template>
    <div class="countdown">
        <b-row w-100>
            <b-col sm="3" class="block">
                <p class="digit">{{ days | two_digits }}</p>
                <p class="text">Days</p>
            </b-col >
            <b-col sm="3" class="block">
                <p class="digit">{{ hours | two_digits }}</p>
                <p class="text">Hrs</p>
            </b-col>
            <b-col sm="3" class="block">
                <p class="digit">{{ minutes | two_digits }}</p>
                <p class="text">Min</p>
            </b-col>
            <b-col sm="3" class="block">
                <p class="digit">{{ seconds | two_digits }}</p>
                <p class="text">Sec</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "Countdown",
    props: ["date"],
    mounted() {
    window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
    },
    data(){
        return {
            now: Math.trunc((new Date()).getTime() / 1000)
        }
    },
    computed: {
        dateInMilliseconds() {
            return Math.trunc(Date.parse(this.date) / 1000)
        },
        seconds() {
            return (this.dateInMilliseconds - this.now) % 60;
        },
        minutes() {
            return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
        },
        hours() {
            return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
        },
        days() {
            return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
        }
    },
    filters: {
        two_digits: function(value) {
            if (value < 0) {
                return '00';
            }
            if (value.toString().length <= 1) {
                return `0${value}`;
            }
            return value;
        }
    }

}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
#app {
    align-items: center;
    bottom: 0;
    background-color: #34495e;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top:0;
}

.row {
    margin-top: 0px !important;
}
.text {
    color: white;
    font-size: 20px;
    font-family: 'Roboto Condensed', serif;
    margin-top:-4px;
    margin-bottom: 10px;
    text-align: center;
}

.countdown>.block {
    margin-left: 0px;
} 

.digit {
    color: #ecf0f1;
    font-size: 26px;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 0px;
    text-align: center;
}

.col-sm-3 {
    -webkit-box-flex: 0 !important;
    flex: 0 0 25% !important;
    max-width: 25% !important;
}
</style>