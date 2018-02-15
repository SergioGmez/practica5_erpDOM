"use strick";

function createObjects(sh){
    
    var cat1 = new Category("Ropa");
    cat1.description = "Todo tipo de ropa";
    var cat2 = new Category("Tecnología");
    cat2.description = "Todo tipo de aparato electrónico";
    var cat3 = new Category("Libros");
    cat3.description = "Todo lo relacionado con la lectura";
    
   var pro1 = new Product(1111, "Camiseta", 19.99);
   var pro2 = new Product(2222, "Portatil", 321.99)
   var pro3 = new Product(3333, "Zapatos", 27.99);
   var pro4 = new Product(4444, "Vaqueros", 16.99);
   var pro5 = new Product(5555, "Movil", 189.49);
   var book = new Book(6666, "ESDLA", 20, 576);
   var tv = new TV(7777, "TV1", 1450, 48);
    
   var coor1 = new Coords(14, 68);
   var shop1 = new Shop(1234, "Shop1", coor1);
   var shop2 = new Shop(4321, "Shop2", coor1);
   var shop3 = new Shop(6221, "Shop3", coor1);
        
   sh.addProduct(pro1, cat1);
   sh.addProduct(pro3, cat1);
   sh.addProduct(pro4, cat1);
   sh.addProduct(pro2, cat2);
   sh.addProduct(pro5, cat2);
   sh.addProduct(book, cat3);
   sh.addProduct(tv, cat2);
    
   sh.addProductInShop(pro1, shop1, 32);
   sh.addProductInShop(pro1, shop2, 44);
   sh.addProductInShop(pro2, shop1, 55);
   sh.addProductInShop(pro2, shop2, 66);
   sh.addProductInShop(pro3, shop3, 32);
   sh.addProductInShop(pro3, shop1, 23);
   sh.addProductInShop(pro4, shop1, 34);
   sh.addProductInShop(pro4, shop2, 11);
   sh.addProductInShop(pro4, shop3, 13);
   sh.addProductInShop(pro5, shop2, 61);  
   sh.addProductInShop(book, shop1, 31);  
   sh.addProductInShop(tv, shop1, 11);  
   sh.addProductInShop(tv, shop2, 4);  
}

function init(sh){
    var initPop = initPopulate(sh);
    initPop();
    shopsMenusPopulate(sh);   
}

function initPopulate(sh){
    return function(){
        var shops = sh.shops;
        var shop = shops.next();
        var divSct1 = document.getElementById("sct1");
        var cat = document.getElementById("listCategories");
    
        document.getElementById("catMenu").style.visibility = "hidden";
        
        removeChildsElement(cat);
        removeChildsElement(divSct1);

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
            button.setAttribute("class", "btn btn-primary pull-right");
            button.appendChild(document.createTextNode("Ver Productos"));
            button.addEventListener("click", shopPopulate(shop.value, sh));
            divCap.appendChild(button);


            divThumb.appendChild(divCap);
            divCol.appendChild(divThumb);
            divSct1.appendChild(divCol);

            shop = shops.next();
        }
    }    
}

function shopsMenusPopulate (erp){
    
    var ini = document.getElementsByClassName("navbar-header");
    var ul = document.getElementById("navShop");   
    var shops = erp.shops;
    var shop = shops.next();
    
    ini[0].addEventListener("click", initPopulate(erp));
    
    while (shop.done !== true){
        var li = document.createElement("li");
        
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.addEventListener("click", shopPopulate(shop.value, erp));
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

function shopPopulate(shop, erp){
    return function(){
        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);
        
        for(var i=0; i<shop.products.length; i++){
           productShopPopulate(divSct1, shop.products[i]); 
        }
        menuCategoryShopPopulate(shop, erp);
   }
}

function menuCategoryShopPopulate(shop, erp){
    
    function compareCategories(element){
			return (element.title === category.title)
	}
    
    var categoriesShop = [];
    var category;
    var cat = document.getElementById("listCategories");
    
    removeChildsElement(cat);
    
    document.getElementById("catMenu").style.visibility = "visible";
       
    for (var i=0; i<shop.products.length; i++){
        category = productCategory(shop.products[i], erp);
        categoryRep = categoriesShop.findIndex(compareCategories);
        
        if (category != -1 && categoryRep == -1){
            categoriesShop.push(category);
        }
    }
    
    for (var i=0; i<categoriesShop.length; i++){
        a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(categoriesShop[i].title));
        a.addEventListener("click", productsCategoryShopPopulate(erp, shop, categoriesShop[i]));
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
                return category.value;
           }
            category = categories.next();
        }
    
        return -1;
}

function productsCategoryShopPopulate(erp, shop, category){
    return function(){
        function compareElements(element){
                return (element.serialNumber === shop.products[i].serialNumber)
        }

        var productsCategory = [];
        var index;

        for (var i=0; i<shop.products.length; i++){
            index = category.products.findIndex(compareElements);

            if (index != -1){
                productsCategory.push(shop.products[i]);
            }
        }

        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);

        for(var i=0; i<productsCategory.length; i++){
            productShopPopulate(divSct1, productsCategory[i]);
        }
    }
}

function productShopPopulate(element, product){
    
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
        h4.appendChild(document.createTextNode(product.product.name));
        divCap.appendChild(h4);

        h4price = document.createElement("h4");
        h4price.setAttribute("class", "pull-right");
        h4price.appendChild(document.createTextNode(product.product.price+" €"));
        divCap.appendChild(h4price);

        p = document.createElement("p");
        p.appendChild(document.createTextNode(product.product.description));
        divCap.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Tax: "+product.product.tax));
        divCap.appendChild(p);

        a = document.createElement("a");
        a.appendChild(document.createTextNode("Ver info general"));
        a.setAttribute("class", "pull-right");
        a.addEventListener("click", globalProductPopulate(product.product))
        divCap.appendChild(a);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Stock: "+product.product.stock));
        divCap.appendChild(p);

        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        element.appendChild(divCol); 
}

function globalProductPopulate(product){
    return function(){
		alert(product.toString());
	} 
}


 var sh = new StoreHouse();
 sh.name = "Test";

 createObjects(sh);
 window.onload = init(sh);
        
    