//var exec = require("child_process").exec;
//
//function execCmds(cmds) {
//	if (cmds.length == 0)
//		return;
//
//	exec(cmds[0], function(error, stdout, stderr) {
//		console.log(stdout);
//		execCmds(cmds.slice(1));
//	});
//}
//
//var cmds = ['echo 1', 'echo 2', 'echo 3'];
//execCmds(cmds);



// note: npm installed async to /usr/local/lib/node_modules, but looks like by default node doesn't search there for a library
// workaround: either add /usr/local/lib/node_modules/ to NODE_PATH evn variable or just require by absolute path
var async = require('async');
var exec = require("child_process").exec;

function execCmd(cmd, callback)
{
	exec(cmd, function(error, stdout, stderr) {
		console.log(stdout);
		callback();
	});
}

var cmds = ['echo 1', 'echo 2', 'echo 3'];
async.forEachSeries(cmds, execCmd);



//['room', 'moon', 'cow jumping over the moon'].
//forEach(function(name) {
//	process.on('exit', function() {
//		console.log('Goodnight, ' + name);
//	});
//});
