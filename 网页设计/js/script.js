var li = document.querySelector('.tab_list').querySelectorAll('li');
for(var i = 1; i<li.length;i++){
	li[i].onmouseover = function(){
				this.className = 'current';
	}
	li[i].onmouseout = function(){
		this.className = '';
    }
}

var imgall = document.querySelector('#imgall');
var img = document.querySelector('#imgall').querySelectorAll('img');
imgall.style.width = 210 * img.length + "px";


function getStyle(obj, yang_name) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[yang_name];
	} else {
		return obj.currentStyle[yang_name];
	}
}

 function img_move(obj, speed, weiZhi, fangXiang, huiDiao) {
    clearInterval(obj.timer);
	var oldWeizhi = parseInt(getStyle(obj, fangXiang));      
	if (oldWeizhi > weiZhi) {
		speed = -speed;
	}
	obj.timer = setInterval(function() {
	    var oldValue = parseInt(getStyle(obj, fangXiang));
	    var newValue = oldValue + speed;
		if ((speed < 0 && newValue < weiZhi) || (speed > 0 && newValue > weiZhi)) {
				newValue = weiZhi;
		}
			obj.style[fangXiang] = newValue + "px";
			if (newValue == weiZhi) {
				clearInterval(obj.timer);
				huiDiao && huiDiao();
			}
		}, 30)
}

var first = 0;
function setA() {
		if(first >= img.length - 4){
			first = 0;
			imgall.style.left = 0;
		}
}

img_move(imgall, 10, -210 * first, "left", function() {
	startimg();
	setA();
	var lun = document.querySelector('#lun-start');
	lun.addEventListener('mouseover',function(){
		clearInterval(setTime);	
	})
	lun.addEventListener('mouseout',function(){
		clearInterval(setTime);
		startimg();
		setA();
	})
})

var setTime;
function startimg(){
    setTime = setInterval(function(){
        first++;
        first %= img.length;
        img_move(imgall , 20 , -210*first , "left" , function(){
            setA();
        })
    },1000)
}
        