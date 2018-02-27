
$(document).ready(function(){

var servn;
$('.reesmee').click(function() {
    servn = document.getElementById('vala').value; 
    console.log(servn);
    document.getElementById('absucc').style = 'display:none';
    document.getElementById('abfail').style = 'display:none';
    getMin();
});

var info;
var info2;

var http2 = new XMLHttpRequest;
http2.open("GET", "https://pocket.minehut.com/servers/", true);
http2.send();
http2.onreadystatechange = function() {
    if(http2.readyState == 4 && http2.status == 200) {
        info2 = JSON.parse(http2.response);
        console.log(info2);
        document.getElementById('totpl').innerHTML = info2.total_players;
        document.getElementById('totse').innerHTML = info2.total_servers;
        document.getElementById('inpro').style = 'display:none';
        document.getElementById('plvisi').style = 'display:center';
};
};



function getMin(){
    var http = new XMLHttpRequest;

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log('stage 2');
            if(http.response == '{"server":null}') {
                document.getElementById('abfail').style = 'display:inline';
                return;
            };
            info = JSON.parse(http.response); 
            $('#motd').html(info.server.motd);
            $('#servername').html(info.server.name);
            $('#servertype').html(info.server.platform.toUpperCase());
            $('#cpd').html(info.server.credits_per_day);
            $('#wrldn').html(info.server.server_properties.level_name);
            $('#wtype').html(info.server.server_properties.level_type);
            $('#maxp').html(info.server.server_properties.max_players);
            var dabberino;
            if(info.server.visibility == true) {
                dabberino = 'Yes';
            } else {
                dabberino = 'No';
            };
            $('#visi').html(dabberino);
            document.getElementById('absucc').style = 'display:inline';
        }
    };
    var finlink = "https://pocket.minehut.com/server/";
    finlink += servn + '?byName=true';
    http.open("GET", finlink, true);
    http.send();
};
});