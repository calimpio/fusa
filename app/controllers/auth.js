

app_router["auth"] = {
    router: {
        register: function (req, res) {
            var v = new Validation_(req.params);
            v.rule("username", { unique: [User_], require: [] });
            v.rule("email", { require: [] });
            v.rule("name", { require: [] });
            v.rule("password", { require: [] });
            if (!v.hasErros()) {
                var u = User_().create({
                    username: req.params.username,
                    email: req.params.email,
                    password: HashEncript(req.params.password),
                    name: req.params.name,
                });
                return res.send({ id: u.getId() });
            }
            return res.status(401).send({ errors: v.getErrors() });

        },
        login: function (req, res) {
            var v = new Validation_(req.params);
            v.rule("username", { require: [] });
            v.rule("password", { require: [] });
            if (!v.hasErros()) {
                var u = User_().where("username == " + req.params.username);
                if (u.length>0) {                    
                    if (HashCompare(req.params.password, u[0].getField('password'))) {
                        if(u[0].getField('session')!=="null")
                            return res.send({session_token:u[0].getField('session')})
                        var s = randomStr();
                        var us = User_().where("session == " + s);
                        if (us.length==0) {
                            u[0].setField("session", s);
                            u[0].update();
                            return res.send({ session_token: s });
                        }
                        return res.status(401).send({ errors: ['TokenHasTaken'] });
                    }
                }
            }
            return res.status(402).send({ errors: v.getErrors() });
        },
        forgetpassword: {
            router: {
                index: function (req, res) {
                    var v = new Validation_(req.params);
                    v.rule("username", { require: [] });
                    v.rule("email", { require: [], email:[] });
                    if(v.hasErros())
                        return res.status(402).send({erros:v.getErrors()});
                    var u = User_().where("email == "+req.params.email+" & username == "+req.params.username)[0];
                    if(u){
                        var code = randomStr();
                        u.setField("forgetpassword-code",code);
                        u.update();
                        var body = "<h1>"+app.name+"</h1>";
                        body+="<p>We send to you a code to you will copy to setp two in the app</p>";
                        body+="<b>"+code+"</b>";                        
                        MailApp.sendEmail({
                            to:u.getField('email'),
                            subject:app.name+" Forget Password Confirmation",
                            htmlBody:body
                        });
                        return res.send({});
                    }                    
                    return res.status(401).send({errors:['EmailOrUsernameNotMatch']});
                },
                confirmate: function (req, res) {
                    var v = new Validation_(req.params);
                    v.rule("username", { require: [] });
                    v.rule("code", { require: [] });
                    v.rule("email", { require: [], email:[] });
                    if(v.hasErros())
                        return res.status(402).send({erros:v.getErrors()});
                    var u = User_().where("email == "+req.params.email+" & username == "+req.params.username+" & forgetpassword-code == "+req.params.code)[0];
                    if(u){
                        return res.send({user_id:u.getId()});
                    }
                    return res.status(401).send({errors:['EmailOrUsernameNotMatch']});
                },
                changepassword: function (req, res) {
                    var v = new Validation_(req.params);
                    v.rule("id", { require: [] });
                    v.rule("code", { require: [] });
                    v.rule("password", { require: [] });
                    v.rule("passwordConfirm", { require: [], confirmation:[req.params.password] });            
                    if(v.hasErros())
                        return res.status(402).send({erros:v.getErrors()});
                    var u = User_().where("id == "+req.params.id+" & forgetpassword-code == "+req.params.code)[0];
                    if(u){
                        u.setField("password",HashEncript(req.params.password));
                        u.update();
                        return res.send();
                    }
                    return res.status(402).send();    
                }
            }            
        },
        
    }
}






