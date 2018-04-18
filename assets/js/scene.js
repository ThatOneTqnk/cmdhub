$(document).ready(() =>{
    function snacc(text) {
        $('#snackbar').html(text);
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    $('.gen').click(() => {

        // Grabbing the data
        let checc = document.getElementById('mySwitch').checked;
        //console.log(checc);
        let x;
        let coord1 = $('#content').val();
        let coord1full = '';
        let deltafull = '';
        let coord2 = $('#content2').val();
        let time = $('#content3').val();
        let objective = $('#content4').val();
        coord1 = coord1.trim();
        coord2 = coord2.trim();

        if(objective.indexOf(' ') >= 0 || objective === '' || objective.length > 16) {
            snacc('Invalid objective!');
            return;
        }

        // Finding invalid inputs.
        time = parseInt(time);
        if(isNaN(time)) {
            snacc('Invalid time!');
            return;
        }
        coord1 = coord1.split(" ");
        coord2 = coord2.split(" ");

        
        if(coord1.length !== 5 || coord2.length !== 5) {
            snacc('Invalid coordinates!');
            return;
        }

        coord1.forEach(function(part, index) {
            coord1[index] = parseInt(part);
            if (isNaN(coord1[index])) x = 1;
            coord1full += coord1[index] + ' '
        });
        coord2.forEach(function(part, index) {
            coord2[index] = parseInt(part);
            if (isNaN(coord2[index])) x = 1;
        });
        if(x === 1) {
            snacc('Invalid coordinates!');
            return;
        }
        
        let delta = [0, 1, 2, 3, 4];

        time *= 20;
        
        // Reset temp var
        x = 0;

        // Convert circle degrees to pos/neg
        if(coord1[3] > 180) coord1[3] -= 360;
        if(coord1[4] > 180) coord1[4] -= 360;
        if(coord2[3] > 180) coord2[3] -= 360;
        if(coord2[4] > 180) coord2[4] -= 360;
        console.log(coord1);
        console.log(coord2);
        delta.forEach((part, index) => {
            delta[index] = coord2[index] - coord1[index];
            if(index === 3 && checc === true) {
                console.log('test')
                if(delta[3] < 0) {
                    delta[3] += 360
                    x = 1;
                }
                if(delta[3] > 0 && x === 0) delta[3] -= 360
                console.log(delta[3]);
            }
            delta[index] = delta[index] / time;
            delta[index] = Math.round(delta[index] * 100) / 100;
            
            deltafull += '~' + delta[index] + ' ';

        })
        console.log(delta);
        
        let totalcmd = 'summon falling_block ~ ~1 ~ {Block:stone,Time:1,Passengers:[{id:falling_block,Block:redstone_block,Time:1,Passengers:[{id:falling_block,Block:activator_rail,Time:1,Passengers:[{id:commandblock_minecart,Command:"gamerule commandBlockOutput false"},';
        let partof = '{id:commandblock_minecart,Command:"setblock ~-2 ~';

        // Adding the commands.
        console.log(coord1full);
        totalcmd += '{id:commandblock_minecart,Command:"scoreboard objectives add ' + objective + ' dummy"},'
        totalcmd += partof + '-3 ~ repeating_command_block 1 0 {auto:1,Command:\\"scoreboard players add @a[score_' + objective + '_min=1] ' + objective + ' 1\\"}"},'
        totalcmd += partof + '-2 ~ repeating_command_block 1 0 {auto:1,Command:\\"minecraft:tp @a[score_' + objective + '_min=2,score_' + objective + '=2] ' + coord1full + '\\"}"},'
        totalcmd += partof + '-1 ~ chain_command_block 1 0 {auto:1,Command:\\"execute @a[score_' + objective + '_min=2,score_' + objective + '=2] ~ ~ ~ summon minecraft:area_effect_cloud ~ ~ ~ {Duration:' + (time + 3) + '}\\"}"},'
        totalcmd += partof + ' ~ chain_command_block 1 0 {auto:1,Command:\\"execute @a[score_' + objective + '_min=2,score_' + objective + '=2] ~ ~ ~ minecraft:tp @e[c=1,type=area_effect_cloud,r=8] @s\\"}"},'
        totalcmd += partof + '1 ~ chain_command_block 1 0 {auto:1,Command:\\"minecraft:gamemode spectator @a[score_' + objective + '_min=2,score_' + objective + '=2]\\"}"},'
        totalcmd += partof + '-3 ~1 repeating_command_block 1 0 {auto:1,Command:\\"execute @a[score_' + objective + '_min=7,score_' + objective + '=' + (time + 7) + '] ~ ~ ~ minecraft:tp @e[c=1,type=area_effect_cloud,r=8] ' + deltafull + '\\"}"},'
        totalcmd += partof + '-2 ~1 chain_command_block 1 0 {auto:1,Command:\\"execute @a[score_' + objective + '_min=7,score_' + objective + '=' + (time + 7) + '] ~ ~ ~ minecraft:tp @s @e[c=1,type=area_effect_cloud,r=8]\\"}"},'
        totalcmd += partof + '-1 ~1 repeating_command_block 1 0 {auto:1,Command:\\"scoreboard players reset @a[score_' + objective + '_min=' + (time + 7) + '] ' + objective + '\\"}"},'

        totalcmd += '{id:commandblock_minecart,Command:"setblock ~ ~ ~1 command_block 1 0 {Command:\\"fill ~ ~-3 ~-1 ~ ~ ~ air\\"}"},{id:commandblock_minecart,Command:"setblock ~ ~-1 ~1 redstone_block",auto:1},{id:commandblock_minecart,Command:"minecraft:kill @e[type=commandblock_minecart,r=1]"}]}]}]}'
        $('#scorearea').html(totalcmd);

    });

    document.getElementById('content2').onkeydown = function(e){
        if(e.keyCode == 13){
            $('.gen').click();
        }
    };
    document.getElementById('content').onkeydown = function(e){
        if(e.keyCode == 13){
            $('.gen').click();
        }
    };
    document.getElementById('content3').onkeydown = function(e){
        if(e.keyCode == 13){
            $('.gen').click();
        }
    };
    document.getElementById('content4').onkeydown = function(e){
        if(e.keyCode == 13){
            $('.gen').click();
        }
    };
});