import React, {Component} from 'react';
import './QuizCreator.scss';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import {createControl, validate, validateFrom} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary';
import axios from '../../axios/axios-quiz';
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/AC/create";

function createOptionControl(number) {
    return createControl({
        label: `Вриант ${number}`,
        errorMessage: 'Заполните поле',
        id: number
    }, {required: true});
}

function createFormControls(){
    return {
        question: createControl({
            label: 'Укажите вопрос',
            errorMessage: 'Вопрос не может быть пустым, заполните поле.'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    addQuestionHandler = (event) => {
        event.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    createQuizHandler = (event) => {
        event.preventDefault();

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });

        this.props.finishCreateQuiz();
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateFrom(formControls)
        });
    };

    renderControls () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />

                    {index === 0 ? <hr/> : null}

                </Auxiliary>
            )
        });
    }

    selectChangeHandler = event => {
        console.log(event.target.value);
        this.setState({
            rightAnswerId: +event.target.value
        });
    };

    render() {
        return (
            <div className='QuizCreator'>
                <h1>Создание теста</h1>
                <form onSubmit = {this.submitHandler} className='QuizCreatorForm'>
                    {this.renderControls()}
                    <Select
                        label='Выбирите правильный ответ'
                        value={this.state.rightAnswerId}
                        onChange={this.selectChangeHandler}
                        options={[
                            {text: '1', value: 1},
                            {text: '2', value: 2},
                            {text: '3', value: 3},
                            {text: '4', value: 4}
                        ]}
                    />
                    <div className='QuizCreatorActions'>
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        quiz:  state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);