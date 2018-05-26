import Storage from './Storage'
import checkMark from '../img/check-mark.svg';
import crossIcon from '../img/cross.svg';


function getElementIndex(element) {
    let index = 0,
        iterator = element;

    while (iterator.previousElementSibling) {
        iterator = iterator.previousElementSibling;
        ++index;
    }

    return index;
}


export class Todo {
    constructor() {
        this.todoList = document.querySelector('.todo-container');
        this.letStartButton = this.todoList.querySelector('.description > .btn');
        this.TodoInput = this.todoList.querySelector('.todo-input > input');
        this.addTodoButton = this.todoList.querySelector('.todo-input > .btn');
        this.todoContent = this.todoList.querySelector('.to-dos');
        this.doneState = false;

        this.todoList = document.createElement('ul');
        this.todoContent.appendChild(this.todoList);

        this.totalTodos = document.createElement('p');
        this.todoList.parentElement.appendChild(this.totalTodos);

        this.letStartButton.addEventListener('click', () => this.TodoInput.focus());
        this.addTodoButton.addEventListener('click', () => {
            this._createTodoFromInput(this.TodoInput);
        });
        this.TodoInput.addEventListener('keydown', () => {
            if (event.keyCode === 13) { // esc key entered
                this._createTodoFromInput(event.target);
            }
        });

        this.storage = new Storage('todolist');
        this.showTodoList();

        this.todoList.addEventListener('click', () => {
            let target = event.target,
                doneIcon = target.closest('img.todo-done'),
                removeIcon = target.closest('img.todo-remove'),
                editIcon = target.closest('.todo-edit'),
                li = target.closest('.todo-item');

            if (doneIcon) {
                li.querySelector('.todo').classList.toggle('done');

                this.doneState = li.querySelector('.todo').classList.contains('done');
                this.storage.update(li.parentElement.children.length - 1 - getElementIndex(li), {doneState: this.doneState});

            } else if (removeIcon) {
                this.storage.remove(li.parentElement.children.length - 1 - getElementIndex(li));
                li.remove();
                this.todoCount();

            } else if (editIcon) {
                this.edit(li);
            }


        });
    }

    _createTodoFromInput(input) {
        const todo = {text: input.value, doneState: this.doneState};
        input.value = ''; // clear input
        this.createTodo(todo);
        this.storage.add(todo); // save to storage
    }

    createTodo(todo) {
        let todoItem =
            `<li class="todo-item">
    <p class="todo${todo.doneState ? ' done' : ''}">${todo.text}</p>
    <span class="control-block">
        <small class="todo-edit">edit</small>
        <img class="todo-done" src="${checkMark}">
        <img class="todo-remove" src="${crossIcon}">
    </span>
</li>`;

        this.todoList.insertAdjacentHTML('afterBegin', todoItem);
        this.todoCount();
    }

    todoCount() {
        this.totalTodos.innerHTML = `Total: <span>${this.todoList.children.length}</span>`;

    }

    showTodoList() {
        this.storage.getAll().forEach(todo => {
            this.createTodo(todo);
        });
    }

    edit(li) {
        li.querySelector('.control-block').style.pointerEvents = 'none';
        let editInput = document.createElement("input");
        editInput.classList.add('editor');
        let todoTextElement = li.querySelector('.todo');
        editInput.value = todoTextElement.textContent;
        todoTextElement.textContent = '';
        todoTextElement.prepend(editInput);
        editInput.focus();

        let okButton = document.createElement('a');
        okButton.classList.add('btn');
        okButton.textContent = 'Ok';
        okButton.style.textDecoration = '';
        editInput.after(okButton);

        let newTodo = editInput;

        okButton.addEventListener('click', () => {

            if (newTodo.value.length > 0) {
                todoTextElement.textContent = newTodo.value;
                editInput.replaceWith(todoTextElement);
                this.storage.update(li.parentElement.children.length - 1 - getElementIndex(li), {text: newTodo.value});
            } else {
                let message = document.createElement('span');
                message.textContent = 'Please, input todo, or delete that after submit.'
                newTodo.after(message);
            }

            li.querySelector('.control-block').style.pointerEvents = ''
        });

    }

}
