let input = document.getElementsByTagName('input')
// console.log(input);
// 验证码数组
let IDcode = []

input[0].onkeydown = function (e) {
    if (e.keyCode == 13) {  //当键盘按下回车触发事件
        e.preventDefault() 
        // console.log(this.value);
        let test = IDcode.join("");  // 拿到验证码的数组，转为字符串
        // console.log(test);
        let txt = new RegExp(test, 'i') // 生成正则表达式忽略大小写
        // console.log(txt);
        // console.log(txt.test(this.value));
        // console.log(this.value == num );
        if(txt.test(this.value)){ //判断输入的值，正确清空输入的值并弹框提醒
            this.value = ''
            alert('验证码正确')
        }else{ // 重新获取验证码，并把内容情况 提醒重新输入验证码
            Code()
            this.value = ''
            alert('验证码输入错误')
        }    
    }
}

// console.log(IDcode);
Code() //页面开始的时候就要调用一次

function Code () {
    let canvas = document.getElementById('code')
    var ctx = canvas.getContext('2d')
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    for (let i = 0; i < 4; i++) {
        // 生成随机小写字母
        function getRandomLower () {
            return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        }
        // 生成随机大写字母
        function getRandomUpper () {
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        }
        //  生成随机数字
        function getRandomNumber () {
            return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
        }
        const getRandom = {
            0: getRandomLower(),
            1: getRandomUpper(),
            2: getRandomNumber()
        }
        let text = getRandom[Math.floor(Math.random() * 3)]
        // console.log(getRandom[Math.floor(Math.random * 3)]);
        IDcode[i] = text
        let x = 30 + i * 20 //文字在canvas上的x坐标
        let y = 25 + Math.random() * 8//文字在canvas上的y坐标
        ctx.font = "bold 23px 微软雅黑"
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        ctx.translate(x, y)
        ctx.rotate(deg)

        ctx.fillStyle = randomColor()
        ctx.fillText(text, 0, 0)

        ctx.rotate(-deg)
        ctx.translate(-x, -y)
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
        ctx.strokeStyle = randomColor();
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.width);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
        ctx.strokeStyle = randomColor();
        ctx.beginPath();
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();
    }
    function randomColor () {//得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
}


