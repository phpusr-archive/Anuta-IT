/**
 * Created by phpusr on 14.03.17.
 * 
 */
"use strict";

const data = [
    {
        question: 'Что относится к логическим общенаучным методам?',
        answers: [
            { text: 'Анализ' },
            { text: 'Синтез' },
            { text: 'Дедукция, индукция', right: true },
            { text: 'Все' }
        ]
    },
    {
        question: 'К функциям ТГП относятся?',
        answers: [
            { text: 'Онтологическая' },
            { text: 'Эвристическая' },
            { text: 'Гносиологическая' },
            { text: 'Все перечисленные', right: true }
        ]
    }
];

function init() {
    document.getElementById('checkButton').onclick = check;
    test();
}
init();

function test(checkMode) {
    let rightCount = 0;
    const dataBlock = document.getElementById('data');
    clearBlock(dataBlock);
    const questionsBlock = document.createElement('ol');

    data.forEach((question, qIndex) => {
        const right = question.answers.filter(it => it.right != it.select).length == 0;
        if (right) rightCount++;
        const rightText = right ? 'Правильно' : 'Не правильно';

        const questionBlock = document.createElement('li');
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
    //TODO вывести рузультат
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
}
