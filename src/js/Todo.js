import checkMark from '../img/check-mark.svg';
import crossIcon from '../img/cross.svg';

export class Todo {
    constructor() {
        this.todoList = document.querySelector('.todo-container');
        // this.controllBlock = this.todoList.querySelector('.control-icons');
        // this.edit = this.controllBlock.querySelector('.todo-edit');
        // this.toDone = this.controllBlock.querySelector('.todo-done');
        // this.remove = this.controllBlock.querySelector('.todo-remove');
        this.letStartButton = this.todoList.querySelector('.description > .btn');
        this.TodoInput = this.todoList.querySelector('.todo-input > input');
        this.addTodoButton = this.todoList.querySelector('.todo-input > .btn');
        this.todoContent = this.todoList.querySelector('.to-dos');
        this.todoList = document.createElement('ul');
        this.todoContent.appendChild(this.todoList);

        this.letStartButton.addEventListener('click', this.focus.bind(this));
        this.addTodoButton.addEventListener('click', this.createTodo.bind(this, this.TodoInput));

        this.TodoInput.addEventListener('keydown', () => {
            if (event.keyCode !== 13) {
                return;
            }

            this.createTodo(event.target);

        });


    }

    focus() {
        this.TodoInput.focus();
    }


    createTodo(input) {

        let addedTodo = input.value;

        if (addedTodo.length > 0) {
            console.log(input.value);
            let control = `<span><small>edit</small><img src="${checkMark}"><img src="${crossIcon}"></span>`;
            let todoItem = `<li><p>${addedTodo}</p>${control}</li>`;

            this.todoList.insertAdjacentHTML('afterBegin', todoItem);
            console.log(this.todoList);
            input.value = '';
        }
    }


}