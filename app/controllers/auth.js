

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

                },
                confirmate: function (req, res) {

                }
            }
        },
        changepassword: function (req, res) {

        }
    }
}






