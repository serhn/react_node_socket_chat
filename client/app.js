require("bootstrap-webpack");
//
//require("skeleton-css-webpack");
//require("foundation-sites-loader");

//require("!style!css!./style.css");
//import css from './less/style.less';
//require("!style!css!less!./less/style.less");
require("./less/style.less");
var jQuery = require("jquery");

import Hello from './chat.jsx';

//alert(NODE_ENV);
import Conf from  "../variables.js";
if(!PROD){
    alert(Conf.hostProdaction)
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js"></' + 'script>');
}else{
    if (window.location.hostname!=Conf.hostProdaction){
        window.location.href=Conf.protProdaction+'://'+Conf.hostProdaction+'/'
    }
}
  
//document.write(require("./content.js"));
//alert("tst");

