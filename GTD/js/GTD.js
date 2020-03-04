$(function () {
    const $input = $('.tasks form input')
    const $deletInput = $('.tasks form i')
    const $ul = $('.tasks ul')
    // 监听键盘 摁下回车键触发事件
    load()
    $input.keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            // 获取本地存储
            let local = getData()
            // console.log($(this).val()); 
            local.push({ text: $(this).val(), status: $(this).attr('name') })
            //存储数据到本地
            saveData(local)
            // 重新获取本地数据
            load()
            $(this).val('')
        }
    })
    // 添加li删除事件
    $ul.on('click', 'i', function () {
        // 获取本地存储
        let data = getData()
        // 修改数据
        let index = $(this).attr('id')
        console.log(index);
        data.splice(index, 1)
        // 保存到本地存储
        saveData(data)
        // 重新加载数据
        load()
    })
    // 获取本地存储的数据
    function getData () {
        let data = localStorage.getItem('todolist')
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }
    // 存储本地数据
    function saveData (data) {
        localStorage.setItem('todolist', JSON.stringify(data))
    }
    // 渲染本地存储数据
    function load () {
        let data = getData()
        $ul.empty()
        $.each(data, function (i, n) {
            $ul.each(function () {
                // console.log($(this).attr('name'));
                if ($(this).attr('name') == n.status) {
                    $(this).append(`<li draggable='true'>${n.text} <i class='fa fa-times' id='${i}'></i></li>`)
                }
            })
        })
    }
    // 定义拖动事件
    var lis = document.getElementsByTagName('li')
    var uls = document.getElementsByTagName('ul')
    for (const li of lis) {
        li.addEventListener('dragstart', dragStart)
        li.addEventListener('dragend', dragEnd)
    }
    for (const ul of uls) {
        ul.addEventListener('dragover', dragOver)
        ul.addEventListener('dragenter', dragEnter)
        ul.addEventListener('dragleave', dragLeave)
        ul.addEventListener('drop', dragDrop)
    }
    let box = null
    function dragStart () {
        box = this
        setTimeout(() => {
            // this.style.display='none'
        })
    }
    function dragEnd () {
    }
    function dragOver (e) {
        // console.log('over');
        e.preventDefault()
    }
    function dragEnter (e) {
        // console.log('enter');
        e.preventDefault()
    }
    function dragLeave () {
        // console.log('leave');
    }
    function dragDrop (e) {
        // console.log('drop');
        e.preventDefault()
        this.append(box)
        let data = getData()
        let i = this.getElementsByTagName('i')[0]
        let index = i.getAttribute('id')
        console.log(index);
        // 拿到存储数据的id，把该条数据的status的状态改为drop后的状态
        data[index].status = this.getAttribute('name')
        // 保存到本地存储
        saveData(data)
        // 重新加载数据
        load()
        // console.log(box);
    }
    // 设置input 清空元素
   $('form i').click(function(){
    //    console.log('11');
    // console.log($(this).prev());
    $(this).prev().val('')
   })
});

