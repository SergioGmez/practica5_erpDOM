
function submenus(menu){
 
    var submenu = new Array()
    
    window.onload = function() {
        console.log(menu);
        var menuLi = menu.children[0].children;
        
        for (var i=0; i < titulos.length; i++) {

             menuLi[i].innerHTML+="<div id='subseccion"+i+"'></div>"
             
             submenu[i]=document.getElementById('subseccion'+i);
             
             for (j=0;j<titulos[i].length;j++) {
                 submenu[i].innerHTML += "<p><a href='"+enlaces[i][j]+"'>"+titulos[i][j]+"</a></p>";
                 }
             
             menuLi[i].style.position="relative";
             submenu[i].style.position="absolute";
             submenu[i].style.top="100%";
             submenu[i].style.left="0px";
             submenu[i].style.backgroundColor="cornflowerblue";
             submenu[i].style.font="normal 0.8em arial";
             submenu[i].style.padding="0.2em 0.5em";
             submenu[i].style.display="none"
             }	
        
        for (i=0;i<titulos.length;i++) {
            menuLi[i].onmouseover = ver;
            menuLi[i].onmouseout = ocultar;
        } 
    }
    
    function ver() {
         muestra=this.getElementsByTagName("div")[0];
         muestra.style.display="block"
    }

    function ocultar() {
         oculta=this.getElementsByTagName("div")[0];
         oculta.style.display="none"
    }

    }

    var titulos = new Array();
    var enlaces = new Array();

    titulos[0]=new Array(
              "Subsección uno uno",
              "Subsección uno dos",
              "Subsección uno tres",
              "Subsección uno cuatro");
    enlaces[0]=new Array("#","#","#","#");
    titulos[1]=new Array(
              "Subsección dos uno",
              "Subsección dos dos",
              "Subsección dos tres",
              "Subsección dos cuatro",
              "Subsección dos cinco");
    enlaces[1]=new Array("#","#","#","#","#");
    titulos[2]=new Array(
              "Subsección tres uno",
              "Subsección tres dos",
              "Subsección tres tres",
              "Subsección tres cuatro",
              "Subsección tres cinco");
    enlaces[2]=new Array("#","#","#","#","#");	
    titulos[3]=new Array(
              "Subsección cuatro uno",
              "Subsección cuatro dos",
              "Subsección cuatro tres");
    enlaces[3]=new Array("#","#","#"); 

    var menu = document.getElementById("nav1");

    submenus(menu);