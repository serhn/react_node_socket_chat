import React from 'react';

export class InfoBlock extends React.Component {
    //
//                <button  className="btn btn-default">History</button>
//                <button className="btn btn-default">Profile</button> 
    logout() {
        //this.props.onLogout();
        this.props.socket.emit('user:logout', "logout");
    }
    userList() {
        this.props.onUserList();
    }
    render() {
        return <div id="info" className="row">
            <div className="col-xs-3">
                <button onClick={this.userList.bind(this)} className="btn btn-default">
                    <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                </button>
            </div>
            <div className="col-xs-6 text-center info-block">
                <h6>Welcome to chat, <b>{this.props.user}</b></h6>
            </div>
            <div  className="col-xs-3 text-right">    
                <button onClick={this.logout.bind(this)} className="btn btn-default">
                    <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    }
}
export default InfoBlock;