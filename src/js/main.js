import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import {Map} from './lib/map'
import geo from './data/us.json!text'
import data from './data/unemployment.tsv!text'

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

export function init(el, context, config, mediator) {
    // el.innerHTML = mainHTML;

    // var div = el.querySelector('#map');

    // var m = new Map(960, 500, div, geo, data);
    // m.join("id");
    // m.column("rate");
    // m.init();
}
