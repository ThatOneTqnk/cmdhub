$(document).ready(() => {
    $('.coord').click(() => {
        var coords = document.getElementById('txtarea1').value
        coords = coords.split(/ /gi);
        var coords2 = document.getElementById('txtarea2').value
        coords2 = coords2.split(/ /gi);
        var strname = document.getElementById('txtarea3').value
        var realcoords = [];
        var realcoords2 = [];
        coords.forEach(element => {
            element = element.trim();
            realcoords.push(Number(element));
        });
        coords2.forEach(element => {
            element = element.trim();
            realcoords2.push(Number(element));
        });
        var displacement = [];
        var struccs = [];
        var strucc;
        for(x = 0; x <= 2; x++) {
            displacement.push(Math.ceil((realcoords2[x] - realcoords[x]) / 32));
        };
        var sizex = 32;
        var sizey = 32;
        var sizez = 32;
        if (displacement[0] == 1) {
            sizex = realcoords2[0] - realcoords[0] + 1;
        };
        if (displacement[1] == 1) {
            sizey = realcoords2[1] - realcoords[1] + 1;
        };
        if (displacement[2] == 1) {
            sizez = realcoords2[2] - realcoords[2] + 1;
        };
        var spanx = 0;
        var xcmds = [];
        var xcoords = [];
        var ycoords = [];
        var zcoords = [];
        var zcons = 0;
        var ycons = 0;
        var yoff = 0;
        var zinit;
        var tracky = 0;
        var totalcyc = 0;
        var observer = 0;
        var ycons2 = 0;
        // 89, 90, 1039
        // 40, 56, 998
        console.log(displacement)
        for(yadd = 1; yadd <= displacement[1]; yadd++) {
            for(zadd = 1; zadd <= displacement[2]; zadd++) {
                for(xadd = 1; xadd <= displacement[0]; xadd++) {
                    totalcyc++;
                    if (xadd == 1) {
                        zinit = zcons - 1;
                        var zoff = 1;
                        var xoff = 0; 
                    } else {
                        zinit = zcons;
                        zoff = 0;
                        xoff = 1;
                        yoff = 0;
                    }
                    if (xadd < displacement[0]) {
                        sizex = 32;
                    } else {
                        sizex = (1 + realcoords2[0] - (realcoords[0] + (32 * (displacement[0] - 1)))); 
                    };
                    if (zadd < displacement[2]) {
                        sizez = 32;
                    } else {
                        sizez = (1 + realcoords2[2] - (realcoords[2] + (32 * (displacement[2] - 1)))); 
                    };
                    if (yadd < displacement[1]) {
                        sizey = 32;
                    } else {
                        sizey = (1 + realcoords2[1] - (realcoords[1] + (32 * (displacement[1] - 1)))); 
                    };
                    if (xadd == 1 && yadd >= 2 && zadd == 1 && tracky == 0) {
                        zinit++;
                        zoff = 0;
                        xoff = 0;
                        yoff = 3;
                        tracky++;
                        ycons--;
                        ycons2 = -2;
                    } else if(yadd >= 2 && tracky == 1) {
                        ycons2 = 0;
                        ycons++;
                        tracky = 2;
                    };
                    xcoords.push((realcoords[0] + spanx));
                    zcoords.push((realcoords[2] + zinit));
                    if(observer == 1) {
                        if(sizey < 3) sizey = 3;
                        strucc = 'setblock ' + (realcoords[0] + spanx) + ' ' + (realcoords[1] + ycons + ycons2) + ' ' + (realcoords[2] + zinit) + ' observer 8';
                        xcmds.push(strucc);
                        strucc = 'setblock ' + (realcoords[0] + spanx) + ' ' + (realcoords[1] + ycons + 1 + ycons2) + ' ' + (realcoords[2] + zinit) + ' command_block 1 0';
                        xcmds.push(strucc);
                        strucc = 'summon armor_stand ' + (realcoords[0] + spanx) + ' ' + (realcoords[1] + ycons + 1 + ycons2) + ' ' + (realcoords[2] + zinit) + ' {CustomName:\\"polyfill\\",Invulnerable:1,Small:1,NoGravity:1,Marker:1}';
                        xcmds.push(strucc);
                        strucc = 'setblock ' + (realcoords[0] + spanx) + ' ' + (realcoords[1] + ycons + ycons2 + 2) + ' ' + (realcoords[2] + zinit) + ' structure_block 0 0 {metadata:\\"\\",mirror:\\"NONE\\",ignoreEntities:1b,powered:0b,seed:0L,rotation:\\"NONE\\",posX:' + xoff + ',mode:\\"SAVE\\",posY:' + (yoff - 2) + ',sizeX:' + sizex + ',posZ:' + zoff + ',integrity:1.0f,showair:0b,name:\\"' + strname + totalcyc + '\\",id:\\"minecraft:structure_block\\",sizeY:' + (sizey) + ',sizeZ:' + sizez + ',showboundingbox:1b}';
                        xcmds.push(strucc);
                        ycoords.push((realcoords[1] + ycons + ycons2 + 2));
                        // strucc = 'blockdata ' + (realcoords[0] + spanx) + ' ' + (realcoords[1] + ycons + 1) + ' ' + (realcoords[2] + zinit) + ' {Command:\\"fill ~ ~1 ~ ~ ~-1 ~ air\\"}';
                        // xcmds.push(strucc);
                    } else {
                        strucc = 'setblock ' + (realcoords[0] + spanx) + ' ' + (realcoords[1] + ycons) + ' ' + (realcoords[2] + zinit) + ' structure_block 0 0 {metadata:\\"\\",mirror:\\"NONE\\",ignoreEntities:1b,powered:0b,seed:0L,rotation:\\"NONE\\",posX:' + xoff + ',mode:\\"SAVE\\",posY:' + yoff + ',sizeX:' + sizex + ',posZ:' + zoff + ',integrity:1.0f,showair:0b,name:\\"' + strname + totalcyc + '\\",id:\\"minecraft:structure_block\\",sizeY:' + sizey + ',sizeZ:' + sizez + ',showboundingbox:1b}';
                        xcmds.push(strucc);
                        ycoords.push((realcoords[1] + ycons));
                    }
                    if (observer == 0) observer = 1;
                    if (xadd == 1) {
                        spanx += 31;
                    } else {
                        spanx += 32;
                    }
                };
                zcons += 32;
                spanx = 0;
            };
            tracky = 0;
            ycons += 32;
            zcons = 0;
        }
        var totalcmd = 'summon falling_block ~ ~1 ~ {Block:stone,Time:1,Passengers:[{id:falling_block,Block:redstone_block,Time:1,Passengers:[{id:falling_block,Block:activator_rail,Time:1,Passengers:[{id:commandblock_minecart,Command:"gamerule commandBlockOutput false"},{id:commandblock_minecart,Command:"setblock ~ ~10 ~ command_block 1 0 {Command:\\"execute @e[type=armor_stand,name=polyfill] ~ ~ ~ blockdata ~ ~ ~ {Command:\\\\\\"fill ~ ~1 ~ ~ ~-1 ~ air\\\\\\"}\\",auto:0}"},{id:commandblock_minecart,Command:"setblock ~ ~11 ~ chain_command_block 1 0 {Command:\\"minecraft:kill @e[type=armor_stand,name=polyfill]\\",auto:1}"},{id:commandblock_minecart,Command:"setblock ~ ~12 ~ chain_command_block 1 0 {Command:\\"fill ~ ~ ~ ~ ~-2 ~ air\\",auto:1}"},'
        var totalcmd2 = 'summon falling_block ~ ~1 ~ {Block:stone,Time:1,Passengers:[{id:falling_block,Block:redstone_block,Time:1,Passengers:[{id:falling_block,Block:activator_rail,Time:1,Passengers:[{id:commandblock_minecart,Command:"gamerule commandBlockOutput false"},{id:commandblock_minecart,Command:"setblock ~-2 ~-6 ~0 command_block 5 0 {auto:0,Command:\\"\\"}"},'
        var totalcmd3 = 'summon falling_block ~ ~1 ~ {Block:stone,Time:1,Passengers:[{id:falling_block,Block:redstone_block,Time:1,Passengers:[{id:falling_block,Block:activator_rail,Time:1,Passengers:[{id:commandblock_minecart,Command:"gamerule commandBlockOutput false"},{id:commandblock_minecart,Command:"scoreboard objectives add dabbermap dummy"},{id:commandblock_minecart,Command:"summon armor_stand ~ ~ ~ {CustomName:\\"dabberino\\",NoGravity:1,Invulnerable:1,Small:1}"},{id:commandblock_minecart,Command:"minecraft:tp @e[type=armor_stand,name=dabberino,c=1] ~ ~-5 ~-2"},{id:commandblock_minecart,Command:"setblock ~-2 ~-6 ~0 repeating_command_block 1 0 {auto:0,Command:\\"scoreboard players add @e[type=armor_stand,name=dabberino] dabbermap 1\\"}"},{id:commandblock_minecart,Command:"setblock ~-2 ~-5 ~0 repeating_command_block 1 0 {auto:1,Command:\\"execute @e[type=armor_stand,name=dabberino,score_dabbermap_min=2] ~ ~ ~ blockdata ~ ~-1 ~ {auto:1}\\"}"},{id:commandblock_minecart,Command:"setblock ~-2 ~-4 ~0 chain_command_block 1 0 {auto:1,Command:\\"minecraft:tp @e[type=armor_stand,name=dabberino,score_dabbermap_min=2] ~-1 ~ ~\\"}"},{id:commandblock_minecart,Command:"setblock ~-2 ~-3 ~0 chain_command_block 1 0 {auto:1,Command:\\"minecraft:kill @e[type=armor_stand,name=dabberino,score_dabbermap_min=' + (xcoords.length + 2) + ']\\"}"},'
        var conjoin = '';
        var errw = 0;
        var erm2w = 0;
        for(erm2 = (xcoords.length - 1); erm2 >= 0; erm2--) {
            totalcmd3 += '{id:commandblock_minecart,Command:"setblock ~' + erm2w + ' ~-6 ~-2 command_block 2 0 {auto:0,Command:\\"blockdata ' + xcoords[erm2] + ' ' + ycoords[erm2] + ' ' + zcoords[erm2] + ' {mode:\\\\\\"SAVE\\\\\\"}\\"}"},';
            totalcmd3 += '{id:commandblock_minecart,Command:"setblock ~' + erm2w + ' ~-6 ~-3 chain_command_block 2 0 {auto:1,Command:\\"setblock ' + xcoords[erm2] + ' ' + (ycoords[erm2] - 1) + ' ' + zcoords[erm2] + ' redstone_block\\"}"},';
            totalcmd3 += '{id:commandblock_minecart,Command:"setblock ~' + erm2w + ' ~-6 ~-4 chain_command_block 2 0 {auto:1,Command:\\"setblock ' + xcoords[erm2] + ' ' + (ycoords[erm2] - 1) + ' ' + zcoords[erm2] + ' command_block 0 0 {Command:\\\\\\"fill ~ ~1 ~ ~ ~-1 ~ air\\\\\\"}\\"}"},';
            totalcmd3 += '{id:commandblock_minecart,Command:"setblock ~' + erm2w + ' ~-6 ~-5 chain_command_block 2 0 {auto:1,Command:\\"blockdata ' + xcoords[erm2] + ' ' + ycoords[erm2] + ' ' + zcoords[erm2] + ' {mode:\\\\\\"LOAD\\\\\\"}\\"}"},';
            erm2w--;
        };
        for(erm = 0; erm < xcoords.length; erm++) {
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw - 1) + ' ~-6 ~ chain_command_block 5 0 {auto:1,Command:\\"testforblock ' + xcoords[erm] + ' ' + ycoords[erm] + ' ' + zcoords[erm] + ' air\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw) + ' ~-6 ~ chain_command_block 5 0 {auto:1,Command:\\"testforblock ~-1 ~ ~ chain_command_block * {SuccessCount:0}\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 1) + ' ~-6 ~ chain_command_block 13 0 {auto:1,Command:\\"tellraw @a \\\\\\"\\\\\\\\u00a76Conflict found at \\\\\\\\u00a7e ' + xcoords[erm] + ' ' + ycoords[erm] + ' ' + zcoords[erm] + ' \\\\\\"\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 2) + ' ~-6 ~ chain_command_block 5 0 {auto:1,Command:\\"testforblock ' + xcoords[erm] + ' ' + (ycoords[erm] - 1) + ' ' + zcoords[erm] + ' air\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 3) + ' ~-6 ~ chain_command_block 5 0 {auto:1,Command:\\"testforblock ~-1 ~ ~ chain_command_block * {SuccessCount:0}\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 4) + ' ~-6 ~ chain_command_block 13 0 {auto:1,Command:\\"tellraw @a \\\\\\"\\\\\\\\u00a76Conflict found at \\\\\\\\u00a7e ' + xcoords[erm] + ' ' + (ycoords[erm] - 1) + ' ' + zcoords[erm] + ' \\\\\\"\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 5) + ' ~-6 ~ chain_command_block 5 0 {auto:1,Command:\\"testforblock ' + xcoords[erm] + ' ' + (ycoords[erm] + 1) + ' ' + zcoords[erm] + ' air\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 6) + ' ~-6 ~ chain_command_block 5 0 {auto:1,Command:\\"testforblock ~-1 ~ ~ chain_command_block * {SuccessCount:0}\\"}"},'
            totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~' + (errw + 7) + ' ~-6 ~ chain_command_block 13 0 {auto:1,Command:\\"tellraw @a \\\\\\"\\\\\\\\u00a76Conflict found at \\\\\\\\u00a7e ' + xcoords[erm] + ' ' + (ycoords[erm] + 1) + ' ' + zcoords[erm] + ' \\\\\\"\\"}"},'
            errw += 9;
        };
        for(xcm = 0; xcm < xcmds.length; xcm++) {
            conjoin += '{id:commandblock_minecart,Command:"' + xcmds[xcm] + '"},';
        };
        totalcmd += conjoin;
        totalcmd3 += '{id:commandblock_minecart,Command:"setblock ~ ~ ~1 command_block 1 0 {Command:\\"fill ~ ~-3 ~-1 ~ ~ ~ air\\"}"},{id:commandblock_minecart,Command:"setblock ~ ~-1 ~1 redstone_block",auto:1},{id:commandblock_minecart,Command:"minecraft:kill @e[type=commandblock_minecart,r=1]"}]}]}]}'
        totalcmd2 += '{id:commandblock_minecart,Command:"setblock ~ ~ ~1 command_block 1 0 {Command:\\"fill ~ ~-3 ~-1 ~ ~ ~ air\\"}"},{id:commandblock_minecart,Command:"setblock ~ ~-1 ~1 redstone_block",auto:1},{id:commandblock_minecart,Command:"minecraft:kill @e[type=commandblock_minecart,r=1]"}]}]}]}'
        totalcmd += '{id:commandblock_minecart,Command:"setblock ~ ~ ~1 command_block 1 0 {Command:\\"fill ~ ~-3 ~-1 ~ ~ ~ air\\"}"},{id:commandblock_minecart,Command:"setblock ~ ~-1 ~1 redstone_block",auto:1},{id:commandblock_minecart,Command:"minecraft:kill @e[type=commandblock_minecart,r=1]"}]}]}]}'
        console.log(totalcmd);
        console.log(totalcmd2);
        console.log(totalcmd3);
        $('#cmd1').val(totalcmd2);
        $('#cmd2').val(totalcmd);
        $('#cmd3').val(totalcmd3);
    });


    $('.cop1').click(() => {
        copy('cmd1');
    });
    $('.cop2').click(() => {
        copy('cmd2');
    });
    $('.cop3').click(() => {
        copy('cmd3');
    });

    function copy(elem) {
        var copyText = document.getElementById(elem);
        copyText.select();
        document.execCommand("Copy");
        document.getSelection().removeAllRanges();
      }
});