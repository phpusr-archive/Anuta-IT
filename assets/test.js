/**
 * Created by phpusr on 14.03.17.
 * 
 */
"use strict";

const data = [
    {
        question: 'Что относится к логическим общенаучным методам?',
        answers: [
            { text: 'Анализ' }, { text: 'Синтез' }, { text: 'Дедукция, индукция', right: true }, { text: 'Все' }
        ]
    },
    {
        question: 'К функциям ТГП относятся?',
        answers: [
            { text: 'Онтологическая' }, { text: 'Эвристическая' }, { text: 'Гносиологическая' }, { text: 'Все перечисленные', right: true }
        ]
    },
    {
        question: 'Всеобщие методы это?',
        answers: [
            { text: 'Методы, которые распространяются на все без исключения конкретные науки и на все этапы или стадии процесса познания', right: true },
            { text: 'Методы, которые выражаются самой ТГП и другими юридическими науками и используются только в пределах этих наук' },
            { text: 'Реализуются в рамках отдельных специальных наук и широко используются для изучения государства и права' },
            { text: 'Нет правильно ответа' }
        ]
    },
    {
        question: 'Назовите теорию в основе которой лежит, что государство - это одна большая семья состоящая из малых семей?',
        answers: [
            { text: 'Договорная' }, { text: 'Патриархальная', right: true }, { text: 'Патримониальная' }, { text: 'Психологическая' }
        ]
    },
    {
        question: 'Из перечисленных выберите правильные формы мононорм?',
        answers: [
            { text: 'Мифы, сказания, предания' }, { text: 'Обычаи, традиции' }, { text: 'Ритуалы, обряды' }, { text: 'Все перечисленные', right: true }
        ]
    },
    {
        question: 'Формы социальных норм в первобытном обществе?',
        answers: [
            { text: 'Имели письменную форму' }, { text: 'Не имели письменной формы', right: true }, { text: 'Региулировались законами' }, { text: 'Регулировались обычаями', right: true }
        ]
    },
    {
        question: 'Автор договорной теории?',
        answers: [
            { text: 'Г. Спенсер' }, { text: 'Т. Гоббс', right: true }, { text: 'З. Фрейд' }, { text: 'Филмер' }
        ]
    },
    {
        question: 'Суть инцестной теории заключается в том, что?',
        answers: [
            { text: 'Государство и земля частная собственность правителя' },
            { text: 'Государство возникло путем насилия одних государств над другими' },
            { text: 'Запрет кровнородственного смешения близких родственников', right: true },
            { text: 'Государство возникает подобно биологическому организму' }
        ]
    },
    {
        question: 'Выберите формы возникновения государства?',
        answers: [
            { text: 'Американская' }, { text: 'Афинская', right: true }, { text: 'Китайская' }, { text: 'Азиатская', right: true }
        ]
    },
    {
        question: 'ТГП - это наука?',
        answers: [
            { text: 'Прикладная' }, { text: 'Отраслевая' }, { text: 'Фундаментальная', right: true }, { text: 'Техническая' }
        ]
    },
    /*{
        question: '?',
        answers: [
            { text: '' }, { text: '' }, { text: '' }, { text: '' }
        ]
    },*/
];
const checkButton = document.getElementById('checkButton');

function init() {
    data.forEach(q => q.answers.forEach(a => delete a.select));
    checkButton.style.display = 'inline-block';
    checkButton.onclick = check;
    document.getElementById('resetButton').onclick = init;
    test();
}
init();

function test(checkMode) {
    let rightCount = 0;
    const dataBlock = document.getElementById('data');
    const resultBlock = document.getElementById('result');
    clearBlock(dataBlock);
	clearBlock(resultBlock);
    const questionsBlock = document.createElement('ol');

    data.forEach((question, qIndex) => {
        const right = question.answers.filter(it => it.right != it.select).length == 0;
        if (right) rightCount++;
        const rightText = right ? 'Правильно' : 'Не правильно';

        const questionBlock = document.createElement('li');
        if (checkMode) questionBlock.className = right ? 'bg-success' : 'bg-danger';
        const questionTextBlock = document.createElement('div');
        questionTextBlock.appendChild(document.createTextNode(question.question));
        if (checkMode) questionTextBlock.appendChild(document.createTextNode(` (${rightText})`));
        questionBlock.appendChild(questionTextBlock);

        const isRadio = question.answers.filter(it => it.right).length == 1;
        const answersBlock = document.createElement('ul');
        question.answers.forEach((answer, aIndex) => {
            const answerBlock = document.createElement('li');
            const input = document.createElement('input');
            input.setAttribute('type', isRadio ? 'radio' : 'checkbox');
            input.setAttribute('name', `q-${qIndex}`);
			if (checkMode && answer.select) input.setAttribute('checked', true);
            input.onclick = click.bind(this, qIndex, aIndex);
            answerBlock.appendChild(input);
            answerBlock.appendChild(document.createTextNode(answer.text));
            if (checkMode && answer.right) answerBlock.appendChild(document.createTextNode(' (Правильный)'));
            answersBlock.appendChild(answerBlock);
        });
        questionBlock.appendChild(answersBlock);

        questionsBlock.appendChild(questionBlock);
    });

    dataBlock.appendChild(questionsBlock);
    
	// Вывод результатов
	if (checkMode) resultBlock.appendChild(document.createTextNode(`Вы ответили правильно на ${rightCount} из ${data.length} вопросов.`));
}

function clearBlock(block) {
    while (block.hasChildNodes()) {
        block.removeChild(block.lastChild);
    }
}

function click(qIndex, aIndex) {
    console.log('click', qIndex, aIndex);
    data[qIndex].answers[aIndex].select = true;
}

function check() {
    test(true);
    checkButton.style.display = 'none';
}
