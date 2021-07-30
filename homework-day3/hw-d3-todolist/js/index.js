document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-btn');
    const todoInput = document.getElementById('todo-input');
    const undoneList = document.getElementById('undone-list');
    const doneList = document.getElementById('done-list');
    
    let data = {
        dones: [],
        undones: []
    }

    let storage = localStorage.getItem('todolist');
    if(storage != null) {
        data = JSON.parse(storage);
        updateList(data);
    }



    addBtn.addEventListener('click', function() {
        if(todoInput.value) {
            data.undones.push(todoInput.value);
            todoInput.value = '';
            updateList(data);
        }
    })

    undoneList.addEventListener('click', function(e) {
        let target = e.target;

        if(target.tagName == 'INPUT') {
            console.log(data);
            let val = data.undones.splice(+target.dataset.index, 1)[0];
            data.dones.push(val);
            updateList(data);
        } else if(target.tagName == 'IMG') {
            if(confirm('是否删除？')) {
                data.undones.splice(+target.dataset.index, 1);
                updateList(data);
            }
        }
    })

    doneList.addEventListener('click', function(e) {
        let target = e.target;

        if(target.tagName == 'INPUT') {
            let val = data.dones.splice(+target.dataset.index, 1)[0];
            data.undones.push(val);
            updateList(data);
        } else if(target.tagName == 'IMG') {
            if(confirm('是否删除？')) {
                data.dones.splice(+target.dataset.index, 1);
                updateList(data);
            }
        }
    })

    function updateList(data) {
        undoneList.innerHTML = '';
        doneList.innerHTML = '';

        for(let i = 0; i < data.undones.length; i ++) {
            const li = document.createElement('li');
            li.className = 'undone-item';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.dataset.index = i;

            const span = document.createElement('span');
            span.className = 'item-text';
            span.textContent = data.undones[i];
            const img = document.createElement('img');
            img.src = './img/delete.png';
            img.className = 'delete-btn';
            img.dataset.index = i;

            li.append(input, span, img);

            undoneList.appendChild(li);
        }

        for(let i = 0; i < data.dones.length; i ++) {
            const li = document.createElement('li');
            li.className = 'done-item';

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = true;
            input.dataset.index = i;

            const span = document.createElement('span');
            span.className = 'item-text';
            span.textContent = data.dones[i];
            const img = document.createElement('img');
            img.src = './img/delete.png';
            img.className = 'delete-btn';
            img.dataset.index = i;

            li.append(input, span, img);

            doneList.appendChild(li);
        }

        localStorage.setItem('todolist', JSON.stringify(data));
    }
})