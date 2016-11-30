window.addEventListener('load', function () {

    var input = document.getElementsByName('task')[0],
        ul = document.getElementById('todo'),
        popup = document.getElementById('popup'),
        arrayTasks,
        editButton = document.createElement('button'),
        removeButton = document.createElement('button');

    editButton.className = 'edit';
    removeButton.className = 'remove';

    view();

    document
        .getElementById('add')
        .addEventListener('click', function (event) {
        if (localStorage.getItem('items')){
            arrayTasks = JSON.parse(localStorage.getItem('items'));
        } else {
            arrayTasks = [];
        }
            if (input.value) {
                arrayTasks.push(input.value);
                input.value = '';
                localStorage.setItem('items', JSON.stringify(arrayTasks));
                render();
            } else {
                alert('you do not write');
            }
    });

    function view() {
        var array = JSON.parse(localStorage.getItem('items')) || [];
        console.log(array);
        for (var i = 0; i < array.length; i++) {
            var li = document.createElement('li');
            li.innerText = array[i];
            var editBtn = editButton.cloneNode();
            var removeBtn = removeButton.cloneNode();
            editBtn.addEventListener('click', editHandler);
            removeBtn.addEventListener('click', removeHandler);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);
            li.onclick = select;
            ul.appendChild(li);
            recount();
        }
    }

    function render() {
        var array = JSON.parse(localStorage.getItem('items'));

        var li = document.createElement('li');
        li.innerText = array[array.length-1];
        var editBtn = editButton.cloneNode();
        var removeBtn = removeButton.cloneNode();
        editBtn.addEventListener('click', editHandler);
        removeBtn.addEventListener('click', removeHandler);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        li.onclick = select;
        ul.appendChild(li);
        recount();
    }

    function editHandler(event) {
        var array = JSON.parse(localStorage.getItem('items'));
        console.log(array);
        this.classList.add('checked');
        popup.style.display = 'block';
        var inputEdit = document.getElementById('edit-input');
        inputEdit.value = this.parentElement.innerText;

        document.getElementById('save').addEventListener('click',function (event) {
            var btnEdit = document.querySelector('button.edit.checked');
            if (btnEdit) {
                var a = btnEdit.parentElement.firstChild.nodeValue;
                btnEdit.parentElement.firstChild.nodeValue = inputEdit.value;
                btnEdit.classList.remove('checked');
                popup.style.display = 'none';
            }
            for (var i=0; i<array.length;i++){
                if (array[i] === a){
                    array[i] = inputEdit.value;
                }
            }
            console.log(array);
            localStorage.setItem('items', JSON.stringify(array));
        });

        document.getElementById('cancel').addEventListener('click',function (event) {
            popup.style.display = 'none';
        });
    }

    function removeHandler() {
        var array = JSON.parse(localStorage.getItem('items'));
        var index;
        console.log(this.parentElement.innerText)
        for (var i = 0; i < array.length; i++) {
            if (array[i] === this.parentElement.innerText) {
                index = i;
                this.parentElement.remove();
            }
        }
        array.splice(index,1);

        localStorage.setItem('items', JSON.stringify(array));
        recount();
    }

    function select(event) {
        if (event.target.tagName == 'LI') {
            console.log(event);
            var el = event.toElement;
            el.classList.toggle('checked');
            if (el.classList.contains('checked')) {
                recount();
            } else {
                recount();
            }
        }
    }

    function recount() {
        var totalCount = document.querySelectorAll('li').length;
        var doneCount = document.querySelectorAll('li.checked').length;
        var count = totalCount - doneCount;
        document.getElementById('items-count').innerHTML = count + ' items to do / ' + doneCount + ' items done';
    }

})
