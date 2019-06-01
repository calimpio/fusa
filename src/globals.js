global.gTools = {};


global.goTo = function (value) {
    app.current_route = value;
}
global.getParams=function(key){
    return app.params[key];
}
global.setParams=function(key, value){
    app.params[key] = value;
}

global.Async_Comp=function(route) {
    return Async_Custom('components/' + route.name, route);
}

global.Async_Custom=function(asset, component) {

    if (!component.methods)
        component.methods = {
            goTo: goTo
        };
    else component.methods.goTo = goTo;
    return (resolve, reject) => {
        Success = (data) => {
            component.template = '<' + component.name.replace('/', '-') + '-component></' + component.name + '-component>';
            var html = document.createElement('div');
            html.innerHTML = data;
            var t_elem = html.getElementsByTagName('template')[0];
            var s_elem = html.getElementsByTagName('script')[0];
            if (s_elem && t_elem) {
                var script = s_elem.textContent.toString();
                var temp = t_elem.innerHTML;
                var comp = eval(script);
                comp.template = temp
                if (!comp.methods)
                    comp.methods = component.methods;
                else {
                    comp.methods.goTo = goTo;
                    comp.methods.setParams = setParams;
                    comp.methods.getParams = getParams;
                }
                Vue.component(component.name.replace('/', '-') + '-component', comp);
                if (component.first) {
                    component.first();
                    setTimeout(() => {
                        resolve(component);
                    }, 1000);
                } else resolve(component);
            }
        }
        google.script.run.withSuccessHandler(Success).Asset(asset);
    }
}

global.ImportTool=function(file) {
    Success = (data) => {
        var cont = document.createElement('div');
        cont.innerHTML = data;
        var s = cont.getElementsByTagName('script')[0];
        gTools[file] = eval(s.textContent.toString());
    }
    google.script.run.withSuccessHandler(Success).Asset('tools/' + file);
}

global.ImportTemplate=function(name) {
    Success = (data) => {
        var html = document.createElement('div');
        html.innerHTML = data;
        var t_elem = html.getElementsByTagName('template')[0];
        var s_elem = html.getElementsByTagName('script')[0];
        if (s_elem && t_elem) {
            var script = s_elem.textContent.toString();
            var temp = t_elem.innerHTML;
            var comp = eval(script);
            comp.template = temp
            if (!comp.methods)
                comp.methods = { goTo: goTo };
            else {
                comp.methods.goTo = goTo;
            }
            Vue.component(name.replace('/', '-') + '-temp', comp);
        }
    }
    google.script.run.withSuccessHandler(Success).Asset('templates/' + name.replace('-', '/'));
}

global.SRequester=function(callback){
    return google.script.run.withSuccessHandler(callback);
}


global.gTool=function(resource){
    return new resource();
}

