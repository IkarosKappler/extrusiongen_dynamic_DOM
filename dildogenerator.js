/**
 * This is the new Dildo-Generator main script file.
 *
 * It is called before anything else happens in the dildo generator and
 * it loads the whole dildo generator DOM structure using jQuery.
 *
 * If jQuery is not present it is tried to be loaded.
 *
 *
 * @author  Ikaros Kappler
 * @date    2015-02-02
 * @version 1.0.0
 **/

var dildogenerator = {};
dildogenerator.PATH_TO_JQUERY = "jquery-1.11.2.js";
//dildogenerator.PATH_TO_JQUERY = "test.js"; 

/**
 * This function is the FIRST function to be called directly after the
 * static (!) DOM is loaded from the HTML file.
 **/
dildogenerator.init = function() {
    dildogenerator.installJQuery( dildogenerator.initDOM );
    //dildogenerator.initDOM();
};

dildogenerator.jQueryInstalled = function() {
    return window.jQuery;
};

/**
 * This function loads the jQuery library if it is not already present.
 * The returned boolean indicates if jQuery was already loaded before.
 **/
dildogenerator.installJQuery = function( callback ) {

    if( !dildogenerator.jQueryInstalled() ) {
	var jq      = document.createElement("script");
	jq.async    = true;
	jq.setAttribute( "language", "Javascript" );
	jq.setAttribute( "type",     "text/javascript" );


	if( jq.readyState ) { //IE
            script.onreadystatechange = function () {
                if( jq.readyState == "loaded" || jq.readyState == "complete" ) {
                    jq.onreadystatechange = null;
                    callback();
                }
            };
        } else { // Others
            jq.onload = function () {
                callback();
            };
        }

	// Path to jquery.js file, eg. Google hosted version
	jq.setAttribute( "src",      dildogenerator.PATH_TO_JQUERY );
	document.getElementsByTagName( "head" )[0].appendChild( jq );

	return false;
    } else {
	
	return true;
    }    
}



dildogenerator.initDOM = function() {

    if( !dildogenerator.jQueryInstalled() ) {
	var errmsg = "Failed to load jQuery. Is your path correct? (" + dildogenerator.PATH_TO_JQUERY + ")";
	console.log( errmsg );
	throw errmsg;
    }


    var dg_container = $("#dildogenerator_container");
    /*
    var div = $( "<div/>",
		 { 'class'    : 'yourclass',
                     "id"       : "menu_bar",
		     "style"    : "z-index: 1001",
                   html       : 'DAS IST EIN TOLLER TEST'
		 } 
	       ); 
    */
    
    var menu_bar = $( "<div/>",
		      { // 'class'    : 'yourclass',
			  "id"       : "menu_bar",
			  "style"    : "z-index: 1001"
		      } 
		    );

    var menuList_model   = null;
    var menuItem_model   = $( "<div/>",
			      { "id"      : "dropdown-holder" } 
			    ).append( $( "<ul/>",
					 { "id"    : "nav",
					   "class" : "dropdown"
					 } ).append( $( "<li/>",
							{ "class"  : "heading" }
						      ).append( $( "<a/>", { "href" : "#" } ).text( "MODEL" ) ).append( menuList_model = $("<ul/>") ) ) );
    //var menuList_model  = $( "<ul/>" );
    //menuItem_model.append( menuList_model );
    
    
    // Populate 'Model->New' item
    menuList_model.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
										  "onclick": "newScene()",
										  "html": "New" 
							   } ) ) );
    if( typeof _DILDO_PRESETS != "undefined" )
	dildogenerator.populate_dildo_presets_menu( _DILDO_PRESETS );
    
    if( true ) { //_DILDO_CONFIG && !_DILDO_CONFIG.HIDE_SAVE_FILE_ITEM ) {
	// Populate 'Model->Save' item
	menuList_model.append( $( "<li/>" ).
				       append( $( "<a/>", { "href" : "#",
										      "onclick": "exportZIP()",
										      "html": "Save (*.zip)" +
										               "<form name=\"zip_form\">\n" +
										               "<input type=\"hidden\" name=\"compress_zip\" value=\"0\" />\n" +
										               "</form>\n"
							  } ) ) );
    }

    if( true ) { //_DILDO_CONFIG && !_DILDO_CONFIG.HIDE_LOAD_FILE_ITEM ) {
	// Populate 'Model->Load' item
	menuList_model.append( $( "<li/>" ).
				       append( $( "<form/>",
						  { "name"   : "zip_import_form" } ).
					       append( $( "<a/>", { "href" : "#", 
								    "html" :  "Load (*.zip)" } )
						     ).
					       append( $( "<div/>", { "class"   : "open_file_menu_div" } ).
						       append( $( "</input>", { "type"     : "file",
										"name"     : "zip_upload_file",
										"accept"   : "application/zip",
										"class"    : "open_file_menu_input",
										"onchange" : "importZIP();" } )
							     ) ) ) );
								  
						   
						    
    }

    if( true ) { // _DILDO_CONFIG && !_DILDO_CONFIG.HIDE_EXPORT_MESH_MENU ) {
	var export_menu = $( "<li/>" );
	export_menu.append( $( "<a/>", { "href"  : "#",
					 "class" : "popout",
					 "html"  : "Export Mesh &gt;" } ) );
	export_menu.append( $( "<ul/>" ).
			    append( $( "<li/>" ).
				    append( $( "<a/>", { "href"    : "#",
							 "onclick" : "exportSTL()",
							 "html"    : "Surface Tesselation (*.stl)" } ) ) ).
			    append( $( "<li/>" ).
				    append( $( "<a/>", { "href"    : "#",
							 "onclick" : "exportOBJ()",
							 "html"    : "Wavefront File (*.obj)" } ) ) )
			  );
	
	menuList_model.append( export_menu );
				     
    }

    
    if( true ) { // _DILDO_CONFIG && !_DILDO_CONFIG.HIDE_PUBLISH_MESH_MENU ) {

	menuList_model.append( $( "<li/>" ).
			       append( $( "<a/>", { "href"    : "#",
						    "onclick" : "publishDildoDesign()",
						    "html"    : "Publish ..."
						  } 
					)
				     )
			     );
			     
	    

    }

    // Populate "Model->Save Shape" item
    menuList_model.append( $( "<li/>" ).
			   append( $( "<a/>", { "href"    : "#",
						"onclick" : "saveShape();",
						"html"    : "Export Shape (*.json)" }
				    )
				 )
			 );
    // Populate "Model->Load Shape" item
    menuList_model.append( $( "<li/>" ).
			   append( $( "<form/>", { "name"   : "bezier_file_upload_form" } ).
				   append( $( "<a/>", { "href"  : "#",
							"html"  : "Import Shape (*.json)" } ) 
					 ).
				   append( $( "<div/>", { "class" : "open_file_menu_div" } ).
					   append( $( "<input/>",  { "type"     : "file",
								     "name"     : "bezier_json_file",
								     "accept"   : "application/zip",
								     "class"    : "open_file_menu_input",
								     "onchange" : "loadShape();" }
						    )
						 )
					 )
				 )
			 );
						
				      


    menu_bar.append( menuItem_model );
    dg_container.append( menu_bar );
							    
};

dildogenerator.populate_dildo_presets_menu = function( _presets ) {
    // ...
    // TODO
};
