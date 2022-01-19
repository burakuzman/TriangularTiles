
class Node2D{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

function rotate(node0,crot,teta){
    //teta must be in radians
    t_x=node0.x-crot.x;
    t_y=node0.y-crot.y;
    rx=t_x*Math.cos(teta)-t_y*Math.sin(teta);
    ry=t_x*Math.sin(teta)+t_y*Math.cos(teta);
    newx=rx+crot.x;
    newy=ry+crot.y;
    return new Node2D(newx,newy);
}

function translate(node0,delx,dely){
    t_x=node0.x+delx;
    t_y=node0.y+dely;
    return new Node2D(t_x,t_y);
}


class BaseTriangularTile {
    constructor(edge_length,edge_ratio){
        this.edge_length=edge_length;
        this.edge_ratio=edge_ratio;
        this.pointlist=[];
        this.createKeypoints();
        this.r_c0=Math.sqrt( (this.q2.y- this.q1.y)*(this.q2.y- this.q1.y)+(this.q2.x- this.q1.x)*(this.q2.x- this.q1.x))/2; //this is the radius for the semicircle centered on the edge
        this.r_c1=this.edge_length*this.edge_ratio; //this is radius for the 60 degree small arc centered on each vertex
        this.r_c2=this.edge_length*(1-this.edge_ratio); //this is the radius for the 60 degree larger arc centered on each vertex
    };
    
    getKeyPoints(){
        if (this.pointlist.length<1){
            this.createKeypoints();
        }

        return this.pointlist;
    };

    translate(delx,dely){
        for (var i=0,l=this.pointlist.length;i<l;i++){
            var tempnode= translate(this.pointlist[i],delx,dely);
            this.pointlist[i].x=tempnode.x;
            this.pointlist[i].y=tempnode.y;
        }
    };

    rotate(teta){
    //teta must be in radians
        var crot=new Node2D(0,0);
        for (var i=0,l=this.pointlist.length;i<l;i++){
            var tempnode= rotate(this.pointlist[i],crot,teta);
            this.pointlist[i].x=tempnode.x;
            this.pointlist[i].y=tempnode.y;
        }
    }

    createKeypoints=function(){
            const tile_edge=this.edge_length; //mm
            this.tile_radius=tile_edge/(2*Math.cos(Math.PI/6)); //this is the radius of the circle that circumscribes the triangular tile. 
            //origin of the tile is the center of this circle.
            var p1_x=this.tile_radius*Math.cos(Math.PI/6); //first vertex of the triangular tile
            var p1_y=-this.tile_radius*Math.sin(Math.PI/6); //first vertex of the triangular tile
            this.p1=new Node2D(p1_x,p1_y);
            var p2_x=0 //2nd vertex of the triangular tile
            var p2_y=this.tile_radius //2nd vertex of the triangular tile
            this.p2=new Node2D(p2_x,p2_y);
            var p3_x=-this.tile_radius*Math.cos(Math.PI/6); //3rd vertex of the triangular tile
            var p3_y=-this.tile_radius*Math.sin(Math.PI/6); //3rd vertex of the triangular tile
            this.p3=new Node2D(p3_x,p3_y);
            var q1_x=p1_x+(p2_x-p1_x)*this.edge_ratio;
            var q1_y=p1_y+(p2_y-p1_y)*this.edge_ratio;
            this.q1=new Node2D(q1_x,q1_y);
            var q2_x=p1_x+(p2_x-p1_x)*(1-this.edge_ratio);
            var q2_y=p1_y+(p2_y-p1_y)*(1-this.edge_ratio);
            this.q2=new Node2D(q2_x,q2_y);
            var q4_x=p3_x+(p2_x-p3_x)*this.edge_ratio;
            var q4_y=p3_y+(p2_y-p3_y)*this.edge_ratio;
            this.q4=new Node2D(q4_x,q4_y);
            var q3_x=p3_x+(p2_x-p3_x)*(1-this.edge_ratio);
            var q3_y=p3_y+(p2_y-p3_y)*(1-this.edge_ratio);
            this.q3=new Node2D(q3_x,q3_y);
            var q5_x=p3_x+(p1_x-p3_x)*this.edge_ratio;
            var q5_y=p3_y+(p1_y-p3_y)*this.edge_ratio;
            this.q5=new Node2D(q5_x,q5_y);
            var q6_x=p3_x+(p1_x-p3_x)*(1-this.edge_ratio);
            var q6_y=p3_y+(p1_y-p3_y)*(1-this.edge_ratio);
            this.q6=new Node2D(q6_x,q6_y);
            
            this.pointlist.push(this.p1,this.p2,this.p3,this.q1,this.q2,this.q3,this.q4,this.q5,this.q6);
    }
};

function Polygon () {
    var pointList = [];
    this.node = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    function build (arg) {
        var res = '';
        for (var i=0,l=arg.length;i<l;i++) {
            res=res+arg[i].x+','+arg[i].y+' ';
        };
        return res;
    };
    this.setAttribute = function (key,val) {
        if (val === undefined) return this.node.getAttribute(key);
        this.node.setAttribute(key,val);
    }
    this.getPoint = function (i) {return pointList[i]}
    this.setPoint = function (i,x,y) {
        pointList[i] = [x,y];
        this.attribute('points',build(pointList));
    }
    this.points = function () {
      for (var i=0,l=arguments[0].length;i<l;i+=1) {
          pointList.push(arguments[0][i]);
      }
      this.setAttribute('points',build(pointList));
    }
    // initialize 'points':
    this.points.apply(this,arguments);
}

function Arc () {
    var pointList = [];
    this.node = document.createElementNS('http://www.w3.org/2000/svg','path');
    function build (arg) {
        var res = 'M'+arg[0]+","+arg[1]+" A"+arg[2]+","+arg[3]+" "+arg[4]+" "+arg[5]+","+arg[6]+" "+arg[7]+","+arg[8];
        return res;
    };
    this.setAttribute = function (key,val) {
        if (val === undefined) return this.node.getAttribute(key);
        this.node.setAttribute(key,val);
    }
    
    this.d = function () {
        pointlist=arguments;
        this.setAttribute('d',build(pointlist));
    }
    // initialize 'points':
    this.d.apply(this,arguments);
}

function CreateBaseTriangle(edge_length,edge_ratio){
    return new BaseTriangularTile(edge_length,edge_ratio);
};

class DecoratedTile {
    constructor(tiletype,edge_length,edge_ratio,rot_angle,tdx,tdy){
    var bt=new BaseTriangularTile(edge_length,edge_ratio);
    //rot_angle must be in radians
    bt.rotate(rot_angle);
    bt.translate(tdx,tdy);
    const tile_edge_color='#aaaaaa'; //light gray
    const tile_edge_linewidth=1; //tile edge line width

    var plist0=bt.pointlist.slice(0,3);
    this.polygon=new Polygon(plist0);
//    this.polygon.setAttribute("stroke","#ffffff");
//    this.polygon.setAttribute("stroke-width",1);
    this.polygon.setAttribute("fill","None");

    switch(tiletype){
        case '1':
            this.arc_a=new Arc(bt.q1.x,bt.q1.y,bt.r_c1,bt.r_c1,0,0,1,bt.q6.x,bt.q6.y);
            this.arc_b=new Arc(bt.q2.x,bt.q2.y,bt.r_c1,bt.r_c1,0,0,0,bt.q3.x,bt.q3.y);
            this.arc_c=new Arc(bt.q4.x,bt.q4.y,bt.r_c1,bt.r_c1,0,0,0,bt.q5.x,bt.q5.y);
            break;
        case '2':
            this.arc_a=new Arc(bt.q1.x,bt.q1.y,bt.r_c0,bt.r_c0,0,0,0,bt.q2.x,bt.q2.y);
            this.arc_b=new Arc(bt.q3.x,bt.q3.y,bt.r_c0,bt.r_c0,0,0,0,bt.q4.x,bt.q4.y);
            this.arc_c=new Arc(bt.q5.x,bt.q5.y,bt.r_c0,bt.r_c0,0,0,0,bt.q6.x,bt.q6.y);
            break;
        case '3':
            this.arc_a=new Arc(bt.q1.x,bt.q1.y,bt.r_c1,bt.r_c1,0,0,1,bt.q6.x,bt.q6.y);
            this.arc_b=new Arc(bt.q2.x,bt.q2.y,bt.r_c2,bt.r_c2,0,0,1,bt.q5.x,bt.q5.y);
            this.arc_c=new Arc(bt.q3.x,bt.q3.y,bt.r_c0,bt.r_c0,0,0,0,bt.q4.x,bt.q4.y);
            break;
    };

    this.arc_a.setAttribute("stroke", "blue");
    this.arc_a.setAttribute("fill", "None");
    this.arc_b.setAttribute("stroke", "blue");
    this.arc_b.setAttribute("fill", "None");
    this.arc_c.setAttribute("stroke", "blue");
    this.arc_c.setAttribute("fill", "None");


    this.svg_group=document.createElementNS('http://www.w3.org/2000/svg','g');
    this.svg_group.appendChild(this.polygon.node);
    this.svg_group.appendChild(this.arc_a.node);
    this.svg_group.appendChild(this.arc_b.node);
    this.svg_group.appendChild(this.arc_c.node);

    };
   };

