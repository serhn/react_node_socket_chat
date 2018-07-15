import React from 'react';
class User extends  React.Component {
   
    render() {
         const liStyle = {
            color: this.props.user.color[0],
            backgroundColor: this.props.user.color[1]
        };
        return <li style={liStyle}  className="list-group-item list-group-item-warning"><b>{this.props.user.name}</b></li>
    }
}
class UsersList extends  React.Component {
    constructor(props) {
        super(props);
        //this.state = {users:[]};
        this.state = {users:this.props.users};
    }
    handleUserList(data){
        this.setState({users: data});
    }
    componentDidMount() {
                this.props.socket.on('user:list', this.handleUserList.bind(this));
    }
    render() {
        
        const listItems = this.state.users.map((user,i) =>
            <User key={i} user={user}/>
        );
        return <ul className="list-group">
        {listItems}   
        </ul>
    }
}
export default UsersList;