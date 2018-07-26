function changeUser() {
    find1 = document.getElementById('usern').value;
    document.getElementById('findpl').innerHTML = find1;
    document.getElementById('findpla').innerHTML = find1;
    var finalres = 'https://minotar.net/helm/' + find1; + '/800.png'
    var urlfind = 'url(' + finalres + ')';
    document.body.style.backgroundImage = urlfind;
    


};


$(document).ready(function(){
    find1 = 'Vocall';

    window.setInterval(function (){
        /// call your function here
        find1 = find1.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var expreg = new RegExp(find1, 'gi');
        var info;
        var info2;
        var http = new XMLHttpRequest;
        http.open("GET", "https://pocket.minehut.com/servers", true);
        http.send();
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                info = JSON.parse(http.response);
                var resp = http.response.search(expreg);
                if(resp < 0) {
                    document.getElementById('fillserv').innerHTML = find1 + ' is either offline, or in a lobby!'
                    //console.log(find1 + ' not found!');
                    return;
                };
                info2 = info.servers;

                for (var i=0; i < info2.length; i++) {
                    for (var ix=0; ix < info2[i].players.length; ix++) {
                        if (info2[i].players[ix] === null) {
                            continue;
                        }
                        if (info2[i].players[ix].toLowerCase() == find1.toLowerCase()) {
                            //console.log(find1 + ' is on ' + info2[i].name);
                            document.getElementById('fillserv').innerHTML = find1 + ' is on ' + info2[i].name;
                            return;
                        };
                    };
                };
                
                
            };
        };
}, 5000);
});