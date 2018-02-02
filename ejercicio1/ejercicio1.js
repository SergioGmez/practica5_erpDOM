function listElement (element){
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    
    li.appendChild(document.createTextNode(element.nodeName));
    ul.appendChild(li);
    list.appendChild(ul);
    
    if (element.childElementCount > 0){
        var childrens = element.children;
        
        for (var i=0; i<childrens.length; i++){
            listElement(childrens[i]);
        }
    }
}

var element = document.body;
var list = document.getElementById("list");

listElement(element);