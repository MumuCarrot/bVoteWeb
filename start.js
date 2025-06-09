const { spawn } = require('child_process');

const server = spawn('npm', ['run', 'start:prod'], {
    cwd: './server',
    stdio: 'inherit',
    shell: true,
});

const client = spawn('npm', ['run', 'start'], {
    cwd: './ui',
    stdio: 'inherit',
    shell: true,
});
