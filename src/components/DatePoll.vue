<template>
    <div>
        <div class="mt-2 mb-2" v-bind:key="dateTime.id" v-for="dateTime in dateTimes">
            <svg height = "35px" width = "100%">
                <rect :width= "calcWidth(dateTime.votes) + '%'" height="35" style="fill:#1dc2dc8a;" />
                <text x="10" y="23" font-family="sans-serif" font-size="13px" fill="#6c757d">{{dateTime.date}} at {{dateTime.time}} BST</text>
            </svg>
        </div>
    </div>
</template>

<script>

export default {
    name: "DatePoll",
    props: ["dateTimes"],
    data(){
        return {
            totalVotes: 0,
            currDateTimes: this.dateTimes
        }
    },
    created() {
        for(var i = 0; i < this.currDateTimes.length; i++){
            this.totalVotes += this.currDateTimes[i].votes;
        }
    },
    methods: {
        calcWidth(votes){
            return (votes / this.totalVotes) * 100;
        }
    }
}

</script>

<style scoped>

</style>