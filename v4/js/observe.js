function Observe(obj){
    if(obj&&typeof obj==='object'){
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key]);
        })
    }
}


function defineReactive(obj,key,value){
     let val = value;
     let dep = new Dep();
     Object.defineProperty(obj,key,{
         enumerable:true,
         configurable:true,
         set(newVal){
            //调用依赖
            if(val!=newVal){
                dep.notify(newVal);
                val = newVal;
            }
         },
         get(){
             //添加依赖
             dep.add();
             return val;
         }
     })
}

function Dep(){
    this.sub = [];
}
Dep.prototype.add = function(){//添加一个watcher
       if(window.target){
           this.sub.push(window.target);
           window.target = undefined;
       }
}

Dep.prototype.notify = function(val){
    this.sub.forEach(watcher=>{
        watcher.update(val);
    })
}