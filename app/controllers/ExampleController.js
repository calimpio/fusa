

app_router["exampleController"] = {
    use:function(req,res,next){
        //midleware
        next();
    },
    router:{        
        subController:{
            router:{
                mySubRute:function(req,res){
                    return res.status(200).send({msg:"subController!"});
                }
            }
        }
    }
}



 