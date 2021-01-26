import Vue from 'vue'
import Vuex from 'vuex';
import {vuexLocal, myPluginWithSnapshot} from "./plugins";
// import modules  from "./modules";

const modulesFiles = require.context('./modules/', true, /\.js$/);
console.log("modulesFiles",modulesFiles)
let modules = {};
modulesFiles.keys().reduce((module, modulePath) => {
	
	if(!/\index.js$/.test(modulePath)) return;
	
	console.log("modulePath",modulePath);
	const moduleName = modulePath.replace(/^\.\/(.*)\/index\.\w+$/, '$1');
	console.log("moduleName",moduleName);
	const value = modulesFiles(modulePath)
	console.log("value",value);
	modules[moduleName] = value.default
	
}, {});

console.log("modules1",modules)
const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex)
const store = new Vuex.Store({
	namespaced:true,
	modules,
	plugins:debug ? [vuexLocal.plugin,myPluginWithSnapshot()] : [],
	strict:  debug
})
export default store