import React from 'react';
import Conf from  "../variables.js";

class Message extends React.Component {
    parthMes(mes) {
        //mes=mes.replace(/(https?:\/\/[^\s]+)/, "<a target=\"_blank\" href=\"$1\">$1</a>");


        return mes;
    }
    render() {

        //var className = "list-group-item " + ((this.props.id % 2 === 0) ? "list-group-item-success" : "");
        //var tst = this.props.id % 2;
        const liStyle = {
            color: this.props.mes.color[0],
            backgroundColor: this.props.mes.color[1]
        };
        return <li style={liStyle} className="list-group-item">
            <strong>{this.props.mes.name}: </strong> 
            <span>{this.parthMes(this.props.mes.text)}</span>		
        </li>
    }
}

export class Messages extends React.Component {
    componentDidUpdate() {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    render() {
        return <div  className="row" >
        <div className="col-xs-12">
        <ul  className="list-group" id="messages">
    {this.props.messages.map((mes, i) => {
                        return (
                                <Message
                                    key={i}
                                    id={i}
                                    mes={mes}
                                    />
                                );
                          })
    }                    
    </ul>
    </div>
    </div>
    }
}


export class MessageCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.text==''){
            return;
        }
        var message = {
            text: this.state.text
        }
        this.props.socket.emit('send:message', message);
        this.setState({text: ''});
    }
    changeHandler(e) {
        this.setState({text: e.target.value});
    }
    render() {
        return <div id="message-create" className="row">
            <div  className="col-xs-12">        
                <form  onSubmit={this.handleSubmit.bind(this)}>
                    <div className="input-group input-group-lg">
                        <input autoFocus type="text" 
                                className="form-control input-lg" 
                                onChange={this.changeHandler.bind(this)}
                                value={this.state.text}
                                maxLength={Conf.maxMesLength}
                                placeholder="Your message ..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-default">send</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    }
}