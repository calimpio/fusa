import { MaterializeComponent } from "./Utilities";
/**
 * 
 * @prop {Component} parent
 * @prop {number} num 
 */
export default class RegisterComponent extends MaterializeComponent {
    static errors = {
        exist: 'exist',
        noExist: 'noExist',
    }

    constructor(props) {
        super(props);
        this.props.parent.registrosItems.push(this);
    }

    removeRegister = () => {
        var p = this.props.parent;
        delete p.registros[this.props.num];
        delete p.registrosItems[this.props.num];
        p.registrosItems.forEach((i, k) => {
            i.props.num = k;
        });
        p.sendStep = 1;
        p.forceUpdate();
    }

    onChangeParam(name, min, max) {
        return (e) => {
            var p = {}
            p[name] = e.currentTarget.value;
            if (typeof min === 'number') {
                if (Number(p[name]) < min) {
                    p[name] = min;
                }
            }
            if (typeof max === 'number') {
                if (Number(p[name]) > max) {
                    p[name] = max;
                }
            }
            this.setState(p);
        }
    }

    onChangeText(name,maxLength){
        return (e) => {
            var p = {}
            p[name] = e.currentTarget.value.slice(0,maxLength);            
            this.setState(p);
        }
    }

    timeBlur(name) {
        var p = this.state;
            
        if (p[name] >= 2) p[name] = p[name].slice(0, 2);

        if (p[name].length === 1) p[name] = '0' + p[name];

        if (!p[name]) p[name] = '00';

        this.setState(p);
    }

    /**
     * 
     * @param {string} resource 
     * @param {string} key 
     * @param {string} state 
     * @param {RegistroProduction.errors} error 
     */
    validateResource(resource, key, state_, error, item, vali) {
        var r = this.props.parent.state[resource];
        if (r)
            for (var i in r) {
                if (error === 'exist') {
                    if (Number(r[i][key]) === Number(this.state[state_]) || r[i][key] === this.state[state_]) {
                        this.addError(state_, error);
                        return;
                    }
                } else
                    if (error === 'noExist') {
                        if (Number(r[i][key]) === Number(this.state[state_]) || r[i][key] === this.state[state_]) {
                            this.state[item] = r[i];
                            this.setState(this.state);
                            this.deleteError(state_);
                            return;
                        }
                    }
            }
        if (error === 'exist')
            this.deleteError(state_);
        if (error === 'noExist')
            this.addError(state_, error, item);


    }

    addError(key, error_, item) {
        var errors = this.state.errors;
        errors[key] = error_;
        if (error_ == 'noExist') {
            var s = this.state;
            delete s[item];
            this.setState(s);
        }
        this.setState({ errors })
    }

    deleteError(key) {
        var errors = this.state.errors;
        delete errors[key];
        this.setState({ errors })
    }
}