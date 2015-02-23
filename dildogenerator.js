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

    dildogenerator._initVersionTagDOM( dg_container );
    dildogenerator._initGalleryLinkDOM( dg_container );
    dildogenerator._initMenubarDOM( dg_container );
    dildogenerator._initMeshControlsDOM( dg_container );
    dildogenerator._initPrintControlsDOM( dg_container );
    dildogenerator._initBackgroundSettingsDOM( dg_container );
    dildogenerator._initColorSettingsDOM( dg_container );
    dildogenerator._initRegisterHeadersDOM( dg_container );
    dildogenerator._initInformationalDOM( dg_container );
    dildogenerator._initLicenseDOM( dg_container );
    dildogenerator._initStatusbarDOM( dg_container );

    dildogenerator._initCanvasComponentsDOM( dg_container );
};

/**
 * This (sub) function initializes the version tag DOM structure.
 **/
dildogenerator._initVersionTagDOM = function( dg_container ) {
    var version_tag = $( "<div/>",
			 { "id"  : "version_tag" } 
		       ).text( VERSION_STRING );
    dg_container.append( version_tag );
};


/**
 * This (sub) function initializes the gallery link and publish button DOM structure.
 **/
dildogenerator._initGalleryLinkDOM = function( dg_container ) {
    var gallery_links = $( "<div/>",
			 { "id"  : "gallery_links" } 
		       );
    gallery_links.append( $( "<a/>",
			     { "href"   : "gallery/",
			       "target" : "_blank"
			       //"html"   : "Gallery"
			     } 
			   ).append( $( "<img />",
					{ "src"    : "img/Icon_Gallery_A.png",
					  "width"  : "24",
					  "height" : "23",
					  "alt"    : "To the gallery",
					  "align"  : "middle" 
					}
				      )
				   ).append( $( "<span/>", { "html" : _DILDOGEN_LANG.get(["global","link_gallery"],"Gallery")
							   }
					      ) 
					   )
			);
    if( typeof _DILDO_CONFIG != "undefined" && !_DILDO_CONFIG.HIDE_PUBLISH_MESH_MENU ) {
	gallery_links.append( $("<span/>").
			      text("| ").
			      append( $( "<button/>",
					 { "onclick" : "publishDildoDesign()" }
				       ).text( _DILDOGEN_LANG.get(["global","button_publish"],"Publish ...") )
				    )
			    );
    }

    dg_container.append( gallery_links );
};


/**
 * This (sub) function initializes the menubar DOM structure.
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
    var mesh_controls_div = null;
    var table             = null;
    mesh_controls.append( mesh_controls_div =
			  $( "<div/>",
			     { "class" : "register_card grid_container outline",
			       "id"    : "mesh_controls" 
			     } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","mesh_controls","_heading"],"Mesh controls") ) )
			  /*.append( table =
				  $( "<table/>",
				     { "style"  : "border: 0;" }
				   ) 
				)*/
				  
			);
    /* I don't use tables here any more.                                   */
    /* Arranging non-tabular contents with tables is Meh.                  */
    /* Used a 6-column grid system instead. See sixColumnGridSystem.css    */
    /* instead.                                                            */

    /* Create row 1: bend */
    var row1 = mesh_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  )
					 );
    row1.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Bend (<span id=\"preview_bend_display\">0</span>°)" 
		    }
		  )
	       );
    row1.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "0°<input type=\"range\" id=\"preview_bend\" name=\"preview_bend\" min=\"0\" max=\"180\" value=\"0\" " +
                                "style=\"width: 150px; margin-top: -12px;\" " +
		                "onmousedown=\"preview_bend_mousedown=true;\" " +
		                "onmouseup=\"preview_bend_mousedown=false;\" " +
		                "onmousemove=\"if(preview_bend_mousedown) document.getElementById('preview_bend_display').innerHTML=document.getElementById('preview_bend').value;\" " +
		                "onchange=\"displayBendingValue(); preview_rebuild_model();\" />180°"
		    }
		  ).append( $( "<script/>", 
			       { "html"  : "preview_bend_mousedown = false;" }
			     )
			  )
	       );
    /* Create row 2: shape style */
    var row2 = mesh_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  )
					 );
     row2.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Shape Style:" 
		    }
		  )
	       );
     row1.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"radio\" name=\"shape_style\" id=\"shape_style_circle\" value=\"circle\" checked=\"checked\" onchange=\"preview_rebuild_model();\" /> <label for=\"shape_style_circle\">Circle</label> " +
		                "<input type=\"radio\" name=\"shape_style\" id=\"shape_style_oval\" value=\"oval\" onchange=\"preview_rebuild_model();\" /> <label for=\"shape_style_oval\">Oval</label> " +
	                        "<br/> "+
	                        "<input type=\"radio\" name=\"shape_style\" id=\"shape_style_square\" value=\"square\" onchange=\"preview_rebuild_model();\" disabled=\"disabled\" /> <label for=\"shape_style_square\" class=\"disabled\">Square</label> " +
	                        "<input type=\"radio\" name=\"shape_style\" id=\"shape_style_triangle\" value=\"triangle\" onchange=\"preview_rebuild_model();\" disabled=\"disabled\" /> <label for=\"shape_style_triangle\" class=\"disabled\">Triangle</label>"
		    }
		  )
	       );
    
    dg_container.append( mesh_controls );
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initPrintControlsDOM = function( dg_container ) {
    var print_controls_div = $( "<div/>",
				{ "class" : "register_card", //  grid_container", // outline",
				  "id"    : "print_controls",
				  "style" : "display: none;"
				} ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","print_controls","_heading"],"Advanced controls") ) ).
	append( $( "<table/>",
		   { "style"  : "border: 0;" }
		 ) 
	      );


    /* Create row 1: segments */
    var row1 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row1.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Segments:" 
		    }
		  )
	       );
    row1.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<table style=\"padding: 0px; spacing: 0px; border: 0; width: 100%;\"> "+
	    "<tr> "+
	    "  <td style=\"align: left; vertical-align: top;\"> "+
	    "	<input type=\"number\" id=\"shape_segments\" name=\"shape_segments\" value=\"80\" class=\"tooltip\" title=\"The number of vertices on the vertical shape (on the circle). More vertices make the mesh more accurate but it renders slower.\" style=\"width: 45px;\" /> "+
	    "	<label for=\"shape_segments\">Shape</label> "+
	    "	<br/> "+
	    "	<input type=\"number\" id=\"path_segments\" name=\"path_segments\" value=\"80\" class=\"tooltip\" title=\"The number of vertices on the horizontal shape (on the outer path). More vertices make the mesh more accurate but it renders slower.\" style=\"width: 45px;\" /> "+
	    "	<label for=\"path_segments\">Path</label> "+
	    " </td> " +
	    "  " +
	    "  <td style=\"vertical-align: middle;\" rowspan=\"2\"> "+
	    "	<input type=\"button\" onclick=\"increase_mesh_details()\" value=\"+\" /> "+
	    "  </td> " +
	    "  <td style=\"vertical-align: middle;\"> " +
	    "	<input type=\"button\" onclick=\"decrease_mesh_details()\" value=\"-\" /> "+
	    "  </td> " +
	    "</tr> " +
	    "</table>"	  
		    }
		  )
	       );
    
    /* Create row 2: Hollow */
    var row2 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row2.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "&nbsp;" 
		    }
		  )
	       );
    
    row2.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"checkbox\" id=\"build_negative_mesh\" name=\"build_negative_mesh\" class=\"tooltip\" title=\"Set this value if you want to have a hollow shape to be generated. The strength of the hollow hull is specified by the 'Mesh Hull Strength' setting.\" onchange=\"document.getElementById('mesh_hull_strength').disabled=(document.getElementById('build_negative_mesh').checked?'':'disabled'); preview_rebuild_model();\"/> " +
          "<label for=\"build_negative_mesh\">Hollow</label>"	  
		    }
		  )
	       );

    /* Create row 3: Mesh Hull Strength */
    var row3 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row3.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Hull:" 
		    }
		  )
	       );
    
    row3.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"number\" id=\"mesh_hull_strength\" name=\"mesh_hull_strength\" value=\"6\" class=\"tooltip\" title=\"...\" onkeyup=\"bezierCanvasHandler.redraw();preview_rebuild_model();\" style=\"width: 35px;\" onchange=\"if( typeof preview_rebuild_model != 'undefined' ) preview_rebuild_model();\" disabled=\"disabled\" />mm"	  
		    }
		  )
	       );

    /* Create row 4: Close path at */
    var row4 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row4.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Close path at" 
		    }
		  )
	       );
    
    row4.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<table style=\"padding: 0px; spacing: 0px; border: 0; width: 100%;\"> "+
	"    <tr><td style=\"align: left;\"> " +
	"	<input type=\"checkbox\" id=\"mesh_close_path_begin\" name=\"mesh_close_path_begin\" onchange=\"preview_rebuild_model();\" class=\"tooltip\" title=\"The path begin is the top of the mesh. In some cases the top bezier point is not located at the right bound. The top shape can be closed with this option then.\" /> " +
	"	<label for=\"mesh_close_path_begin\">begin</label> " +
	"      </td> " +
        "      <td style=\"align: right;\"> " +
	"	<input type=\"checkbox\" id=\"mesh_close_path_end\" name=\"mesh_close_path_end\" onchange=\"preview_rebuild_model();\" class=\"tooltip\" title=\"The path end is the bottom of the mesh.\" checked=\"checked\" />" +
	"	<label for=\"mesh_close_path_end\">end</label>" +
	"    </td></tr>" +
	"  </table>"
		    }
		  )
	       );
    /* Create row 5: Wireframe */
    var row5 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row5.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "&nbsp;" 
		    }
		  )
	       );
    
    row5.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"checkbox\" id=\"wireframe\" name=\"wireframe\" onchange=\"preview_rebuild_model();\" class=\"tooltip\" title=\"Well, just toggles wireframe on/off.\" />" +
          "<label for=\"wireframe\">Wireframe</label>"
		    }
		  )
	       );

    /* Create row 6: Triangulate */
    var row6 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row6.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "&nbsp;" 
		    }
		  )
	       );
    
    row6.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"checkbox\" id=\"triangulate\" name=\"triangulate\" onchange=\"preview_rebuild_model();\" />" +
		                "<label for=\"wireframe\">Triangulate</label>" +
		                "<span class=\"tooltip\" title=\"Note: quad faces render faster but only triangulated meshes are STL compatible!\">(!)</span>"
		    }
		  )
	       );
    /* Create row 7: Split shape/mesh */
    var row7 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row7.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "&nbsp;" 
		    }
		  )
	       );
    
    row7.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"checkbox\" id=\"split_shape\" name=\"split_shape\" onchange=\"toggleFormElementsEnabled(); preview_rebuild_model();\" />" +
		                "<label for=\"split_shape\">Split into halves</label>"
		    }
		  )
	       );

    /* Create row 8: Parts */
    var row8 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row8.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Parts:" 
		    }
		  )
	       );
    
    row8.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<div class=\"indent_1\">" + 
	"    <table style=\"border: 0;\">" + 
	"      <tr>" + 
	"	<td>" + 
	"	  <input type=\"radio\" id=\"parts_both\" name=\"parts\" onchange=\"preview_rebuild_model();\" value=\"both\" checked=\"checked\" disabled=\"disabled\" />" + 
	"	  <label for=\"parts_both\">Both</label>" + 
	"	</td>" + 
	"	<td>" + 
	"	  <input type=\"radio\" id=\"parts_left\" name=\"parts\" onchange=\"preview_rebuild_model();\" value=\"left\" disabled=\"disabled\" />" + 
	"	  <label for=\"parts_left\">Left</label>" + 
	"	</td>" + 
	"	<td>" + 
	"	  <input type=\"radio\" id=\"parts_right\" name=\"parts\" onchange=\"preview_rebuild_model();\" value=\"right\" disabled=\"disabled\" />" + 
	"	  <label for=\"parts_right\">Right</label>" + 
	"	</td>" + 
	"      </tr>" + 
	"    </table>" + 
	"  </div>"
		    }
		  )
	       );

    /* Create row 9: Arrange splits on plance */
    var row9 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row9.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "&nbsp;" 
		    }
		  )
	       );
    
    row9.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  :  "<div class=\"indent_1\">" +
          "  <input type=\"checkbox\" id=\"arrange_splits_on_plane\" name=\"arrange_splits_on_plane\" onchange=\"toggleFormElementsEnabled(); preview_rebuild_model();\" disabled=\"disabled\" />" +
          "  <label for=\"arrange_splits_on_plane\">Arrange splits on plane</label>" +
	  "</div>"
		    }
		  )
	       );

    /* Create row 10: Directions */
    var row10 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row10.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Directions:" 
		    }
		  )
	       );
    
    row10.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  :  "<div class=\"indent_2\">" +
	"    <table style=\"border: 0;\">" +
	"      <tr>" +
	"	<td>" +
	"	  <input type=\"radio\" id=\"directions_xyz\" name=\"directions\" onchange=\"preview_rebuild_model();\" value=\"xyz\" checked=\"checked\" disabled=\"disabled\" />" +
	"	  <label for=\"directions_xyz\">(x,y,z)</label>" +
	"	</td>" +
	"	<td>" +
	"	  <input type=\"radio\" id=\"directions_yxz\" name=\"directions\" onchange=\"preview_rebuild_model();\" value=\"zxy\" disabled=\"disabled\" />" +
	"	  <label for=\"directions_yxz\">(-z,x,-y)</label>" +
	"	</td>" +
	"      </tr>" +
	"    </table>" +
	"  </div>"
		    }
		  )
	       );


    /* Create row 11: Directions */
    var row10 = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    row10.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "Base type:" 
		    }
		  )
	       );
    
    row10.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<div class=\"indent_2\">" +
	"    <input type=\"radio\" name=\"mesh_hull_type\" id=\"mesh_hull_perpendicular\" value=\"perpendicular\" checked=\"checked\" disabled=\"disabled\" onchange=\"preview_rebuild_model();\" />" +
	"    <label for=\"mesh_hull_perpendicular\">Perpendicular</label>" +
	"    <input type=\"radio\" name=\"mesh_hull_type\" id=\"mesh_hull_prism\" value=\"prism\" disabled=\"disabled\" onchange=\"preview_rebuild_model();\" />" +
	"    <label for=\"mesh_hull_prism\">Prism</label>" +
	"  </div>"
		    }
		  )
	       );


    /* Final row: Build! button */
    var rowBuild = print_controls_div.append( $( "<div/>",
					    { "class" : "row" }
					  ) );
    rowBuild.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "&nbsp;" 
		    }
		  )
	       );
    
    rowBuild.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"button\" value=\"Rebuild\" onclick=\"preview_rebuild_model();\">"
		    }
		  )
	       );

    
    dg_container.append( print_controls_div );
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initBackgroundSettingsDOM = function( dg_container ) {
    var background_settings_div = $( "<div/>",
				 { "class" : "register_card",
				   "id"    : "background_settings",
				   "style" : "display: none;"
				 } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","background_settings","_heading"],"Background Settings") ) );


    /* Create row 1: default background */
    var row1 = background_settings_div.append( $( "<div/>",
						  { "class" : "row" }
						) );
    row1.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "<input type=\"radio\" name=\"bezier_background_type\" id=\"bezier_background_default\" value=\"default\" onchange=\"changeBezierBackgroundType();\" checked=\"checked\" /></td>" +
		                "<td colspan=\"2\"><label for=\"bezier_background_default\">Default</label>" 
		    }
		  )
	       );
    row1.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : ""
		    }
		  )
	       );

    /* Create row 2: image background */
    var row2 = background_settings_div.append( $( "<div/>",
						  { "class" : "row" }
						) );
    row2.append( $( "<div/>",
		    { "class" : "col-1",
		      "html"  : "<input type=\"radio\" name=\"bezier_background_type\" value=\"file\" onchange=\"changeBezierBackgroundType();\" />" +
		      "<label for=\"bezier_background_file\">File*:</label> " 
		    }
		  )
	       );
    row2.append( $( "<div/>",
		    { "class" : "col-2",
		      "html"  : "<input type=\"file\" id=\"bezier_background_file\" name=\"bezier_background_file\" accept=\"image/*\" onchange=\"loadBezierBackground();\" style=\"width: 330px;\" />" +
	"<br/> " +
	"<span style=\"font-size: 7pt; color: #686868;\">* this site will not store nor keep background images you upload, except you <i>explicitly</i> publish them via the Model&rarr;Publish menu.</span>"
		    }
		  )
	       );
    
    dg_container.append( background_settings_div );
};


/**
 * This (sub) function initializes the mesh controls DOM structure.
 **/
dildogenerator._initColorSettingsDOM = function( dg_container ) {
    var color_settings = $( "<div/>",
				 { "class" : "register_card",
				   "id"    : "color_settings",
				   "style" : "display: none;"
				 } ).append( $( "<h3/>").text( _DILDOGEN_LANG.get(["register_card","color_settings","_heading"],"Color") ) );
    
    color_settings.append( $( "<script/>",
			      { "html"  : "    function changeColor( c ) {\n" +
				          "          document.forms[\"color_form\"].elements[\"color\"].value = c;\n" +
				          "          // Convert color string to R-G-B values  \n" +
				          "          previewCanvasHandler.setMaterialColorRGB( c,\n" +
				          "                                                    true // redraw \n" +
				          "                                                    )\n;" + 
				          "    \n" +
				          "    }\n" 
			      }
			    )
			   );

    color_settings.append( $( "<div/>",
			      { "html"  : "  <form name=\"color_form\">" +
				          "    <input type=\"hidden\" name=\"color\" value=\"#2c8aff\" />" +
			          	  "  </form>"
			      }
			    )
			 );
  
    // Populate color table
    var table = color_settings.append( $( "</table>",
					  { "style"  : "border: 0;" }
					)
				     );
    var colorMatrix = [
	// First row
	[ "ffffff", 
	       "",
	       "",
	       "",
	       "",
	       "151D28"
	     ],
	
	// Second row
	[ "2C8Aff", 
	       "",
	       "",
	       "",
	       "",
	       "ff60d4"
	     ], 

	// Third row
	[ "e00000", 
	       "f08900",
	       "f8f000",
	       "00c000",
	       "0040e0",
	       "a000a0"
	     ]
    ];
    
    for( var y = 0; y < colorMatrix.length; y++ ) {
	var row = table.append( $( "<tr>" ) );
	for( var x = 0; x < colorMatrix[y].length; x++ ) {
	    var color =  colorMatrix[y][x];
	    if( typeof color != "undefined" ) {
		row.append( $( "<td/>",
			       { "class"  : "color_cell" }
			     ).append( $( "<div/>",
					  { "class"   : "color_picker",
					    "style"   : "background-color: #" + color + ";",
					    "onclick" : "changeColor('#" + color + "');",
					    "html"    : "&nbsp;"
					  }
					)
				     )
			  );
	    } else {
		row.append( $( "<td/>",
			       { "html"  : "&nbsp;" }
			     )
			  );
	    }
	}
    }

    
    if( isDildoGeneratorDomain() ) {
	color_settings.append( $( "<div/>",
				  { "style"  : "font-size: 7pt; text-align: right; color: #686868;",
				    "html"   : "Please note that not all of these colors are available in silicone."   
				  }
				)
			     );
    }


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


/**
 * This (sub) function initializes the license info DOM structure (size, volume and weight).
 **/
dildogenerator._initLicenseDOM = function( dg_container ) {

    var license_info = $( "<div/>",
			  { "id"    : "license",
			    "style" : "left: 1044px; top: 620px;" 
			  }
			);
    license_info.append( $( "<br/>" ) );
    license_info.append( $( "<a/>",
			    { "href"   : "https://github.com/IkarosKappler/extrusiongen.git",
			      "target" : "_blank",
			      "style"  : "text-decoration: none;"
			    } 
			  ).append( $( "<img/>",
				       { "src"     : "img/GitHub.png",
					 "width"   : 32,
					 "height"  : 32,
					 "alt"     : "Clone at Github.com",
					 "style"   : "border: 0;"
				       }
				     )
				  ) 
		       );
    license_info.append( $( "<a/>",
			    { "href"   : "mailto:info@dildo-generator.com",
			      "target" : "_blank",
			      "style"  : "text-decoration: none;"
			    } 
			  ).append( $( "<img/>",
				       { "src"     : "img/Email.png",
					 "width"   : 32,
					 "height"  : 32,
					 "alt"     : "Send Bug reports to info@dildo-generator.com",
					 "style"   : "border: 0;"
				       }
				     )
				  ) 
		       );
     license_info.append( $( "<a/>",
			    { "href"   : "http://twitter.com/dildogenerator",
			      "target" : "_blank",
			      "style"  : "text-decoration: none;"
			    } 
			  ).append( $( "<img/>",
				       { "src"     : "img/Twitter.png",
					 "width"   : 32,
					 "height"  : 32,
					 "alt"     : "Follow us on Twitter at #dildogenerator",
					 "style"   : "border: 0;"
				       }
				     )
				  ) 
		       );
     license_info.append( $( "<a/>",
			    { "href"   : "https://www.flickr.com/photos/dildo-generator/",
			      "target" : "_blank",
			      "style"  : "text-decoration: none;"
			    } 
			  ).append( $( "<img/>",
				       { "src"     : "img/Flickr.png",
					 "width"   : 32,
					 "height"  : 32,
					 "alt"     : "Find screenshots and photos of dildo making at flickr",
					 "style"   : "border: 0;"
				       }
				     )
				  ) 
		       );
     license_info.append( $( "<a/>",
			    { "href"   : "http://dildo-generator.spreadshirt.de",
			      "target" : "_blank",
			      "style"  : "text-decoration: none;"
			    } 
			  ).append( $( "<img/>",
				       { "src"     : "img/Spreadshirt.png",
					 "width"   : 32,
					 "height"  : 32,
					 "alt"     : "Order a fan shirt",
					 "style"   : "border: 0;"
				       }
				     )
				  ) 
			);

    license_info.append( $( "<br/>" ) );
    license_info.append( $( "<br/>" ) );

    license_info.append( $( "<img/>",
		       { "src"    : "img/cc.large.32.png",
			 "alt"    : "Creative Commons CC",
			 "width"  : 32,
			 "height" : 32
		       }
		     )
		  );
    license_info.append( $( "<img/>",
		       { "src"    : "img/by.large.32.png",
			 "alt"    : "Creative Commons BY",
			 "width"  : 32,
			 "height" : 32
		       }
		     )
		  );
    license_info.append( $( "<img/>",
		       { "src"    : "img/nc.large.32.png",
			 "alt"    : "Creative Commons NC",
			 "width"  : 32,
			 "height" : 32
		       }
		     )
		  );
    license_info.append( $( "<img/>",
		       { "src"    : "img/sa.large.32.png",
			 "alt"    : "Creative Commons SA",
			 "width"  : 32,
			 "height" : 32
		       }
		     )
		  );
    license_info.append( $( "<br/>" ) );

    license_info.append( $( "<span/>" ).text( "Creative Commons / BY-NC-SA" ) ).append( $( "<br/>" ) );
    license_info.append( $( "<br/>" ) );
			    
    if( isDildoGeneratorDomain() ) {
	license_info.append( $( "<span/>" ).text( "[" ) ).
	    append( $( "<a/>",
		       { "href"    : "#",
			 "onclick" : "order_print()",
			 "style"   : "color: #ef0000; font-size: 8pt;"
		       }
		     ).text( "Don't have a 3D printer?" )
		  ).
	    append( $( "<span/>" ).text( "]" ) );
			 
    }

    dg_container.append( license_info );						
};


/**
 * This (sub) function initializes the informational box DOM structure (size, volume and weight).
 **/
dildogenerator._initCanvasComponentsDOM = function( dg_container ) {

    dildogenerator._initCanvasComponentDOMwith( dg_container,
						"preview_canvas",
						10,
						45,
						_DILDO_CONFIG.PREVIEW_CANVAS_WIDTH,
						_DILDO_CONFIG.PREVIEW_CANVAS_HEIGHT,
						"Click, hold and drag to rotate the view.",
						"setStatus('Click, hold and drag to rotate the view.');",
						"setStatus('');",
						"preview_canvas_div"
					      ); 
    dildogenerator._initCanvasComponentDOMwith( dg_container,
						"bezier_canvas",
						10 + _DILDO_CONFIG.PREVIEW_CANVAS_WIDTH + 10,
						45,
						_DILDO_CONFIG.BEZIER_CANVAS_WIDTH,
						_DILDO_CONFIG.BEZIER_CANVAS_HEIGHT,
						"Double click onto the curve to add new control points. Press the [DEL] key to delete selected points.",
						"setStatus('Double click onto the curve to add new control points. Press the [DEL] key to delete selected points.');",
						"setStatus('');",
						"bezier_canvas_div"
					      );   			
};

dildogenerator._initCanvasComponentDOMwith = function( dg_container,
						       id,
						       left_px,
						       top_px,
						       width_px,
						       height_px,
						       title,
						       mouseover,
						       mouseout,
						       div_id
				   ) {
    var canvas = $( "<div/>",
		    { "id" : div_id }
		  ).append( $( "<canvas/>",
			       { "id"        : id,
				 //"top"       : top_px,
				 //"left"      : left_px,
				 "width"     : width_px,
				 "height"    : height_px,
				 "title"     : title,
				 "class"     : "tooltip",
				 "mouseover" : mouseover,
				 "mouseout"  : mouseout,
				 "style"     : "width: " + width_px + "px; " +
				               "height: " + height_px + "px; " +
				               "top: " + top_px + "px; " +
				               "left: " + left_px + "px;"
			       }
			     )
			  );
    dg_container.append( canvas );
};
