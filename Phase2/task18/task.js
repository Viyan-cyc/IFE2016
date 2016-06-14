//事件绑定函数
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//遍历数组的方法，针对数组中每一个元素执行函数fn，并将数组索引和元素作为参数传递，以方便后面使用
function travel(arr,fn){
	for(var cur=0;cur<arr.length;cur++){
		fn(arr[cur],cur);
	}
}

window.onload=function(){
	var container=document.getElementById("container");
	var inputList=document.getElementsByTagName("input");
	//定义队列的对象
	var queue={
		str:[],

		paint: function(){
			str="";
			travel(this.str,function(item){str+='<div>'+parseInt(item)+'</div>'});
			container.innerHTML=str;
			addDivDelEvent();
		},

		leftPush: function(num){
			this.str.unshift(num);
			this.paint();
		},

		rightPush: function(num){
			this.str.push(num);
			this.paint();
		},

		isEmpty: function(){
			return (this.str.length==0);
		},

		leftPop: function(){
			if(!this.isEmpty()){
				alert(this.str.shift());
				this.paint();
			}
			else{
				alert("The queue is already empty!");
			}
		},

		rightPop: function(){
			if(!this.isEmpty()){
				alert(this.str.pop());
				this.paint();
			}
			else{
				alert("The queue is already empty!");
			}
		},

		deleteID: function(id){
			this.str.splice(id,1);
			this.paint();
		}
		
	}

	//为container中的每个数字（即每个div）绑定删除函数
	function addDivDelEvent(){
		for(var cur=0;cur<container.childNodes.length;cur++){
			//使用闭包
			addEvent(container.childNodes[cur],'click',function(cur){
				return function(){
					return queue.deleteID(cur);
				}
			}(cur));
		}
	}

	//为四个按钮按顺序绑定相对应的函数
	//左侧入
	addEvent(inputList[1],'click',function(){
		var input=inputList[0].value;
		var reg=/^[0-9]+$/;
		if(reg.test(input)){
			queue.leftPush(input);
		}
		else{
			alert("Please enter an interger!")
		}
	});

	//右侧入
	addEvent(inputList[2],'click',function(){
		var input=inputList[0].value;
		var reg=/^[0-9]+$/;
		if(reg.test(input)){
			queue.rightPush(input);
		}
		else{
			alert("Please enter an interger!")
		}
	});

	//左侧出
	addEvent(inputList[3],'click',function(){queue.leftPop()});
	//右侧出
	addEvent(inputList[4], "click", function(){queue.rightPop()});
}