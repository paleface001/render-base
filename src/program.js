export default class Program {
    constructor(gl,cfg){
        this.gl = gl;
        this.vertexShader = cfg.vertexShader;
        this.fragmentShader = cfg.fragmentShader;
        this._initialize();
    }

    _initialize(){
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program,this.vertexShader);
        this.gl.attachShader(this.program,this.fragmentShader);
        this.gl.linkProgram(this.program);
        const sucess = gl.getProgramParameter(this.program,gl.LINK_STATUS);
        if(!sucess){
            throw 'link shader failed';
        }
        this.gl.useProgram(this.program);
    }

    setAttribute(name, buffer, accessInfo){
        const location = this._getAttribLocation(name);
        this.gl.enableVertexAttribArray(location);
        buffer.bind();
        this.gl.vertexAttribPointer(location, accessInfo.size, accessInfo.type,accessInfo.normalize,accessInfo.stride,accessInfo.offset);
        buffer.unbind();
    }

    setUniform(name,type,value,length){
        if(length > 4){
            throw error;
          }
          const location = this._getUniformLocation(name);
          if(type === 'FLOAT'){
              this._setFloatUniform(location,value,length);
          }
          this._setIntUniform(location,value,length);
          this._setBooleanUniform(location,value,length);
    }

    draw(opts){
        if(opts.type && opts.type === 'indexed'){
            this.gl.drawElements(opts.drawMode, opts.count, opts.indexType, opts.offset);
        }else{
            this.gl.drawArrays(opts.drawMode,opts.offset,opts.count);
        }
    }

    destory(){
        this.gl.deleteProgram(this.program);
    }

    _getAttribLocation(name){
        return this.gl.getAttribLocation(this.program,name);
    }

    _getUniformLocation(name){
        return this.gl.getUniformLocation(this.program,name);
    }

    _setFloatUniform( location, value, length ){
        if(length == 1) this.gl.uniform1fv(location, value);
        if(length == 2) this.gl.uniform2fv(location, value);
        if(length == 3) this.gl.uniform3fv(location, value);
        if(length == 4) this.gl.uniform4fv(location, value);
    }

    _setIntUniform( location, value, length ){
        /*if(length == 1) this.gl.uniform1iv(location, value);
        if(length == 2) this.gl.uniform2iv(location, value);
        if(length == 3) this.gl.uniform3iv(location, value);
        if(length == 4) this.gl.uniform4iv(location, value);*/
    }

    _setBooleanUniform(){

    }

    _setTextureUniform(){

    }

}