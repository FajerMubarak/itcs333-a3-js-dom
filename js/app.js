document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    function updateCounter() {
        if (!counter || !todoList) return;
        const items = todoList.querySelectorAll('li');
        let activeCount = 0;

        items.forEach(item => {
            if (!item.classList.contains('completed')) {
                activeCount++;
            }
        });

        counter.textContent = activeCount +' item(s) left';
    }

    function applyFilter() {
        if (!todoList) return;
        const items = todoList.querySelectorAll('li');

        items.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            if (currentFilter === 'all') {
                item.style.display = '';
            } else if (currentFilter === 'active') {
                item.style.display = isCompleted ? 'none' : '';
            } else if (currentFilter === 'done') {
                item.style.display = isCompleted ? '' : 'none';
            }
        });
    }

    function addTodo(e) {
        e.preventDefault();

        const text = input.value.trim();

        if (text === "") {
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');

        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        input.value = "";
        updateCounter();
        applyFilter();
    }

    
    todoForm.addEventListener('submit', addTodo);

  
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;

        if (target.classList.contains('delete-btn')) {
            li.remove();
            updateCounter();
            return;
        }
        
        li.classList.toggle('completed');
        updateCounter();
        applyFilter();
    });
    


    filterAll.addEventListener('click', () => {
        currentFilter = 'all';
        applyFilter();
    });
  
    filterActive.addEventListener('click', () => {
        currentFilter = 'active';
        applyFilter();
    });

    filterDone.addEventListener('click', () => {
        currentFilter = 'done';
        applyFilter();
    });
    
    updateCounter();
});
