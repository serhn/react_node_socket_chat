import React from 'react';

import Conf from  "../variables.js";

class Login extends React.Component {
        constructor(props) {
        super(props);
                this.state = {user: ''};
                //this.input.focus();
        }
        changeHandler(e) {
        this.setState({user: e.target.value});
        }
        handleSubmit(e) {
            e.preventDefault();
            var newName = this.state.user;
            if(newName===''){
                return false;
            }
            this.props.socket.emit('user:claim', newName);
            //this.props.onChangeName(newName);
            this.setState({user: ''});
        }
        render() {
        return <div className="row">
    <div className="col-xs-12 login">
        <form  onSubmit={this.handleSubmit.bind(this)}>
            <div className="input-group input-group-lg">
                <input autoFocus type="text" 
                       placeholder="Your name"
                       className="form-control input-lg" 
                       onChange={this.changeHandler.bind(this)}
                       value={this.state.user}
                       maxLength={Conf.maxUserLength}/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">GO</button>
                </span>
            </div>
        </form>
    </div>
</div>
}
}
export default Login;