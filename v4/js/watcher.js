function Watcher(vm,exp,cb){//这里不做解析,假设只有一层
      this.vm = vm;
      this.exp = exp;
      this.cb = cb;
      window.target = this;
      this.val = this.vm[exp];
}

Watcher.prototype.update = function(val){
    if(val!=this.val){
        this.val = val;
        this.cb.call(this.vm,val);//要记得这里的this是vm的实例
    }
}