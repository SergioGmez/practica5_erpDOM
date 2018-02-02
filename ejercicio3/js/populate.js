"use strick";

function createObjects(){
        var sh = new StoreHouse();
        sh.name = "Test";
        var cat1 = new Category("Ropa");
        cat1.description = "Todo tipo de ropa";
        var cat2 = new Category("Tecnología");
        cat2.description = "Todo tipo de aparato electrónico";
        var cat2 = new Category("Musica");
        cat2.description = "Todo lo relacionado con musica";
        var pro1 = new Product(1111, "Camiseta", 19.99);; 
        var pro2 = new Product(2222, "Portatil", 321.99);
        var pro3 = new Product(3333, "Zapatos", 27.99);; 
        var coor1 = new Coords(14, 68);
        var shop1 = new Shop(1234, "shirtShop", coor1);
        var shop2 = new Shop(4321, "tecnoShop", coor1);1
        var sh = new StoreHouse();
        var book = new Book(4444, "ESDLA", 20, 576);
        var tv = new TV(5555, "TV1", 1450, 48);
        
        sh.addShop(shop1);
        sh.addShop(shop2);
        sh.addProductInShop(pro1, shop1);
        sh.addProductInShop(pro2, shop1);
        sh.addProductInShop(pro3, shop1);
}

function initPopulate(sh){
    var shops = sh.shops;
    var shop = shops.next();
    var divSct1 = document.getElementById("sct1");

    while (!shop.done){
        divCol = document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");
        
        divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");
        
        img = document.createElement("img");
        img.setAttribute("src", "http://placehold.it/320x150");
        divThumb.appendChild(img);
        
        divCap = document.createElement("div");
        divCap.setAttribute("class", "caption");
    
        h4 = document.createElement("h4");
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode(shop.value.name));
        h4.appendChild(a);
        divCap.appendChild(h4);
        
        p = document.createElement("p");
        p.appendChild(document.createTextNode("Dirección: "+shop.value.direction));
        divCap.appendChild(p);
        
        p = document.createElement("p");
        p.appendChild(document.createTextNode("Teléfono: "+shop.value.direction));
        divCap.appendChild(p);
        
        button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-primary");
    button.appendChild(document.createTextNode("Ver Productos"));
        button.addEventListener("click", shopPopulate(shop.value));
        divCap.appendChild(button);
        
        
        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        divSct1.appendChild(divCol);

        shop = shops.next();
    }
}

function shopsMenusPopulate (erp){
    var ul = document.getElementById("navShop");   
    var shops = erp.shops;
    var shop = shops.next();
    
    while (shop.done !== true){
        var li = document.createElement("li");
        
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode(shop.value.name));
        
        li.appendChild(a);
        ul.appendChild(li);

        shop = shops.next();
    }
}

function removeChildsElement(element){

    for(var i=element.children.length-1; i>-1; i--){
        element.removeChild(element.children[i]);
    }
}

function shopPopulate(shop){
    return function(){
        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);
        
        for(var i=0; i<shop.products.length; i++){
            divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

            divThumb = document.createElement("div");
            divThumb.setAttribute("class", "thumbnail");

            img = document.createElement("img");
            img.setAttribute("src", "http://placehold.it/320x150");
            divThumb.appendChild(img);

            divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            h4 = document.createElement("h4");
            a = document.createElement("a");
            a.setAttribute("href", "#");
            a.appendChild(document.createTextNode(shop.products[i].product.name));

            h4.appendChild(a);
            divCap.appendChild(h4);

            h4price = document.createElement("h4");
            h4price.setAttribute("class", "pull-right");
            h4price.appendChild(document.createTextNode(shop.products[i].product.price+" €"));
            divCap.appendChild(h4price);

            p = document.createElement("p");
            p.appendChild(document.createTextNode(shop.products[i].product.description));
            divCap.appendChild(p);

            p = document.createElement("p");
            p.appendChild(document.createTextNode("Tax: "+shop.products[i].product.tax));
            divCap.appendChild(p);

            divThumb.appendChild(divCap);
            divCol.appendChild(divThumb);
            divSct1.appendChild(divCol);
        }
     }
}

function menuCategoryShopPopulate(shop, erp){
    var categoriesShop = [];
    var name;
    var cat = document.getElementById("listCategories");
       
    for (var i=0; i<shop.products.length; i++){
        name = productCategory(shop.products[i], erp);
        
        if (name != -1){
            categoriesShop.push(name)
        }
    }
    
    for (var i=0; i<categoriesShop.length; i++){
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(categoriesShop[i]));
        cat.appendChild(a);
    }
      
}

function productCategory(product, erp){
    
        function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
    
        var categories = sh.categories;
        var category = categories.next();
        var index = -1;
        var name;
        
        while (category.done !== true && index == -1 ){
            
           index = category.value.products.findIndex(compareElements);          
           if (index != -1){
                return category.value.title;
           }
            category = categories.next();
        }
    
        return -1;
}

function productsCategoryShopPopulate(erp, shop, category){
    
    function compareElements(element){
			return (element.serialNumber === shop.products[i].serialNumber)
	}
    
    var productsCategory = [];
    var index;
        
    for (var i=0; i<shop.products.length; i++){
        index = category.products.findIndex(compareElements);
        
        if (index != -1){
                console.log(shop.products[i].product.name);
                productsCategory.push(shop.products[i]);
                
        }
    }
    
    var divSct1 = document.getElementById("sct1");
    
    for(var i=0; i<productsCategory.length; i++){
        divCol = document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");
        
        divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");
        
        img = document.createElement("img");
        img.setAttribute("src", "http://placehold.it/320x150");
        divThumb.appendChild(img);
        
        divCap = document.createElement("div");
        divCap.setAttribute("class", "caption");
    
        h4 = document.createElement("h4");
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.appendChild(document.createTextNode(productsCategory[i].product.name));
        h4.appendChild(a);
        divCap.appendChild(h4);
        
        h4price = document.createElement("h4");
        h4price.setAttribute("class", "pull-right");
        divCap.appendChild(h4price);
        
        p = document.createElement("p");
        p.appendChild(document.createTextNode(productsCategory[i].product.description));
        divCap.appendChild(p);
        
        p = document.createElement("p");
        p.appendChild(document.createTextNode("Tax: "+productsCategory[i].product.tax));
        divCap.appendChild(p);
        
        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        divSct1.appendChild(divCol);
    }
    
}

function productShopPopulate(erp, shop, product){
        var sect2 = document.getElementById("prod-info");
        
        function compareElements(element){
            console.log(element.serialNumber);
            console.log(product.serialNumber);
			return (element.serialNumber === product.serialNumber)
		}
        var products = erp.getShopProducts(shop);
		var index = products.findIndex(compareElements);
        
        var node = document.createElement("article");
        var par = document.createElement("p");
        var textnode = document.createTextNode(products[index].product.toString()+products[index].stock);
        
        par.appendChild(textnode);
        node.appendChild(par);
        sect2.appendChild(node);
     
}



function globalProductPopulate(product){
    
}

        var sh = new StoreHouse();
        sh.name = "Test";
        var cat1 = new Category("Ropa");
        cat1.description = "Todo tipo de ropa";
        var cat2 = new Category("Tecnología");
        cat2.description = "Todo tipo de aparato electrónico";
        var cat2 = new Category("Musica");
        cat2.description = "Todo lo relacionado con musica";
        var pro1 = new Product(1111, "Camiseta", 19.99);; 
        var pro2 = new Product(2222, "Portatil", 321.99);
        var pro3 = new Product(3333, "Zapatos", 27.99);; 
        var coor1 = new Coords(14, 68);
        var shop1 = new Shop(1234, "shirtShop", coor1);
        var shop2 = new Shop(4321, "tecnoShop", coor1);
        var shop3 = new Shop(5321, "SportShop", coor1);
        var sh = new StoreHouse();
        var book = new Book(4444, "ESDLA", 20, 576);
        var tv = new TV(5555, "TV1", 1450, 48);
        
        sh.addShop(shop1);
        sh.addShop(shop2);
        sh.addShop(shop3);
        sh.addProduct(pro1, cat1);
        sh.addProduct(pro2, cat2);
        sh.addProductInShop(pro1, shop1);
        sh.addProductInShop(pro2, shop1);

    
        initPopulate(sh);
        shopsMenusPopulate(sh);
        //shopPopulate(shop1);
        //menuCategoryShopPopulate(shop1, sh);
        //productsCategoryShopPopulate(sh, shop1, cat2);


    