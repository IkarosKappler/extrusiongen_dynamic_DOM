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


/**
 * This function is the FIRST function to be called directly after the
 * static (!) DOM is loaded from the HTML file.
 **/
dildogenerator.init = function() {
    dildogenerator.installJQuery( dildogenerator.initDOM );
    //dildogenerator.initDOM();

    // Install the menu bar script (moo-tools)
    new UvumiDropdown('nav'); 
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
    dildogenerator._initMeshControlsDOM( dg_container );
    dildogenerator._initPrintControlsDOM( dg_container );
    dildogenerator._initBackgroundSettingsDOM( dg_container );
    dildogenerator._initColorSettingsDOM( dg_container );
    dildogenerator._initRegisterHeadersDOM( dg_container );
    dildogenerator._initInformationalDOM( dg_container );
    dildogenerator._initStatusbarDOM( dg_container );
};

/**
 * This (sub) function initializes the the menubar DOM structure.
 **/
dildogenerator._initMenubarDOM = function( dg_container ) {
    var menu_bar_holder = null; 
    var menu_bar = $( "<div/>",
       {   "id"       : "menu_bar",
	   "style"    : "z-index: 1001"
       } 
     ).append( menu_bar_holder = $( "<div/>",
				    { "id"      : "dropdown-holder" } 
				  ) );
    
    dildogenerator._initMenubarDOM_model( menu_bar_holder );
    dildogenerator._initMenubarDOM_3Dprint( menu_bar_holder );
    dildogenerator._initMenubarDOM_help( menu_bar_holder );
    dg_container.append( menu_bar );
};

/**
 * This (sub) function initializes the DOM structure for the 'Model' menu bar entry.
 **/
dildogenerator._initMenubarDOM_model = function( menu_bar_holder ) {

    var menuList_model   = null;
    var menuItem_model   = /*$( "<div/>",
			      { "id"      : "dropdown-holder" } 
			    ).append( */
				$( "<ul/>",
					 { "id"    : "nav",
					   "class" : "dropdown"
					 } ).append( $( "<li/>",
							{ "class"  : "heading" }
						      ).append( $( "<a/>", { "href" : "#", "class" : "mootool_dropdown" } ).text( _DILDOGEN_LANG.get(["menubar","model","_heading"],"Model") ) ).append( menuList_model = $("<ul/>") ) );
				    //);
    
    
    // Populate 'Model->New' item
    menuList_model.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							     "class" : "mootool_dropdown",
							     "onclick": "newScene()",
							     "html": _DILDOGEN_LANG.get(["menubar","model","item_newFile"],"New") 
							   } ) ) );
    if( typeof _DILDO_PRESETS != "undefined" )
	dildogenerator.populate_dildo_presets_menu( menuList_model, _DILDO_PRESETS );
    
    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_SAVE_FILE_ITEM ) {
	// Populate 'Model->Save' item
	menuList_model.append( $( "<li/>" ).
			       append( $( "<a/>", { "href" : "#",
						    "class" : "mootool_dropdown",
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
								    "class" : "mootool_dropdown",
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
					 "class" : "popout mootool_dropdown",
					 // "class" : "popout",
					 "html"  : _DILDOGEN_LANG.get(["menubar","model","menu_exportMesh","_heading"],"Export Mesh &gt;") } ) );
	export_menu.append( $( "<ul/>" ).
			    append( $( "<li/>" ).
				    append( $( "<a/>", { "href"    : "#",
							 "class" : "mootool_dropdown",
							 "onclick" : "exportSTL()",
							 "html"    : _DILDOGEN_LANG.get(["menubar","model","menu_exportMesh","item_exportSTL"],"Surface Tesselation (*.stl)") } ) ) ).
			    append( $( "<li/>" ).
				    append( $( "<a/>", { "href"    : "#",
							 "class" : "mootool_dropdown",
							 "onclick" : "exportOBJ()",
							 "html"    : _DILDOGEN_LANG.get(["menubar","model","menu_exportMesh","item_exportOBJ"],"Wavefront File (*.obj)") } ) ) )
			  );
	
	menuList_model.append( export_menu );
				     
    }

    
    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_PUBLISH_MESH_MENU ) {

	menuList_model.append( $( "<li/>" ).
			       append( $( "<a/>", { "href"    : "#",
						    "class" : "mootool_dropdown",
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
						"class" : "mootool_dropdown",
						"onclick" : "saveShape();",
						"html"    : _DILDOGEN_LANG.get(["menubar","model","item_saveShape"],"Export Shape (*.json)") }
				    )
				 )
			 );
    // Populate "Model->Load Shape" item
    menuList_model.append( $( "<li/>" ).
			   append( $( "<form/>", { "name"   : "bezier_file_upload_form" } ).
				   append( $( "<a/>", { "href"  : "#",
							"class" : "mootool_dropdown",
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
						
				      


    menu_bar_holder.append( menuItem_model );
							    
};

/**
 * This (sub) function initializes the DOM structure for the '3D Print' menu bar entry.
 **/
dildogenerator._initMenubarDOM_3Dprint = function( menu_bar_holder ) {

    var menuList_3dprint   = null;
    var menuItem_3dprint   = /* $( "<div/>",
				{ "id"      : "dropdown-holder" } 
			      ).append( */
    $( "<ul/>",
					   { "id"    : "nav",
					     "class" : "dropdown"
					   } ).append( $( "<li/>",
							  { "class"  : "heading" }
							).append( $( "<a/>", { "href" : "#", "class" : "mootool_dropdown" } ).text( _DILDOGEN_LANG.get(["menubar","3dprint","_heading"],"3D PRINT") ) ).append( menuList_3dprint = $("<ul/>") ) );
//);

    // Populate '3D Print->Order Print...' item
    menuList_3dprint.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							       "class" : "mootool_dropdown",
							       "onclick": _DILDO_CONFIG.ORDER_PRINT_ACTION,
							       "html": _DILDOGEN_LANG.get(["menubar","3dprint","item_orderPrint"],"ORDER PRINT") 
							     } ) ) );


    menu_bar_holder.append( menuItem_3dprint );
};

/**
 * This (sub) function initializes the DOM structure for the 'Help' menu bar entry.
 **/
dildogenerator._initMenubarDOM_help = function( menu_bar_holder ) {

    var menuList_help   = null;
    var menuItem_help   = /* $( "<div/>",
			     { "id"      : "dropdown-holder" } 
			   ).append( */
			       $( "<ul/>",
					{ "id"    : "nav",
					  "class" : "dropdown"
					} ).append( $( "<li/>",
						       { "class"  : "heading" }
						     ).append( $( "<a/>", { "href" : "#", "class" : "mootool_dropdown" } ).text( _DILDOGEN_LANG.get(["menubar","help","_heading"],"HELP") ) ).append( menuList_help = $("<ul/>") ) );
    //);

    
    // Populate 'Interface' sub menu
    var interface_menu = $( "<li/>" );
    interface_menu.append( $( "<a/>", { "href"  : "#",
				     "class" : "popout mootool_dropdown",
				     "html"  : _DILDOGEN_LANG.get(["menubar","help","menu_interface","_heading"],"INTERFACE") } ) );
    interface_menu.append( $( "<ul/>" ).
			append( $( "<li/>" ).
				append( $( "<a/>", { "href"    : "#",
						     "class" : "mootool_dropdown",
						     "onclick" : "exportSTL()",
						     "html"    : _DILDOGEN_LANG.get(["menubar","help","menu_interface","item_decreaseGUISize"],"SMALLER (-10%)") } ) ) ).
			append( $( "<li/>" ).
				append( $( "<a/>", { "href"    : "#",
						     "class" : "mootool_dropdown",
						     "onclick" : "exportOBJ()",
						     "html"    : _DILDOGEN_LANG.get(["menubar","help","menu_interface","item_increaseGUISize"],"BIGGER (+10%)") } ) ) )
		      );
    
    menuList_help.append( interface_menu );

    
    // Populate the items ...
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "class" : "mootool_dropdown",
							       "onclick": "open_faqs()",
							       "html": _DILDOGEN_LANG.get(["menubar","help","item_faq"],"FAQ") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "class" : "mootool_dropdown",
							    "onclick": "open_faqs('general_publish')",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_howtoPublish"],"HOW TO PUBLISH?") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "http://www.dildo-generator.com/resources/Dildo_Slides_re-publica_20140507.pdf",
							    "class" : "mootool_dropdown",
							    //"onclick": "",
							    target:  "_blank",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_makingADildoPDF"],"MAKING A DILDO (PDF)") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "class" : "mootool_dropdown",
							    "onclick": "display_bezier_string()",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_displayBezierString"],"DISPLAY BEZIER STRING") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "class" : "mootool_dropdown",
							    "onclick": "show_bezier_input_dialog()",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_showBezierInputDialog"],"PASTE BEZIER STRING ...") 
							  } ) ) );
    menuList_help.append( $( "<li/>" ).append( $( "<a/>", { "href" : "#",
							    "class" : "mootool_dropdown",
							    "onclick": "about()",
							    "html": _DILDOGEN_LANG.get(["menubar","help","item_about"],"ABOUT") 
							  } ) ) );


    menu_bar_holder.append( menuItem_help );
};

/**
 * This function populates the presets sub menu and appends it to the passed 
 * menuList (<ul>) jQuery item.
 **/
dildogenerator.populate_dildo_presets_menu = function( menuList, presets ) {

    var presets_menuList = null;
    menuList.append( $( "<li/>" ).append( $( "<a/>", { "class"  : "popout mootool_dropdown",
						       "href"   : "#",
						       "html"   : _DILDOGEN_LANG.get(["menubar","model","menu_presets","_heading"],"Presets &gt;")
						     } 
					   )
					).append( presets_menuList = $("<ul/>") ) 
		   );

    for( var category_name in presets ) {
	
	var category    = presets[ category_name ];

	var submenuList = null;
	presets_menuList.append( $( "<li/>" ).append( $( "<a/>", { "class"  : "popout mootool_dropdown",
								   "href"   : "#",
								   "html"   : category.label + " &gt;"
								 } 
						       ) 
						    ).append( submenuList = $("<ul/>") )
			       );
	
	
	for( var i in category.elements ) {

	    var preset      = category.elements[i];
	    submenuList.append( $( "<li/>" ).append( $( "<a/>", { "href"    : "#",
								  "class"   : "mootool_dropdown",
								  "html"    : preset.label,
								  "onclick" : "setBezierPathFromJSON(_DILDO_PRESETS." + category_name + ".elements[" + i + "].bezier_json,_DILDO_PRESETS." + category_name + ".elements[" + i + "].bend_angle);"
								} ) ) );
	    
	}	
    }
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initMeshControlsDOM = function( dg_container ) {
    var mesh_controls = $( "<form/>",
			{   "name"       : "mesh_form"
			    
			} 
		      );
    mesh_controls.append( $( "<div/>",
			     { "class" : "register_card",
			       "id"    : "mesh_controls" 
			     } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","mesh_controls","_heading"],"Mesh controls") ) ).
			  append( $( "<table/>",
				     { "style"  : "border: 0;" }
				   ) 
				)
				  
			);
    // TODO
    
    dg_container.append( mesh_controls );
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initPrintControlsDOM = function( dg_container ) {
    var print_controls = $( "<div/>",
			     { "class" : "register_card",
			       "id"    : "print_controls",
			       "style" : "display: none;"
			     } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","print_controls","_heading"],"Advanced controls") ) ).
			  append( $( "<table/>",
				     { "style"  : "border: 0;" }
				   ) 
				);
    // TODO
    
    dg_container.append( print_controls );
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initBackgroundSettingsDOM = function( dg_container ) {
    var background_settings = $( "<div/>",
				 { "class" : "register_card",
				   "id"    : "background_settings",
				   "style" : "display: none;"
				 } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","background_settings","_heading"],"Background Settings") ) ).
	append( $( "<table/>",
		   { "style"  : "border: 0;" }
		 ) 
	      );
    // TODO
    
    dg_container.append( background_settings );
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initColorSettingsDOM = function( dg_container ) {
    var color_settings = $( "<div/>",
				 { "class" : "register_card",
				   "id"    : "color_settings",
				   "style" : "display: none;"
				 } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","color_settings","_heading"],"Color") ) ).
	append( $( "<table/>",
		   { "style"  : "border: 0;" }
		 ) 
	      );
    // TODO
    
    dg_container.append( color_settings );
};



/**
 * This (sub) function initializes the status bar DOM structure.
 **/
dildogenerator._initStatusbarDOM = function( dg_container ) {
    var status_bar = $( "<div/>",
			{   "id"       : "status_bar"
			    
			} 
		      ).text( "$status" );
    
    dg_container.append( status_bar );
};


/**
 * This (sub) function initializes the register headers DOM structure.
 **/
dildogenerator._initRegisterHeadersDOM = function( dg_container ) {
    var register_header = $( "<div/>",
			{   "id"       : "register_head"
			    
			} 
		      );
    register_header.append( $( "<span/>",
			       { "onclick"   : "show_register_card('mesh_controls');",
				 "id"        : "regh_mesh_controls",
				 "class"     : "register_tab_selected"
			       } ).text( _DILDOGEN_LANG.get(["register_card","mesh_controls","_register_head"],"Mesh Settings") )
			  );
    register_header.append( $( "<span/>",
			       { "onclick"   : "show_register_card('print_controls');",
				 "id"        : "regh_print_controls",
				 "class"     : "register_tab"
			       } ).text( _DILDOGEN_LANG.get(["register_card","print_controls","_register_head"],"Advanced Settings") )
			  );
    register_header.append( $( "<span/>",
			       { "onclick"   : "show_register_card('background_settings');",
				 "id"        : "regh_background_settings",
				 "class"     : "register_tab"
			       } ).text( _DILDOGEN_LANG.get(["register_card","background_settings","_register_head"],"Background") )
			  );
    register_header.append( $( "<span/>",
			       { "onclick"   : "show_register_card('color_settings');",
				 "id"        : "regh_color_settings",
				 "class"     : "register_tab"
			       } ).text( _DILDOGEN_LANG.get(["register_card","color_settings","_register_head"],"Color") )
			  );    
    
    dg_container.append( register_header );
};


/**
 * This (sub) function initializes the informational box DOM structure (size, volume and weight).
 **/
dildogenerator._initInformationalDOM = function( dg_container ) {

    var informational = $( "<div/>",
			   { "id"  : "informational" }
			 );
    informational.append( $( "<h3/>", { "html"  : "Size, Volume and Weight*" } ) );
    informational.append( $( "<div/>",
			     { "id"  : "volume_and_weight" }
			   ).text( "-" ).append( "<br/>" )
			);

    informational.append( $( "<div/>",
			     { "id"  : "comment" }
			   ).text( "* Projected on the inner shape, not the mould.<br/>\n" +
				   "The actual weight depends on the material you use."
				 )
			);
    dg_container.append( informational );
						
};