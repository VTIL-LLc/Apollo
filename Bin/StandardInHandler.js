"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardInHandler = void 0;
const LoggingUtility_1 = require("Assemblies/Util/LoggingUtility");
function StandardInHandler() {
    process.stdin.resume();
    process.on('SIGINT', () => {
        console.log('Got SIGINT. Will start shutdown procedure within 1 second.');
        setTimeout(() => {
            LoggingUtility_1.Logger.TryClearLogs();
            process.exit(0);
        }, 1000);
    });
    process.on('SIGUSR1', () => {
        console.log('Got SIGUSR1. Will start shutdown procedure within 1 second.');
        setTimeout(() => {
            return process.exit(0);
        }, 1000);
    });
    process.on('SIGUSR2', () => {
        console.log('Got SIGUSR2. Will clear LocalLog within 1 second.');
        setTimeout(() => { }, 1000);
    });
    process.on('SIGALRM', () => {
        console.log('Alarm clock');
        process.exit(0);
    });
    process.on('SIGHUP', () => {
        console.log('Hangup');
        process.exit(0);
    });
    process.on('SIGIO', () => {
        console.log('I/O possible');
        process.exit(0);
    });
    process.on('SIGPOLL', () => {
        console.log('I/O possible');
        process.exit(0);
    });
    process.on('SIGPROF', () => {
        console.log('Profiling timer expired');
        process.exit(0);
    });
    process.on('SIGVTALRM', () => {
        console.log('Virtual timer expired');
        process.exit(0);
    });
    process.on('SIGPWR', () => {
        console.log('Power failure');
        process.exit(0);
    });
    process.on('SIGSTKFLT', () => {
        console.log('Stack fault');
        process.exit(0);
    });
    process.on('SIGPIPE', () => {
        console.log('Got SIGPIPE. Ignoring.');
    });
    process.on('SIGTERM', () => {
        console.log('Got SIGTERM. Will start shutdown procedure within 1 second.');
        setTimeout(() => {
            LoggingUtility_1.Logger.TryClearLogs(true);
            process.exit(0);
        }, 1000);
    });
    process.on('uncaughtException', (ex) => {
        console.log('\n***\nPROCESS EXCEPTION\n***\n');
        console.log('REASON FOR EXCEPTION: %s', ex.stack || '');
        process.emit('SIGINT', 'SIGINT');
    });
    process.on('unhandledRejection', (reason) => {
        console.log('\n***\nPROCESS REJECTION\n***\n');
        console.log('REASON FOR REJECTION: %s', reason || '');
        process.emit('SIGINT', 'SIGINT');
    });
    if (process.stdin.setRawMode)
        process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (key) {
        if (key === '\u0003' || key === '\u001b') {
            return process.emit('SIGINT', 'SIGINT');
        }
    });
}
exports.StandardInHandler = StandardInHandler;
