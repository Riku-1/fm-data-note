import React from 'react';
import ReactDOM from 'react-dom/client';

import { LoadHtmlFilePage } from './page/LoadHtmlFilePage';
import './index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {PlayersPage} from "./page/PlayersPage";
import {ClubPage} from "./page/ClubPage";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<LoadHtmlFilePage/>}/>
              <Route path="/load-file" element={<LoadHtmlFilePage/>}/>
              <Route path="/player" element={<PlayersPage/>}/>
              <Route path="/club" element={<ClubPage/>}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>
);
