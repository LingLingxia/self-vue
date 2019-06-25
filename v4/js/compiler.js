function Compiler(vm){
    this.vm = vm;
    this.el = document.querySelector(vm.el);
    if(!this.el){
        console.error('没有找到指定的根元素');
        return ;
    }
    this.compile(this.el.childNodes);
}

Compiler.prototype.compile = function(nodes){
    let child = [...nodes];
    child.forEach(node=>{//现在只考虑解析元素节点和文本节点
        if(node.nodeType === 1){//元素节点
            //编译指令
        let attrs = [...node.attributes];
        attrs.forEach(attribute=>{
            let name = attribute.name;
            if(name[0] === '@'){
              //这里的bind 需要绑定this
              node.addEventListener(name.slice(1),this.vm.methods[attribute.value].bind(this.vm),false);
              node.removeAttribute(name);
            }
            
        })

        }else if(node.nodeType ===3){//文本节点
            let text = node.textContent;
            let reg = /\{\{(.+?)\}\}/;
            let matches = reg.exec(text);
            let key = '';
            if(matches){
                key = matches[1];
            }

            if(key){
                new Watcher(this.vm,key,function(val){
                    node.textContent = val;
                });
                node.textContent = this.vm[key];
            }
        }

        if(node.childNodes&&node.childNodes.length){
            this.compile(node.childNodes);
        }
    })
}