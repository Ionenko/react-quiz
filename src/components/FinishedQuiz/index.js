import React from 'react';
import './FinishedQuiz.scss';
import Button from '../UI/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if(props.results[key] === 'success'){
			total++
		}
		return total
	},0);
	
	return (
		<div className="FinishedQuiz">
			<ul>
				{props.quiz.map((quizItem, index) => {
					const cls = [
						'fa',
						props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
						props.results[quizItem.id]
					];
					return (
						<li key = {index}>
							<div className="FinishedQuizText">
								<p>
									<strong>{index + 1}. </strong> &nbsp;
									{quizItem.question}
								</p>
							</div>
							<div className="FinishedQuizIcon">
								<i className={cls.join(' ')}/>
							</div>
						</li>
					);
				})}
				
				
			</ul>
			<div>
				<p>Правильных ответов {successCount} из {props.quiz.length}</p>
			</div>
			<div className="FinishedQuizActions">
				<Button onClick={props.onRetry} type="primary">Повторить</Button>
				<Link to='/'>
                    <Button type="success">Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	);
}

export default FinishedQuiz;