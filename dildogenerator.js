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

    // Check if jQuery is already installed
    if( !dildogenerator.jQueryInstalled() ) {
	var jq      = document.createElement("script");
	jq.async    = true;
	jq.setAttribute( "language", "Javascript" );
	jq.setAttribute( "type",     "text/javascript" );


	// Wait for the jQuery library to be loaded
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
	jq.setAttribute( "src", dildogenerator.PATH_TO_JQUERY );
	document.getElementsByTagName( "head" )[0].appendChild( jq );

	return false;
    } else {
	
	return true;
    }    
}


/**
 * This function initializes the DOM structure using jQuery.
 **/
dildogenerator.initDOM = function() {

    if( !dildogenerator.jQueryInstalled() ) {
	var errmsg = "Failed to load jQuery. Is your path correct? (" + dildogenerator.PATH_TO_JQUERY + ")";
	console.log( errmsg );
	throw errmsg;
    }


    var dg_container = $("#dildogenerator_container");

    
    dildogenerator._initMenubarDOM( dg_container );

};

/**
 * This (sub) function initializes the the menubar DOM structure.
 **/
dildogenerator._initMenubarDOM = function( dg_container ) {
    var menu_bar = $( "<div/>",
		      {   "id"       : "menu_bar",
			  "style"    : "z-index: 1001"
		      } 
		    );
    
    dildogenerator._initMenubarDOM_model( menu_bar );
    dildogenerator._initMenubarDOM_3Dprint( menu_bar );
    dildogenerator._initMenubarDOM_help( menu_bar );
    dg_container.append( menu_bar );
};

/**
 * This (sub) function initializes the DOM structure for the 'Model' menu bar entry.
 **/
dildogenerator._initMenubarDOM_model = function( menu_bar ) {

    var menuList_model   = null;
    var menuItem_model   = $( "<div/>",
			      { "id"      : "dropdown-holder" } 
			    ).append( $( "<ul/>",
					 { "id"    : "nav",
					   "class" : "dropdown"
					 } ).append( $( "<li/>",
							{ "class"  : "heading" }
						      ).append( $( "<a/>", { "href" : "#" } ).text( _DILDOGEN_LANG.get(["menubar","model","_heading"],"Model") ) ).append( menuList_model = $("<ul/>") ) ) );
    
    
    // Populate 'Model->New' item
    menuList_model.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
										  "onclick": "newScene()",
										  "html": _DILDOGEN_LANG.get(["menubar","model","item_newFile"],"New") 
							   } ) ) );
    if( typeof _DILDO_PRESETS != "undefined" )
	dildogenerator.populate_dildo_presets_menu( menuList_model, _DILDO_PRESETS );
    
    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_SAVE_FILE_ITEM ) {
	// Populate 'Model->Save' item
	menuList_model.append( $( "<li/>" ).
				       append( $( "<a/>", { "href" : "#",
										      "onclick": "exportZIP()",
										      "html": _DILDOGEN_LANG.get(["menubar","model","item_saveFile"],"Save (*.zip)") +
										               "<form name=\"zip_form\">\n" +
										               "<input type=\"hidden\" name=\"compress_zip\" value=\"0\" />\n" +
										               "</form>\n"
							  } ) ) );
    }

    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_LOAD_FILE_ITEM ) {
	// Populate 'Model->Load' item
	menuList_model.append( $( "<li/>" ).
				       append( $( "<form/>",
						  { "name"   : "zip_import_form" } ).
					       append( $( "<a/>", { "href" : "#", 
								    "html" :  _DILDOGEN_LANG.get(["menubar","model","item_loadFile"],"Load (*.zip)") } )
						     ).
					       append( $( "<div/>", { "class"   : "open_file_menu_div" } ).
						       append( $( "</input>", { "type"     : "file",
										"name"     : "zip_upload_file",
										"accept"   : "application/zip",
										"class"    : "open_file_menu_input",
										"onchange" : "importZIP();" } )
							     ) ) ) );
								  
						   
						    
    }

    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_EXPORT_MESH_MENU ) {
	var export_menu = $( "<li/>" );
	export_menu.append( $( "<a/>", { "href"  : "#",
					 "class" : "popout",
					 "html"  : _DILDOGEN_LANG.get(["menubar","model","menu_exportMesh","_heading"],"Export Mesh &gt;") } ) );
	export_menu.append( $( "<ul/>" ).
			    append( $( "<li/>" ).
				    append( $( "<a/>", { "href"    : "#",
							 "onclick" : "exportSTL()",
							 "html"    : _DILDOGEN_LANG.get(["menubar","model","menu_exportMesh","item_exportSTL"],"Surface Tesselation (*.stl)") } ) ) ).
			    append( $( "<li/>" ).
				    append( $( "<a/>", { "href"    : "#",
							 "onclick" : "exportOBJ()",
							 "html"    : _DILDOGEN_LANG.get(["menubar","model","menu_exportMesh","item_exportOBJ"],"Wavefront File (*.obj)") } ) ) )
			  );
	
	menuList_model.append( export_menu );
				     
    }

    
    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_PUBLISH_MESH_MENU ) {

	menuList_model.append( $( "<li/>" ).
			       append( $( "<a/>", { "href"    : "#",
						    "onclick" : "publishDildoDesign()",
						    "html"    : _DILDOGEN_LANG.get(["menubar","model","item_publish"],"Publish ...")
						  } 
					)
				     )
			     );
			     
	    

    }

    // Populate "Model->Save Shape" item
    menuList_model.append( $( "<li/>" ).
			   append( $( "<a/>", { "href"    : "#",
						"onclick" : "saveShape();",
						"html"    : _DILDOGEN_LANG.get(["menubar","model","item_saveShape"],"Export Shape (*.json)") }
				    )
				 )
			 );
    // Populate "Model->Load Shape" item
    menuList_model.append( $( "<li/>" ).
			   append( $( "<form/>", { "name"   : "bezier_file_upload_form" } ).
				   append( $( "<a/>", { "href"  : "#",
							"html"  : _DILDOGEN_LANG.get(["menubar","model","item_loadShape"],"Import Shape (*.json)") } ) 
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
							    
};

/**
 * This (sub) function initializes the DOM structure for the '3D Print' menu bar entry.
 **/
dildogenerator._initMenubarDOM_3Dprint = function( menu_bar ) {

    var menuList_3dprint   = null;
    var menuItem_3dprint   = $( "<div/>",
				{ "id"      : "dropdown-holder" } 
			      ).append( $( "<ul/>",
					   { "id"    : "nav",
					     "class" : "dropdown"
					   } ).append( $( "<li/>",
							  { "class"  : "heading" }
							).append( $( "<a/>", { "href" : "#" } ).text( _DILDOGEN_LANG.get(["menubar","3dprint","_heading"],"3D PRINT") ) ).append( menuList_3dprint = $("<ul/>") ) ) );

    // Populate '3D Print->Order Print...' item
    menuList_3dprint.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							       "onclick": _DILDO_CONFIG.ORDER_PRINT_ACTION,
							       "html": _DILDOGEN_LANG.get(["menubar","3dprint","item_orderPrint"],"ORDER PRINT") 
							     } ) ) );


    menu_bar.append( menuItem_3dprint );
};

/**
 * This (sub) function initializes the DOM structure for the 'Help' menu bar entry.
 **/
dildogenerator._initMenubarDOM_help = function( menu_bar ) {

    var menuList_help   = null;
    var menuItem_help   = $( "<div/>",
			     { "id"      : "dropdown-holder" } 
			   ).append( $( "<ul/>",
					{ "id"    : "nav",
					  "class" : "dropdown"
					} ).append( $( "<li/>",
						       { "class"  : "heading" }
						     ).append( $( "<a/>", { "href" : "#" } ).text( _DILDOGEN_LANG.get(["menubar","help","_heading"],"HELP") ) ).append( menuList_help = $("<ul/>") ) ) );

    
    // Populate 'Interface' sub menu
    var interface_menu = $( "<li/>" );
    interface_menu.append( $( "<a/>", { "href"  : "#",
				     "class" : "popout",
				     "html"  : _DILDOGEN_LANG.get(["menubar","help","menu_interface","_heading"],"INTERFACE") } ) );
    interface_menu.append( $( "<ul/>" ).
			append( $( "<li/>" ).
				append( $( "<a/>", { "href"    : "#",
						     "onclick" : "exportSTL()",
						     "html"    : _DILDOGEN_LANG.get(["menubar","help","menu_interface","item_decreaseGUISize"],"SMALLER (-10%)") } ) ) ).
			append( $( "<li/>" ).
				append( $( "<a/>", { "href"    : "#",
						     "onclick" : "exportOBJ()",
						     "html"    : _DILDOGEN_LANG.get(["menubar","help","menu_interface","item_increaseGUISize"],"BIGGER (+10%)") } ) ) )
		      );
    
    menuList_help.append( interface_menu );

    
    // Populate the items ...
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							       "onclick": "open_faqs()",
							       "html": _DILDOGEN_LANG.get(["menubar","help","item_faq"],"FAQ") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "onclick": "open_faqs('general_publish')",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_howtoPublish"],"HOW TO PUBLISH?") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "http://www.dildo-generator.com/resources/Dildo_Slides_re-publica_20140507.pdf",
							    //"onclick": "",
							    target:  "_blank",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_makingADildoPDF"],"MAKING A DILDO (PDF)") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "onclick": "display_bezier_string()",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_displayBezierString"],"DISPLAY BEZIER STRING") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "onclick": "show_bezier_input_dialog()",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_showBezierInputDialog"],"PASTE BEZIER STRING ...") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "onclick": "about()",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_about"],"ABOUT") 
							  } ) ) );


    menu_bar.append( menuItem_help );
};

/**
 * This function populates the presets sub menu and appends it to the passed 
 * menuList (<ul>) jQuery item.
 **/
dildogenerator.populate_dildo_presets_menu = function( menuList, presets ) {

    for( var category_name in presets ) {
	
	var category    = presets[ category_name ];

	var submenuList = null;
	menuList.append( $( "<li/>" ).append( $( "<a/>", { "class"  : "popout",
							   "href"   : "#",
							   "html"   : "Presets &gt;"
							 } ) ) ).append( submenuList = $("<ul/>") );
	
	
	for( var i in category.elements ) {

	    var preset      = category.elements[i];
	    //document.write( "<li><a href=\"#\" onclick=\"setBezierPathFromJSON(_DILDO_PRESETS." + category_name + ".elements[" + i + "].bezier_json,_DILDO_PRESETS." + category_name + ".elements[" + i + "].bend_angle);\">" + preset.label + "</a></li>\n" );
	    submenuList.append( $( "<li/>" ).append( $( "<a/>", { "href"    : "#",
								  "html"    : preset.label,
								  "onclick" : "setBezierPathFromJSON(_DILDO_PRESETS." + category_name + ".elements[" + i + "].bezier_json,_DILDO_PRESETS." + category_name + ".elements[" + i + "].bend_angle);"
								} ) ) );
	    
	}	
    }
};
