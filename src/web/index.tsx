import React from 'react';
import ReactDOM from 'react-dom/client';

import { LoadHtmlFilePage } from './page/LoadHtmlFilePage';
import './index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {FooPage} from "./page/FooPage";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<LoadHtmlFilePage/>}/>
              <Route path="/foo" element={<FooPage/>}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>
);
