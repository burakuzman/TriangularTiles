var tile_edge_color='#ffffff';
var tile_edge_linewidth=0.0;
var tile_edge_length=40;
var tile_edge_ratio=0.4065;
var tile_radius=tile_edge_length/(2*Math.cos(Math.PI/6));

var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
svg.setAttribute('width',800);
svg.setAttribute('height',800);

var delx=tile_edge_length;
var dely=3*tile_radius;
var x0=20;
var y0=20;

var x=x0;
var y=y0;
function tiletype(){
    var types=['1','2','3'];
//    var types=['3'];
    var res=types[Math.floor(Math.random()*types.length)];
    return res;
}

var angles=[0,Math.PI/3*2,Math.PI/3*4];
var angles2=[Math.PI/3,Math.PI,Math.PI/3*5];

for (var j=0;j<12;j++){
    x=x0;
    for (var i=0;i<20;i++) {
        var ang_1=angles[Math.floor(Math.random()*angles.length)];
        var ang_2=angles2[Math.floor(Math.random()*angles2.length)];
        var ang_3=angles2[Math.floor(Math.random()*angles2.length)];
        var ang_4=angles[Math.floor(Math.random()*angles.length)];

        var t1=new DecoratedTile(tiletype(),tile_edge_length,tile_edge_ratio,ang_1,x,y);
        var t2=new DecoratedTile(tiletype(),tile_edge_length,tile_edge_ratio,ang_2,x+tile_edge_length/2,y+tile_radius/2);
        var t3=new DecoratedTile(tiletype(),tile_edge_length,tile_edge_ratio,ang_3,x,y+2*tile_radius);
        var t4=new DecoratedTile(tiletype(),tile_edge_length,tile_edge_ratio,ang_4,x+tile_edge_length/2,y+1.5*tile_radius);

        svg.appendChild(t1.svg_group);
        svg.appendChild(t2.svg_group);
        svg.appendChild(t3.svg_group);
        svg.appendChild(t4.svg_group);
        x=x+delx;
        };
    y=y+dely;
};



document.body.appendChild(svg);
