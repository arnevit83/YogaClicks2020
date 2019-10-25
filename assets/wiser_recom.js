var oursite="https://wiser.expertvillagemedia.com/";
var phandle = pId= ShopId=PageName=CollecId="";

if(document.currentScript && document.currentScript.getAttribute("data-productid")!=null){var pId=document.currentScript.getAttribute("data-productid");}
if(document.currentScript && document.currentScript.getAttribute("data-page")!=null){var PageName=document.currentScript.getAttribute("data-page");}
if(document.currentScript && document.currentScript.getAttribute("data-shop-id")!=null){var ShopId=document.currentScript.getAttribute("data-shop-id");}
if(document.currentScript && document.currentScript.getAttribute("data-collectid")!=null){var CollecId=document.currentScript.getAttribute("data-collectid");}
 //recent cookies
var evm_recent_cookie=getCookie("evm_recent_products");
eraseCookie("wiserrecomm");
if(PageName.indexOf("product")>=0){PageName="product";}
if(PageName=="index" || PageName=="collection" || PageName=="product" || PageName=="cart" || PageName!=""){
    /*if(document.getElementsByClassName("snippetsHTML")[0] != undefined){
    	document.getElementsByClassName("snippetsHTML")[0].insertAdjacentHTML("beforeBegin","<div class='loader'></div>");
    }*/	
    var http = new XMLHttpRequest();
	var url = oursite+"app/embed_recentpro";
	var data = new FormData();
	data.append('pId', pId);
	data.append('ShopId', ShopId);
	data.append('PageName', PageName);
	data.append('CollecId', CollecId);
	data.append('evm_recent_cookie', evm_recent_cookie);
	data.append('PageName', PageName);
	http.open('POST', url, true);
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			var data = JSON.parse(http.responseText);
			var widget_version = data['widget_version'];
			if(widget_version == "1"){
				/****WIser style.css ***/
				var x = document.createElement("LINK");
				x.setAttribute("rel", "stylesheet");
				x.setAttribute("type", "text/css");
				x.setAttribute("href", oursite+"assets/css/wiser_style.css"); 	
				document.head.appendChild(x);
				/****WIser style.css ***/
			}
			if(PageName == 'thank_you'){
				var x = document.createElement("LINK");
				x.setAttribute("rel", "stylesheet");
				x.setAttribute("type", "text/css");
				x.setAttribute("href", "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");    	
				document.head.appendChild(x);
				if(widget_version == "2"){
				    var x = document.createElement("LINK");
					x.setAttribute("rel", "stylesheet");
					x.setAttribute("type", "text/css");
					x.setAttribute("href", "https://d3emlu4sl5epij.cloudfront.net/evmshopifyapps/wiser/evm.slider.min.css");    	
					document.head.appendChild(x);
					var x = document.createElement("LINK");
					x.setAttribute("rel", "stylesheet");
					x.setAttribute("type", "text/css");
					x.setAttribute("href", "https://d3emlu4sl5epij.cloudfront.net/evmshopifyapps/wiser/evm.theme.default.min.css");    	
					document.head.appendChild(x);
				}else{
				    var x = document.createElement("LINK");
					x.setAttribute("rel", "stylesheet");
					x.setAttribute("type", "text/css");
					x.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css");    	
					document.head.appendChild(x);
					var x = document.createElement("LINK");
					x.setAttribute("rel", "stylesheet");
					x.setAttribute("type", "text/css");
					x.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.theme.default.min.css");    	
					document.head.appendChild(x);
				}	
				var divs=data['display_main_divs'];
				if(divs != ""){
					divs = divs.split(",");
					for (var i = 0; i < divs.length; i++) {

					  	document.getElementsByClassName("main__content")[0].insertAdjacentHTML("afterend","<div class='"+divs[i]+" snippetsHTML'></div>"); 
					} 
	
				}	
			}
			Jsoncallback(data);
		}
	} 
    http.send(data);

}
if (screen.width == 375) {
	//for iphoneX
	var meta = document.createElement('meta');
	meta.name = "viewport";
	meta.content = "width=device-width, initial-scale=0, user-scalable=no";
	document.getElementsByTagName('head')[0].appendChild(meta);
}	
function Jsoncallback(data){
	if(!sessionStorage.getItem(ShopId+"_"+PageName)){sessionStorage.setItem(ShopId+"_"+PageName, array2json(data));}
	if(data!=""){
		if(data['status']!="false"){
			if(data['widget_version'] == '2' && data['template']!= ''){
				var x = document.createElement("LINK");
			    x.setAttribute("rel", "stylesheet");
			    x.setAttribute("type", "text/css");
			    x.setAttribute("href", oursite+'assets/evm_backend/css/widget_'+data['template']+'.css');    	
			    document.head.appendChild(x);
				
			}
			
			
			if(data["recommended_products"]!="" && document.getElementsByClassName("evm-recommended-products")[0]){
					document.getElementsByClassName("evm-recommended-products")[0].outerHTML="<div class='evm_visible_text'>"+data["recommended_products"]+ "</div>";}
			if(data["recentlyviewed"]=="true" && document.getElementsByClassName("recently-viewed")[0] != undefined && evm_recent_cookie != null)
			{
					var elems= document.getElementsByClassName("recently-viewed")[0].style.display = 'block';
					if(data['widget_version'] == '2' || (data['widget_version'] == '1' && PageName == 'thank_you' )){
						document.getElementsByClassName("recently-viewed")[0].outerHTML="<div class='evm_visible_text'>"+data["evmrecents"]+ "</div>";
					}
			}else if(document.getElementsByClassName("recently-viewed")[0] != undefined){
				var elems= document.getElementsByClassName("recently-viewed")[0].style.display = 'none';
					
			}


			
			if(data["newarrivals"]!="" && document.getElementsByClassName("evm-new-arrivals-product")[0]){
			document.getElementsByClassName("evm-new-arrivals-product")[0].outerHTML="<div class='evm_visible_text'>"+data["newarrivals"]+"</div>";}
			if(data["featuredcollections"]!="" && document.getElementsByClassName("evm-featured-collections-product")[0]){
			document.getElementsByClassName("evm-featured-collections-product")[0].outerHTML="<div class='evm_visible_text'>"+data["featuredcollections"]+"</div>";}
			if(data["mostpopular"]!="" && document.getElementsByClassName("evm-most-popular-products")[0]){
			document.getElementsByClassName("evm-most-popular-products")[0].outerHTML="<div class='evm_visible_text'>"+data["mostpopular"]+"</div>";}
			if(data["trendingproducts"]!="" && document.getElementsByClassName("trending-products")[0]){				
			document.getElementsByClassName("trending-products")[0].outerHTML="<div class='evm_visible_text'>"+data["trendingproducts"]+"</div>";					
			}
			if(data["relatedproduct"]!="" && document.getElementsByClassName("evm-related-product")[0]){
				document.getElementsByClassName("evm-related-product")[0].outerHTML="<div class='evm_visible_text'>"+data["relatedproduct"]+"</div>";	}
			
			if(!window.jQuery){	
				var jqcall=document.createElement('script');
				jqcall.src= "https://code.jquery.com/jquery-2.2.4.min.js"
				document.getElementsByTagName('head')[0].appendChild(jqcall);
			}	

			if(data["alsobought"]!="" && document.getElementsByClassName("evm-also-bought-products")[0]){
				var x = document.createElement("LINK");
				x.setAttribute("rel", "stylesheet");
				x.setAttribute("type", "text/css");
				x.setAttribute("href", oursite+"assets/evm_backend/css/widget_alsobought_template1.css");    	
				document.head.appendChild(x);
				if(data['alsobought_template'] != 'widget_design'){
					document.querySelectorAll('.evm-also-bought-products').forEach(function(a) {
					  a.remove()
					})
					$("#shopify-section-product-template").after("<div class='evm-also-bought evm_visible_text'>"+data["alsobought"]+"</div>"); 
				}else{
					document.getElementsByClassName("evm-also-bought-products")[0].outerHTML="<div class='evm_visible_text'>"+data["alsobought"]+"</div>";
			
				}	

			}
			if(data["product_view"]=="owl-carousel" || data["product_view"]=="wiser-carousel" || data["product_view"]=="slider"){
				var widget_version = data['widget_version'];
				var products_per_slider = data['widget_version'] == "2" ? data['products_per_slider'] : "";
				
				setTimeout(function(){
						var slidecall=document.createElement('script');
						slidecall.src= oursite+"assets/js/slider.js";
						slidecall.setAttribute("products_per_slider", products_per_slider);
						slidecall.setAttribute("widget_version", widget_version);
						slidecall.setAttribute("page_name", PageName);
						//slidecall.src="https://res.cloudinary.com/drujz6cwl/raw/upload/v1559728297/wiser/frontend/slider.js";
						document.getElementsByTagName('head')[0].appendChild(slidecall);
						//$(".loader").hide();
						$(".evm_wiser_heading,.evm_visible_text").show();
						evmWiserProductClick();
				},1500);
			}else{
				setTimeout(function(){
					$(".evm_wiser_heading ,.evm_visible_text").show();
					evmWiserProductClick();
				},2000);
			}	

		}else if(data['status']=="false" && data['pending']!="false"){
			//setCookie("wispending","true",20)
		}
	}
}
var getJSON = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
              var status = xhr.status;
              if (status === 200) {
                callback(null, xhr.response);
              } else {
                callback(status, xhr.response);
              }
            };
            xhr.send();
        }; 
function array2json(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');
    for(var key in arr) {
    	var value = arr[key];
        if(typeof value == "object") { //Custom handling for arrays
            if(is_list) parts.push(array2json(value)); /* :RECURSION: */
            else parts.push('"' + key + '":' + array2json(value)); /* :RECURSION: */
            //else parts[key] = array2json(value); /* :RECURSION: */            
        } else {
            var str = "";
            if(!is_list) str = '"' + key + '":';
            //Custom handling for multiple data types
            if(typeof value == "number") str += value; //Numbers
            else if(value === false) str += 'false'; //The booleans
            else if(value === true) str += 'true';
            else str += '"' + value + '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)
            parts.push(str); }
    }
    var json = parts.join(",");    
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json + '}';//Return associative JSON
}
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();   }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) { document.cookie = name+'=; Max-Age=-99999999;';}

function evmWiserProductClick(){
	$( ".checkurl" ).click(function(event) {
	  		event.preventDefault();
	  		var widget=$(this).attr("wiser-widget");
			var template=$(this).attr("wiser-template");
			var addtocart=$(this).attr("wiser-addcart");
			addtocart = addtocart == undefined ? 0 : 1;
        	if($(this).attr("data_id")){
              var pid=$(this).attr("data_id");
            }else{
              var pid=$(this).attr("data-id");
            }
            pid = parseInt(pid);
            var siteurl= $(this).attr("href")
            evmProductClickProcess(pid,'yes',siteurl,"",widget,template,addtocart);
            
	});
}

function evmProductClickProcess(proid,is_redirect,siteurl="",multiple="",widget="",template="",addtocart=0){
	
	if(multiple == "yes"){
		var parray = proid;
	}else{
		var parray = new Array();
		parray[0] = proid;
	}	
	for (i = 0; i < parray.length; i++) {
		var pid=parray[i];
		if(localStorage.getItem("evm_wiser_productids")==undefined){
			var productIds = [];
			var evm_wiser_page = [];
			var evm_wiser_template = [];
			var evm_wiser_widget = [];
			var evm_add_to_cart = [];
	        productIds.push(pid);
	        evm_wiser_page.push(PageName);
	        evm_wiser_template.push(template);
	        evm_wiser_widget.push(widget);
	        evm_add_to_cart.push(addtocart);
	    }else{
	    	var productIds = localStorage.getItem("evm_wiser_productids");
	    	productIds = JSON.parse(productIds);
	    	var evm_wiser_page = localStorage.getItem("evm_wiser_page");
	    	evm_wiser_page = JSON.parse(evm_wiser_page);
	    	var evm_wiser_template = localStorage.getItem("evm_wiser_template");
	    	evm_wiser_template = JSON.parse(evm_wiser_template);
	    	var evm_wiser_widget = localStorage.getItem("evm_wiser_widget");
	    	evm_wiser_widget = JSON.parse(evm_wiser_widget);
	    	var evm_add_to_cart = localStorage.getItem("evm_add_to_cart");
	    	evm_add_to_cart = JSON.parse(evm_add_to_cart);
	    	
	    	var index = productIds.indexOf(pid);
	    	if(index == -1)
	    	{
		    	productIds.push(pid);
	        	evm_wiser_page.push(PageName);
	        	evm_wiser_template.push(template);
	        	evm_wiser_widget.push(widget);
	        	evm_add_to_cart.push(addtocart);
		    }else{
		    	productIds[index] = pid ;
	        	evm_wiser_page[index] = PageName ;
	        	evm_wiser_template[index] =  template;
	        	evm_wiser_widget[index] = widget ;
	        	evm_add_to_cart[index] = addtocart ;
		    }    
	    }
	    if(productIds.length > 0){
			localStorage.setItem("evm_wiser_productids",JSON.stringify(productIds));
			localStorage.setItem("evm_wiser_page",JSON.stringify(evm_wiser_page));
			localStorage.setItem("evm_wiser_template",JSON.stringify(evm_wiser_template));
			localStorage.setItem("evm_wiser_widget",JSON.stringify(evm_wiser_widget));
			localStorage.setItem("evm_add_to_cart",JSON.stringify(evm_add_to_cart));
			
		}
	}    
    
    var url=oursite+"app/embed_clicks?shop="+Shopify.shop+"&clicks=1&pagename="+PageName+"&addtocart="+addtocart;
	var clickscall=document.createElement('script');
	clickscall.src=url
	document.getElementsByTagName('body')[0].appendChild(clickscall);
	if(is_redirect == 'yes'){
		window.location.href=siteurl;
	}	
}

function evm_addtocart(redirect,product_id,random,event,widget,template){
	var addtocart=1;
	var qty = $(".evm_wiser_qty_"+product_id+"_"+random).val();
    var varid = $(".evm_wiser_product_"+product_id+"_"+random).val();
    evmProductClickProcess(product_id,'no',"","",widget,template,addtocart);
    var xhr = new XMLHttpRequest();
        xhr.open('POST', "/cart/add.js", true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function() {
          var status = xhr.status;
          if (status === 200) {
          		if(redirect == "true"){
          			window.location.href = "https://"+ShopId+"/cart";
          		}else{
          			$(".ws-card_success_"+random).html('Added to cart!</br><a href="/cart">View cart</a> or <a href="/collections/all">Continue shopping</a>.');
          			setTimeout(function(){ $(".ws-card_success_"+random).html(""); }, 3000);
          		}
          } 
        };
        
        xhr.send(JSON.stringify({quantity:qty, id:varid}));
}
function evm_alsobought_addtocart(event,widget,template){
	var string="";
	var addtocart=1;
	var i=0;
	getJSON('/cart.js',function(err, cart) {
        var newArr = {};
        for (key = 0, len = cart.items.length; key < len; ++key) {
           var pid =  cart.items[key]['variant_id'];
           var quantity = cart.items[key]['quantity'];
           newArr[pid] = quantity;
           
        }
        //console.log("meghna");
        //console.log(newArr);
        var product_array = [];
        $(".evm_alsobought_wiser_product").each(function() {
        	var pid = $(this).attr("bought_product");
        	pid = parseInt(pid);
        	var varid = $(this).val();
			var qunt = 1;
			if(varid in newArr) {      // true
			   qunt = 1+newArr[varid];  // >> value
			}
			if(i > 0){
				string += "&";
				
			}
			string += 'updates['+varid+']='+qunt;
			product_array.push(pid);
		    i++;
		});	
		evmProductClickProcess(product_array,'no',"","yes",widget,template,addtocart);
		jQuery.post('/cart/update.js',
		  string
		);
		$("#ws-card_success-also-bought").html('<i class="fa fa-check"></i> Added to cart!</br><a href="/cart">View cart</a> or <a href="/collections/all">Continue shopping</a>.');
		setTimeout(function(){ $("#ws-card_success-also-bought").html(""); }, 3000); 
	});        
}


