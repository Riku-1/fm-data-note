import React from 'react';
import ReactDOM from 'react-dom/client';

import { LoadHtmlFilePage } from './page/LoadHtmlFilePage';
import './index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {PlayersPage} from "./page/PlayersPage";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<LoadHtmlFilePage/>}/>
              <Route path="/load-file" element={<LoadHtmlFilePage/>}/>
              <Route path="/foo" element={<PlayersPage/>}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>
);
