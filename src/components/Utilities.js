import React, { Component } from "react";

export class MaterializeComponent extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    renderErrors(key, campo) {
        var errors = this.state.errors;
        var data = errors[key];
        if (data) {
            return data.map((i) => {
                return tools.errors(campo, i);
            })
        }
    }

    removeError(key) {
        return () => {
            delete this.state.errors[key];
            this.setState({ errors: this.state.errors });
        }
    }

    onChangeParam(name, min, max) {
        return (e,ex) => {
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
            if(typeof ex === 'function'){
                ex(p[name]);
            }
        }
    }

}


export class Input extends MaterializeComponent {
    static focusBorderColor = "#3f51b5";
    static focusShadow = "0 1px 0 0 #1a237e";
    static blurBorderColor = "black";
    static blurShadow = "0 0px 0 0 black";
    static errorColor = "red";

    errors() {
        var errors = this.props.errors;
        if (errors) {
            if (typeof errors.map === 'function') {
                return errors.map((i) => {
                    return <span class="helper-text" data-error={i} />;
                })
            }
            return <span class="helper-text" data-error={errors} />;
        }
    }

    state = {
        borderColor: Input.blurBorderColor,
        shadow: Input.blurShadow,
    }

    onBlur = () => {
        if(this.props.onBlur)
            this.props.onBlur();
        this.setState({
            borderColor: Input.blurBorderColor,
            shadow: Input.blurShadow,
        });
    }

    onFocus = () => {
        this.setState({
            borderColor: Input.focusBorderColor,
            shadow: Input.focusShadow,
        });
    }

    componentDidMount(){
        super.componentDidMount();
        M.updateTextFields();
    }


    render() {
        var isInvalid = false;
        if (this.props.errors) {
            if (this.props.errors.length > 0) {
                this.state.borderColor = Input.errorColor;
                this.state.shadow = Input.blurShadow;
                isInvalid = true;
            }
        }
        return <div className={"input-field " + this.props.className
        }>
            {this.props.children}
            <input id={this.props.label + "_input_"+this.props.key}
                type={this.props.type}
                value={this.props.value}
                onChange={this.props.onChange}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                max={this.props.max}
                min={this.props.min}
                className={
                    " " + this.props.classNameInput + " " +
                        isInvalid ? "invalid" : ''
                }
                style={{ borderBottomColor: this.state.borderColor, boxShadow: this.state.shadow }}
                step={this.props.step}
            />
            <label for={this.props.name + "_input_"+this.props.key} style={{ color: this.state.borderColor }}>{this.props.label}</label>
            {this.errors()}
        </div>
    }
}


export class Button extends MaterializeComponent {
    static classColor = "indigo darken-4";
    state = {
        classColor: Button.classColor,
    }
    render() {
        return <button
            className={"btn waves-effect waves-light " + this.props.className + " " + this.state.classColor}
            onClick={this.props.onClick}
            disabled={this.props.disabled}
        >
            {this.props.children}
        </button>
    }
}

export class Switch extends MaterializeComponent {
    render() {
        return <div class="switch">
            <label>
                {this.props.leftLabel}
                <input type="checkbox" value={this.props.value} onChange={this.props.onChange} />
                <span class={"lever"}></span>
                {this.props.rightLabel}
            </label>
        </div>
    }
}



export class Select extends MaterializeComponent {

    static Group = class Group extends MaterializeComponent{
        render(){
            return <optgroup label={this.props.label}>
                {this.props.children}
            </optgroup>
        }
    }

    componentDidMount(){
                  
    }

    static Option = class Option extends MaterializeComponent {
        static textColor="#3f51b5";        
        render() {            
            return <option value={this.props.value} disabled={this.props.disabled} selected={this.props.selected}>
                {this.props.children}
            </option>
        }
    }

    render() {
        return<div className="input-field">
            <select value={this.props.value} onChange={this.props.onChange} onBlur={this.props.onBlur}>
            {this.props.children}
            </select>
            <label>{this.props.label}</label>
        </div>
        
    }
}

export class Picker extends MaterializeComponent{
    componentDidMount(){        
        var elems = document.getElementById(this.props.label.trim()+'_input');        
        console.log(M.Timepicker.init(elems, this.props.options));        
        
    }

    componentDidUpdate(){        
        var elems = document.getElementById(this.props.label.trim()+'_input');         
        console.log(M.Timepicker.init(elems, this.props.options));        
    }
    render(){
        return <div className="input-field">
            <input id={this.props.label.trim()+'_input'} className="no-autoinit" type="time" step="1" className={this.props.className?this.props.className:"timepicker"} value={this.props.value} onChange={this.props.onChange}/>
            <label for={this.props.id}>{this.props.label}</label>
        </div>
    }
}