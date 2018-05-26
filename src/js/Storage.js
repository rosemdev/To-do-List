export default  class Storage {
    constructor(key) {
        this.key = key;

        if (!localStorage.getItem(key)) { // initialize todolist if it does not exist
            localStorage.setItem(key, JSON.stringify([]));
        }
    }

    add(item) {
        let list = this.getAll();
        list.push(item);
        localStorage.setItem(this.key, JSON.stringify(list));
    }

    get(index) {
        return this.getAll()[index];
    }

    update (index, value) {
        let list = this.getAll();
        list[index] = Object.assign(list[index], value);
        localStorage.setItem(this.key, JSON.stringify(list));
    }

    updateProperty(index, propertyName, value) {
        let list = this.getAll();
        list[index][propertyName] = value;
        localStorage.setItem(this.key, JSON.stringify(list));
    }

    getAll() {
        return JSON.parse(localStorage.getItem(this.key));
    }

    remove(index) {
        let list = this.getAll();
        list.splice(index, 1);
        localStorage.setItem(this.key, JSON.stringify(list));
    }

    removeAll() {
        localStorage.removeItem(this.key);
    }
}
