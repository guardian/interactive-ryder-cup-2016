import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import mustache from 'mustache'

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();
    el.innerHTML = embedHTML;
    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata/1-SX-CrseCxwfXxkUv5OrSb4AZjukHdNKCoLqYsmQz0g.json',
        type: 'json',
        crossOrigin: true,
        success: (resp) => render(resp, el)
    });

};

function hide (resp, el) {
	switch(resp.intro.today) {
		case "Friday":
		
		var st = el.querySelector("#rc-saturday");
		st.style.display = "none";

		var sn = el.querySelector("#rc-sunday");
		sn.style.display = "none";

		break;

		case "Saturday":
		
		var fr = el.querySelector("#rc-friday");
		st.style.display = "none";

		var sn = el.querySelector("#rc-sunday");
		sn.style.display = "none";

		break;

		case "Sunday":

		var st = el.querySelector("#rc-saturday");
		st.style.display = "none";

		var fr = el.querySelector("#rc-friday");
		sn.style.display = "none";

		break;
	}
}

function show (resp, el) {

	var fr = el.querySelector("#rc-friday");
	fr.style.display = "block";

	var st = el.querySelector("#rc-saturday");
	st.style.display = "block";

	var sn = el.querySelector("#rc-sunday");
	sn.style.display = "block";

}

function render (resp, el) {

	resp.friday.forEach(
		(d) => {
			getWinner(d);
		}
	);

	resp.saturday.forEach(
		(d) => {
			getWinner(d);

		}
	);

	resp.sunday.forEach(
		(d) => {
			getWinner(d);
		}
	);

	var html = mustache.render(embedHTML, resp);
	el.innerHTML = html;

	hide(resp, el);

	var btn = el.querySelector(".js-schedule-button");

	btn.addEventListener('click', function(e) {
	    var target = e.target;
	    if (target.classList.contains("shown")) {
	        target.classList.add("hidden");
	        target.classList.remove("shown");
	        target.innerHTML = 'Hide full schedule';
	        show(resp, el);

	    } else {
	        target.classList.add("shown");
	        target.classList.remove("hidden");
	        target.innerHTML = 'Show full schedule';
	        hide(resp, el);
	    }
	});
	
}

function getWinner(d) {
	d.result = (d.result == "")?"TBD":d.result;
	d.players_us = (d.players_us == "")?"—":d.players_us;
	d.players_eu = (d.players_eu == "")?"—":d.players_eu;

	if (d.winner == "us") {
		d.us_result = "winner";
	} else if (d.winner == "eu") {
		d.eu_result = "winner";
	}
}