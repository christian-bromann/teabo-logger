LAO logger module
=================

This is an example module for the _[lao] - look ahead online_ project. It describes the best way to create a new module. 
This is only a recommendation for a possible implementation. You don't have to follow the structure exactly.

What it does
------------
This module listen to all events on client- and serverside. Each event dispatcher object or WebSocket stream is registered
and will be listed on the right side of the screen.

You can get all events on

    http://localhost:3000/lao-logger/list

or view an specific event by ID on

    http://localhost:3000/lao-logger/show/[event-id]

module structure:
-----------------

    yourmodulename/
       |-- module.js
       |-- rest.js
       |-- comet.js
       |-- public/
       |    |-- css/
       |    |    +-- main.css
       |    |-- images/
       |    |    +-- some-images.gif
       |    |-- js/
       |    |    |-- controller.js
       |    |    +-- views/
       |    |    |    +-- your-view.js
       |    +-- templates
       |    |    +-- template.html

 
Everythink in the public directory gets reachable for the client in the following scheme:

    <domain>/<modulename>/css/
    <domain>/<modulename>/images/
    <domain>/<modulename>/js/
    <domain>/<modulename>/images/
    ...
    for this exampel module:
    http://localhost:3000/lao-logger/css/main.css

how to install
--------------

This module is designed for lao (v.0.2beta). You have to download and install it first. Visit the GitHub Repository and get
the zip of the current version of the backend-migration branch.

[LookAheadOnline on GitHub](https://github.com/Softwareprojekt-BHT-Berlin/lao-Online-Collaboration-Platform)

If the lao application starts successfully you can install this module. For that, go to the module directory and clone this
repository.

    $ cd /path/to/lao/modules
    $ git clone git://github.com/christian-bromann/lao-logger.git

Restart the node app and you're done!