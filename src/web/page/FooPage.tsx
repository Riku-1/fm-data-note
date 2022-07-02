import React from "react";
import {Link} from "react-router-dom";

export const FooPage = () => {
     return (
         <div id="container">
              <div id="left-menu-panel">
                   <Link to="/foo">foo</Link>
              </div>

              <div id="main-content">
                   <div>foo</div>
              </div>
         </div>
     )
}
