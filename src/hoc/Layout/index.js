import React, {Component} from 'react';
import './Layout.scss';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class Layout extends Component {
    static propTypes = {
    };
    
    state = {
    	menu: false
    }
	
	toggleMenuHandler = () => {
		this.setState({
			menu: !this.state.menu
		});
	};
	
	menuCloseHandler = () => {
		this.setState({
			menu: false
		});
	};
    
    render(){
        return(
            <div className="Layout">
	            <Drawer
		            isOpen = {this.state.menu}
		            onClose = {this.menuCloseHandler}
                    isAuthenticated = {this.props.isAuthenticated}
	            />
	            
	            <MenuToggle
		            isOpen = {this.state.menu}
		            onToggle = {this.toggleMenuHandler}
	            />
	            
                <main>
	                {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
		isAuthenticated: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout);