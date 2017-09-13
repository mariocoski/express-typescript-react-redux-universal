import fs from 'fs';
import {basename, join} from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import configureStore from 'universal/store';
import createHistory from 'history/createMemoryHistory';
import Html from './Html.js';

function renderApp(url, res, store, assets) {
  const context = {};
  
  const html = renderToString(
    <Html
      title='ssr'
      store={store}
      url={url}
      context={context}
      assets={assets} />
  );

  res.send('<!DOCTYPE html>'+html);
}

export const renderPage = function (req, res) {
  const history = createHistory( );
  const store  = configureStore(history);

  const assets = require('../../build/assets.json');

  assets.manifest.text = fs.readFileSync(
    join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
    'utf-8'
  );

  renderApp(req.url, res, store, assets);
};

export const renderDevPage = function (req, res) {
  const history =  createHistory( );
  const store   = configureStore(history);
  renderApp(req.url, res, store);
};

export default renderPage;
