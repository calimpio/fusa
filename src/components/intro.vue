<template>
    <h1>{{msg}}</h1>
</template>

<style>

</style>

<script>
    export default{
        data(){
            return {
                msg:'' 
            }
        },
        mounted(){
            //
            SRequester((rq)=>{
                if(rq.status==200)
                    this.msg = rq.data.msg;
                console.log(rq); 
            }).Router("home");
            SRequester((rq)=>{
                if(rq.status==200)
                    this.msg = rq.data.msg;
                console.log(rq);
            }).Router("exampleController/subController/mySubRute");
        },
        methods(){
            return {

            }
        }       
    }
</script>