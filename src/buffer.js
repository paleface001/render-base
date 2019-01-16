export default class Buffer {
    constructor(gl,cfg){
        this.gl = gl;
        this.target = cfg.target;
        this.usage = cfg.usage;
        this.dataSetted = false;
        this._initialize(cfg);
    }

    _initialize(cfg){
        this.buffer = this.gl.createBuffer();
        if(cfg.data){
            this._setData(cfg.data);
        }
    }

    _setData(data,offset){
        this.bind();
        if(offset){
            this.gl.bufferSubData(this.target, offset, data);
          }else{
            this.gl.bufferData(this.target, data, this.usage);
            this.dataSetted = true;
          }
          this.unbind();
    }

    setData(opts){
        if(opts.target) this.target = opts.target;
        if(opts.usage) this.usage = opts.usage;
        this._setData(opts.data);
    }

    setSubData(data,offset){
        if(this.dataSetted){
            this._setData(data,offset);
        }
    }

    bind(){
        this.gl.bindBuffer(this.target,this.buffer);
    }

    unbind(){
        this.gl.bindBuffer(this.target, null);
    }

    destory(){
        this.gl.deleteBuffer(this.buffer);
    }

}