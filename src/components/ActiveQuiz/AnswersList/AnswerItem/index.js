import React from 'react';
import './AnswerItem.scss';

const AnswersItem = props => {
	console.log(props.state);
	let answerClasses = 'AnswerItem';
	
	if(props.state !== null && props.state !== "undefined") {
		answerClasses = 'AnswerItem ' + props.state;
	}
	return (
		<li
			className= {answerClasses}
		    onClick={() => props.onAnswerClick(props.answer.id)}
		>
			{ props.answer.text}
		</li>
	)
}

export default AnswersItem;