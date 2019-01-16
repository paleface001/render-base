const Buffer = require('./buffer');
const Shader = require('./shader');
const Program = require('./program');

window.EngineBase = {Buffer:Buffer.default,Shader:Shader.default,Program:Program.default};

module.exports = EngineBase;