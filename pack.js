'use strict';
var packager = require('electron-packager');
var options = {
    'arch': 'ia32',
    'platform': 'win32',
    'dir': './',
    'app-copyright': 'Quvondiqov Allayor | 2020',
    'app-version': '2.1.6',
    'asar': true,
    'name': 'WebLive',
    'icon':'./favicon.ico',
    'out': './releases',
    'overwrite': true,
    'prune': true,
    'version': '1.3.4',
    'version-string': {
        'CompanyName': 'Quvondiqov Allayor | JDPI 2020',
        'FileDescription': 'WEB LIVE', /*This is what display windows on task manager, shortcut and process*/
        'OriginalFilename': 'WebLive',
        'ProductName': 'WebLive',
        'InternalName': 'WebLive'
    },
};
packager(options, function done_callback(err, appPaths) {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});