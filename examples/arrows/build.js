'use strict';

var path       = require('path')
  , fs         = require('fs')
  , browserify = require('browserify')
  , es6ify     = require('es6ify')
  ;

es6ify.traceurOverrides = { blockBinding: true };

browserify({ debug: true })
  .add(es6ify.runtime)
  .add(path.join(__dirname, 'arrows.js'), { entry: true })
  .transform(es6ify)
  .bundle()
  .pipe(fs.createWriteStream(path.join(__dirname, 'arrows.build.js')));
