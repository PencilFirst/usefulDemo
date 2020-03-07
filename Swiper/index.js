let items = document.getElementsByClassName('item')
let dots = document.getElementsByClassName('dot')
let swiper = document.getElementById('swiper_wrap')

let Pre = document.getElementById('Pre')
let Next = document.getElementById('Next')
let time = 3000
let index = 0
function Loop () {
    index == items.length - 1 ? index = 0 : index++
    index == 0 ? items[items.length - 1].classList.remove('active') : items[index - 1].classList.remove('active')
    index == 0 ? dots[dots.length - 1].classList.remove('active') : dots[index - 1].classList.remove('active')
    items[index].classList.add('active')
    dots[index].classList.add('active')
    console.log(index);
}
let loop
function goNext () {
    loop = setInterval(() => {
        Loop()
    }, time);
}
swiper.onmouseenter = function () {
    clearInterval(loop)
}
swiper.onmouseleave = function () {
    goNext()
}
Pre.onclick = function () {
    index == 0 ? index = items.length - 1 : index--
    index == items.length - 1 ? items[0].classList.remove('active') : items[index + 1].classList.remove('active')
    index == dots.length - 1 ? dots[0].classList.remove('active') : dots[index + 1].classList.remove('active')
    items[index].classList.add('active')
    dots[index].classList.add('active')
    console.log(index);
}
Next.onclick = function () {
    Loop()
}
goNext()