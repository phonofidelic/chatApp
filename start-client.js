const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'public_react', shell: true };
require('child_process').spawn('npm', args, opts);