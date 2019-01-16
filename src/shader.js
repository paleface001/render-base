export default class Shader {
    constructor(gl,cfg){
        this.gl = gl;
        this.type = cfg.type;
        this.source = cfg.source;
        this._initialize();
    }

    _initialize(){
        this.shader = this.gl.createShader(this.type);
        this.gl.shaderSource(this.shader,this.source);
        this.gl.compileShader(this.shader);
        const success = this.gl.getShaderParameter(this.shader,gl.COMPILE_STATUS);
        if(!success){
            throw 'shader compile error';
        }
    }

    destory(){
        this.gl.deleteShader(this.shader);
    }

}