

app_router["auth"] = {
    router: {
        register: function (req, res) {
            var v = new Validation_(req.params);
            v.rule("username", { unique: [User_], require: [] });
            v.rule("email", {require: [] });
            v.rule("name", { require: [] });
            v.rule("password", { require: [] });
            if (!v.hasErros()) {
                var u = User_().create({
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
            var u = User_().where("username == " + req.params.username);
            if (u) {
                if(HashCompare(req.params.password,u[0].getField('password'))){
                    var s = randomStr();
                    var us =User_().where("session == "+s);
                    if(!us){
                        u[0].setField("session",s);
                        u[0].update();
                        return res.send({session_token:s});
                    }
                    return res.status(401).send({errors:['TokenHasTaken']});
                }
            }
            return res.status(402);
        },
        forgetpassword: function (req, res) {
            
        }
    }
}






