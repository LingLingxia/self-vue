function Vue(options){
    this.el = options.el;
    this.data = options.data;
    this.methods = options.methods;
    Object.keys(options.data).forEach(key=>{
        Object.defineProperty(this,key,{
            enumerable:true,
            configurable:true,
            set(val){
                options.data[key] = val;
            },
            get(){

                return options.data[key];
            }
        })
    })
    Observe(this.data);
   new Compiler(this);
}


