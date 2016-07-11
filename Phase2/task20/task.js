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

//将输入的内容分割为数组
function parseInputToArray(text){
    var inputArray=[];
    //分隔符可以是逗号（全角半角均可），顿号，空格（全角半角均可），
    //分号（全角半角均可），回车、换行、Tab等符号
    inputArray=(text).split(/[,|，|、| |　|;|；|\r|\n|\t]/).filter(function(index) { //过滤掉可能包含的空字符串
        return index.length>0;
    });
    return inputArray;
}

   

window.onload=function(){
    var container=document.getElementById("container");
    var inputList=document.getElementsByTagName("input");

    //定义队列的对象
    var queue={
        str:[],

        paint: function(){
            str="";
            travel(this.str,function(item){
                str+=("<div>"+item+"</div>")
            });
            container.innerHTML=str;
            addDivDelEvent();
        },

        isFull: function(){
            return (this.str.length>60);
        },

        leftPush: function(arr){
            for(var cur in arr){
                this.str.unshift(arr[cur]);
            }
            this.paint();
        },

        rightPush: function(arr){
            for(var cur in arr){
                this.str.push(arr[cur]);
            }
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

 //查询内容
    function searchDivContent() {

        queue.paint();//!!!!!我的天，原先忘记加上这句话，bug一堆！！

        var keyword=document.getElementById("keyword").value;
        var spanList=document.getElementById("container").childNodes;
        
    for(var i=0;i<spanList.length;i++){
      // 使用replace方法
console.log(spanList[i].innerHTML);
      spanList[i].innerHTML = spanList[i].innerHTML.replace(new RegExp(keyword, "gi"), '<span class="r">'+keyword+'</span>');
    }
        
    }

       //为四个按钮按顺序绑定相对应的函数
    //左侧入
    addEvent(inputList[0],'click',function(){
        var input=parseInputToArray(document.getElementById("num").value);
        queue.leftPush(input);
    });
    //右侧入
    addEvent(inputList[1],'click',function(){
        var input=parseInputToArray(document.getElementById("num").value);
        queue.rightPush(input);
    });
    //左侧出
    addEvent(inputList[2], "click", function(){queue.leftPop()});
    //右侧出
    addEvent(inputList[3], "click", function(){queue.rightPop()});
    
        addEvent(inputList[5], "click", function() {
        searchDivContent();
    });
}