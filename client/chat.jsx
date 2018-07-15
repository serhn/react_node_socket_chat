import React from 'react';
import ReactDOM from 'react-dom';
import io  from "socket.io-client";


import Login  from "./componentLogin.jsx";
import {Messages, MessageCreate}  from "./componentMessages.jsx";
import InfoBlock  from "./componentInfoBlock.jsx";
import UsersList  from "./componentUserList.jsx";

var socket = io.connect('http://'+location.hostname+':3001');
//var socket = io();

class ChatApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {users: [], messages: [], text: '', user: '', color: ['#000000', '#ffffff']};
    }
    componentDidMount() {
        socket.on('send:message', this._messageRecieve.bind(this));
        socket.on('user:claim', this._handleLogin.bind(this));
        socket.on('user:logout', this.handleLogout.bind(this));
        //socket.on('change:name', this._userChangedName.bind(this));
        //socket.on('user:join', this._userJoined.bind(this));
    }
    _messageRecieve(message) {
        if(message.error==="not_user"){
            this.handleLogout();
            return;
        }
        var messages = this.state.messages;
        messages.push(message);
        this.setState({messages});
    }
    /*
     _userChangedName(data) {
     var {oldName, newName} = data;
     this.setState({user: newName});
     }
     _userJoined(data) {
     var {users, messages} = this.state;
     var {name} = data;
     users.push(name);
     messages.push({
     user: 'APPLICATION BOT',
     text: name + ' Joined'
     });
     this.setState({users, messages});
     
     }
     */

    _handleLogin(data) {
        //console.log(data);
        if(data.login){
            this.setState({user: data.login, users:data.users});
        }else{
            alert(data.error)
            this.handleLogout();
        }
        
//socket.emit('change:name', names);
        /*
         
         var oldName = this.state.user;
         socket.emit('change:name', {name: newName}, (result) => {
         if (!result) {
         return alert('There was an error changing your name');
         }
         var {users} = this.state;
         var index = users.indexOf(oldName);
         users.splice(index, 1, newName);
         this.setState({users, user: newName});
         });
         */
    }
    handleUserList() {
        //alert("ha")
        var el = $("#users");
        if (el.hasClass("hidden")) {
            $("#users").removeClass("hidden");
        } else {
            $("#users").addClass("hidden");
        }

    }
    handleLogout() {
        this.setState({user: ''});
    }
//componentWillUpdate(){
//    alert("ha")
//}
    render() {
        if (this.state.user === '') {
            return <div className="container">            
                <Login socket={socket}/>                   
            </div>
        } else {
            return <div className="container-fluid">
                <div className="row hidden" id="users">
                    <div className="col-xs-12" >
                        <UsersList  socket={socket} users={this.state.users}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12" id="chat">
                        <InfoBlock 
                            user={this.state.user} 
                            onUserList={this.handleUserList.bind(this)}
                            socket={socket}/>
                        <Messages messages={this.state.messages} />
                        <MessageCreate socket={socket} user={this.state.user} color={this.state.color} />
                    </div>
                </div>
            </div>
        }
    }
}

ReactDOM.render(<ChatApp/>, document.getElementById('app'));