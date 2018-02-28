$(document).ready(function(){
    var txt1;
    var txta = [];
    var txtb = [];
    var http = new XMLHttpRequest;
    http.open("GET", "https://pocket.minehut.com/servers/", true);
    http.send();
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var info = JSON.parse(http.response);
            //console.log(info);
            var xcount = 1;
            var reprow = 1;
            /*var testa = [
                {
                    test: 3
                },
                {
                    test:4
                }
            ];
            console.log(testa[0].test);*/
            for(var yc = 0; yc < info.servers.length; yc++) {
                txta = {
                    nowp: info.servers[yc].playerCount,
                    maxp: info.servers[yc].maxPlayers,
                    sname: info.servers[yc].name,
                    players: info.servers[yc].players

                };
                txtb.push(txta);
            };

            txtb.sort(function(a, b){
                return a.nowp-b.nowp
            })
            txtb.reverse();
            console.log(txtb);
            for(var y = 0; y < info.servers.length; y++) {
                var newstr = txtb[y].players.join(", ");
                console.log(newstr);
                if(reprow==1) {
                    txtb[y]['shtm'] = '<div class="row"><div class="col s12 m2 offset-m1"><div class="card" style="width: 100%;"><div class="card-content black-text"><span class="card-title">' + txtb[y].sname + '</span><div id="myProgress"><div id="myBar" style="width:' + Math.ceil((100 * (txtb[y].nowp))/ txtb[y].maxp) + '%;"></div></div><p style="font-weight: 5;">' + txtb[y].nowp + '/' + txtb[y].maxp + ' online. </p></div><div class="card-action"><a href="#modal' + xcount + '" class="modal-trigger">More Info</a></div></div></div><div id="modal' + xcount + '" class="modal modal-fixed-footer"><div class="modal-content"><h4>Server Info</h4><br><p>Players online:</p><br><p>' + newstr + '</p></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Close</a></div></div><span class="trans"></span>';
                } else if(reprow==2) {
                    txtb[y]['shtm'] = '<div class="col s12 m3 offset-m1"><div class="card" style="width: 100%;"><div class="card-content black-text"><span class="card-title">' + txtb[y].sname + '</span><div id="myProgress"><div id="myBar" style="width:' + Math.ceil((100 * (txtb[y].nowp))/ txtb[y].maxp) + '%;"></div></div><p style="font-weight: 5;">' + txtb[y].nowp + '/' + txtb[y].maxp + ' online. </p></div><div class="card-action"><a href="#modal' + xcount + '" class="modal-trigger">More Info</a></div></div></div><div id="modal' + xcount + '" class="modal modal-fixed-footer"><div class="modal-content"><h4>Server Info</h4><br><p>Players online:</p><br><p>' + newstr + '</p></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Close</a></div></div><span class="trans"></span>';
                } else if(reprow==3) { 
                    txtb[y]['shtm'] = '<div class="col s12 m2 offset-m1"><div class="card" style="width: 100%;"><div class="card-content black-text"><span class="card-title">' + txtb[y].sname + '</span><div id="myProgress"><div id="myBar" style="width:' + Math.ceil((100 * (txtb[y].nowp))/ txtb[y].maxp) + '%;"></div></div><p style="font-weight: 5;">' + txtb[y].nowp + '/' + txtb[y].maxp + ' online. </p></div><div class="card-action"><a href="#modal' + xcount + '" class="modal-trigger">More Info</a></div></div></div><div id="modal' + xcount + '" class="modal modal-fixed-footer"><div class="modal-content"><h4>Server Info</h4><br><p>Players online:</p><br><p>' + newstr + '</p></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Close</a></div></div></div><span class="trans"></span>';
                    reprow = 0;
                };
                reprow++;
                xcount++;
                
            };
            
            for(var yb = 0; yb < txtb.length; yb++) {
                console.log(txtb[yb].sname);
                $('.trans:last').after(txtb[yb].shtm);                
            };
            $('.modal').modal();
            var maxnum;
            

        };
    };
});