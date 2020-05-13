

app_router["auth"] = {
    router: {
        register: function (req, res) {
            var v = new Validation_(req.params);
            v.rule("username", { unique: [User_], require: [] });
            v.rule("email", { require: [], email:[] });
            v.rule("name", { require: [] });
            v.rule("password", { require: [] });
            if (!v.hasErros()) {
                var u = User_().create({
                    username: req.params.username,
                    email: req.params.email,
                    password: HashEncript_(req.params.password),
                    name: req.params.name,
                });
                return res.status(201).send({ id: u.getId() });
            }
            return res.status(401).send(v.getErrors());

        },
        login: function (req, res) {
            var v = new Validation_(req.params);
            v.rule("username", { require: [] });
            v.rule("password", { require: [] });
            if (!v.hasErros()) {
                var u = User_().where("username", req.params.username).first();                
                if (u) {                    
                    if (HashCompare_(req.params.password, u.password)) {
                        if (u.session !== "null")
                            return res.send({ session_token: u.session })
                        var s = reandomStr_();
                        var us = User_().where("session",s).get();
                        if (us.length == 0) {
                            u.session= s;
                            u[0].update();
                            return res.send({ session_token: s, user: u.public() });
                        }
                        return res.status(401).send({ errors:{session:['TokenHasTaken']}});
                    }
                }
            }
            return res.status(402).send(v.getErrors());
        },
        forgetpassword: {
            index: function (req, res) {
                var v = new Validation_(req.params);
                v.rule("username", { require: [] });
                v.rule("email", { require: [], email: [] });
                if (v.hasErros())
                    return res.status(402).send(v.getErrors());
                var u = User_().where("email", req.params.email).where("username", req.params.username).first();
                if (u) {
                    var code = reandomStr_();
                    u.forgetpassword_code = code;
                    u.update();
                    var body = "<h1>" + app.name + "</h1>";
                    body += "<p>We send to you a code to you will copy to setp two in the app</p>";
                    body += "<b>" + code + "</b>";
                    MailApp.sendEmail({
                        to: u.email,
                        subject: app.name + " Forget Password Confirmation",
                        htmlBody: body
                    });
                    return res.send({});
                }
                return res.status(401).send({ errors:{ email:['EmailOrUsernameNotMatch'] }});
            },
            router: {
                confirmate: function (req, res) {
                    var v = new Validation_(req.params);
                    v.rule("username", { require: [] });
                    v.rule("code", { require: [] });
                    v.rule("email", { require: [], email: [] });
                    if (v.hasErros())
                        return res.status(402).send({ erros: v.getErrors() });
                    var u = User_().where("email", req.params.email)
                        .where("username", req.params.username)
                        .where("forgetpassword_code", req.params.code)
                        .first();
                    if (u) {
                        return res.send({ user_id: u.id });
                    }
                    return res.status(401).send({ errors:{ email:['EmailOrUsernameNotMatch'] }});
                },
                changepassword: function (req, res) {
                    var v = new Validation_(req.params);
                    v.rule("id", { require: [] });
                    v.rule("code", { require: [] });
                    v.rule("password", { require: [] });
                    v.rule("passwordConfirm", { require: [], confirmation: [req.params.password] });
                    if (v.hasErros())
                        return res.status(402).send(v.getErrors());
                    var u = User_().where("id",req.params.id).where("forgetpassword_code",req.params.code).first();
                    if (u) {
                        u.password = HashEncript_(req.params.password);
                        u.update();
                        return res.send();
                    }
                    return res.status(402).send({errors:{user:['UserNotExist']}});
                }
            }
        },

    }
}






