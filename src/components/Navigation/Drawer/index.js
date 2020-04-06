import React, {Component} from 'react';
import './Drawer.scss'
import {NavLink} from 'react-router-dom';
import Backdrop from '../../UI/Backdrop';
import PropTypes from 'prop-types';

class Drawer extends Component {
    static propTypes = {
    };

    clickHandler = () => {
    	this.props.onClose();
	};
	
	renderLinks (links){
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink
						to={link.to}
						exact={link.exact}
						activeClassName={'active'}
						onClick={this.clickHandler}
					>{link.label}</NavLink>
				</li>
			)
		});
	}
    
    render(){
		const cls = ['Drawer'];

	    if(!this.props.isOpen){
			cls.push('close');
	    }

	    const links = [
            {to: '/', label: 'Список', exact: true}
        ];

	    if(this.props.isAuthenticated){
	    	links.push(
	    		{
					to: '/quiz-creator',
					label: 'Создать тест',
					exact: false
	    		},
                {
                    to: '/logout',
                    label: 'Выйти',
                    exact: false
                }
			)
		} else {
			links.push(
				{
					to: '/auth',
					label: 'Авторизация',
					exact: false
				}
			)
		}

        return(
	        <React.Fragment>
		        <nav className={cls.join(' ')}>
			        <ul>
				        {this.renderLinks(links)}
			        </ul>
		        </nav>
		        {this.props.isOpen ? <Backdrop onClick = {this.props.onClose}/> : null }
	        </React.Fragment>
        )
    }
}

export default Drawer;