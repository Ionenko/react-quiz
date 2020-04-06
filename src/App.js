import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import QuizList from './containers/QuizList';
import Auth from './containers/Auth';
import QuizCreator from './containers/QuizCreator';
import Quiz from './containers/Quiz';
import Logout from './components/Logout';

import Layout from './hoc/Layout';
import {connect} from "react-redux";
import {autoLogin} from "./store/AC/auth";

class App extends Component {

    componentDidMount(){
        this.props.autoLogin();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/" exact component={QuizList}/>
                <Redirect to={'/'}/>
            </Switch>
        );

        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={QuizList}/>
                    <Redirect to={'/'}/>
                </Switch>
            );
        }

        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo"/>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch){
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
