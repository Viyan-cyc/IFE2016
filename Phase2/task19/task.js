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
	var clock;

	//定义队列的对象
	var queue={
		str:[],

		paint: function(){
			str="";
			travel(this.str,function(item){
				str+=("<div style=\'height:"+parseInt(item)*2+"px\'>"+parseInt(item)+"<\/div>")
				        // <div style="height:15px"></div>
			});
			container.innerHTML=str;
			addDivDelEvent();
		},

		isFull: function(){
			return (this.str.length>60);
		},

		leftPush: function(num){
			if(!this.isFull()){
				this.str.unshift(num);
				this.paint();
			}
			else{
				alert('Maximun length of the queue is 60');
			}
		},

		rightPush: function(num){
			if(!this.isFull()){
				this.str.push(num);
				this.paint();
			}
			else{
				alert('Maximun length of the queue is 60');
			}
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

	//生成随机数
	function randomLine(){
		for(var i=0;i<60;i++){
			queue.str[i]=Math.random()*90+10;
		}
		queue.paint();
	}

             //bubbleSort
             function BubbleSort(){
             	var clock;
             	var count=0,i=0;
             	console.log(queue.str.length)
             	clock=setInterval(function(){
             		if(count>=queue.str.length){
             			clearInterval(clock);
             		}
             		if(i==queue.str.length-1-count){//判断每一轮的结束
             			i=0;
             			count++;
             		}
             		if(queue.str[i]>queue.str[i+1]){
             			var temp=queue.str[i];
             			queue.str[i]=queue.str[i+1];
             			queue.str[i+1]=temp;
             			queue.paint();
             		}
             		i++;
             	},100);
             }

	//为四个按钮按顺序绑定相对应的函数
	//左侧入
	addEvent(inputList[1],'click',function(){
		var input=inputList[0].value;
		var reg=/^[0-9]+$/;
		if(reg.test(input)){
			if(parseInt(input)<10||parseInt(input)>100){
				alert("The interger you input must between 10 and 100");
			}
			else queue.leftPush(input);
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
			if(parseInt(input)<10||parseInt(input)>100){
				alert("The interger you input must between 10 and 100");
			}
			else queue.rightPush(input);
		}
		else{
			alert("Please enter an interger!")
		}
	});

	//左侧出
	addEvent(inputList[3],'click',function(){queue.leftPop()});
	//右侧出
	addEvent(inputList[4], "click", function(){queue.rightPop()});
	//排序
	addEvent(inputList[5],"click",function(){
		BubbleSort();
	})
	//生成随机数
	addEvent(inputList[6],"click",function(){
		randomLine();
	})
}