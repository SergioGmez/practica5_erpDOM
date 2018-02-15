function listElement (element){
    var ul = document.createElement("ul"); 
    
    var childrens = element.children;
    
    for (var i=0; i<childrens.length; i++){
         var liChild = document.createElement("li");
         
         var txt = childrens[i].nodeName;
         var att = childrens[i].attributes;
         
         if (att.length > 0){
            txt += " -- Attributes: ";
             
            for (var y=0; y < att.length; y++){
                txt += att[y].name + "  ";
            }
         }
        
         liChild.appendChild(document.createTextNode(txt));
         liChild.appendChild(listElement(childrens[i]));
        
         ul.appendChild(liChild);
    }
    return ul; 
}

var element = document.body;
var list = document.getElementById("list");
var ul = listElement(element);

list.appendChild(ul);