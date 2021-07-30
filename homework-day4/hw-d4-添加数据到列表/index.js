window.onload = function() {
    const saveBtn = document.getElementById('save-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const tbody = document.querySelector('tbody');

    let data = [];
    let storage = localStorage.getItem('info');
    if(storage != null) {
        data = JSON.parse(storage);
    }

    updateInfo(data);

    saveBtn.addEventListener('click', () => {
        if(name.value && age.value) {
            let obj = {};
            obj.name = name.value;
            name.value = '';
            obj.age = age.value;
            age.value = '';
            data.push(obj);
            localStorage.setItem('info', JSON.stringify(data));
            updateInfo(data);
        }
    })

    uploadBtn.addEventListener('click', () => {
        if(data.length) {
            document.write(JSON.stringify(data));
        }
    })

    function updateInfo(data) {
        tbody.innerHTML = '';

        for(let i = data.length - 1; i >= 0; i --) {
            let tr = document.createElement('tr');
            
            let ntd = document.createElement('td');
            ntd.textContent = data[i].name;
            
            let atd = document.createElement('td');
            atd.textContent = data[i].age;
            
            tr.append(ntd, atd);
            tbody.appendChild(tr);
        }
    }
}