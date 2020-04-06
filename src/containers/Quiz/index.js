import React, {Component} from 'react';
import './Quiz.scss'
import PropTypes from 'prop-types';
import ActiveQuiz  from '../../components/ActiveQuiz';
import FinishedQuiz  from '../../components/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from "../../components/UI/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/AC/quiz';

class Quiz extends Component {
    static propTypes = {
    };

	componentDidMount() {
		console.log(this.props);
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount(){
		this.props.retryQuiz();
	}
    
    render(){
	    
        return(
            <div className="Quiz">
                <h1>Ответьте на все вопросы</h1>
	            
	            <div className="QuizWrapper">
					{
						this.props.loading || !this.props.quiz
							? <Loader/>
							: this.props.isFinished ?
								<FinishedQuiz
									results = {this.props.results}
									quiz = {this.props.quiz}
									onRetry = {this.props.retryQuiz}
								/> :
								<ActiveQuiz
									question = {this.props.quiz[this.props.activeQuestion].question}
									answers = {this.props.quiz[this.props.activeQuestion].answers}
									onAnswerClick = {this.props.quizAnswerClick}
									quizLength = {this.props.quiz.length}
									answerNumber = {this.props.activeQuestion + 1}
									state = {this.props.answerState}
								/>
					}
	            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion:state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
	}
}

function mapDispatchToProps(dispatch){
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);