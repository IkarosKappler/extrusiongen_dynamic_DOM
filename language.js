/**
 * The language pack file: EN
 *
 * @author  Ikaros Kappler
 * @date    2015-02-02
 * @version 1.0.0
 **/

var _DILDOGEN_LANG = {
    "global":  {},
    "menubar": { "model":   { _heading:        "Model",
			      item_newFile:    "New",
			      menu_presets:    { _heading: "Presets &gt;" },
			      item_saveFile:   "Save (*.zip)",
			      item_loadFile:   "Load (*.zip)",
			      menu_exportMesh: { _heading: "Export Mesh &gt;",
						 item_exportSTL: "Surface Tesselation (*.stl)",
						 item_exportOBJ: "Wavefront File (*.obj)"
					       },
			      item_publish:    "Publish ...",
			      item_saveShape:  "Export Shape (*.json)",
			      item_loadShape:  "Import Shape (*.json)"					   
		            },
		 "3dprint": { _heading:        "3D Print",
			      item_orderPrint: "Order Print ..."
			    },
		 "help":    { _heading:        "Help",
			      menu_interface:  { _heading: "Interface &gt",
						 item_decreaseGUISize: "Smaller (-10%)",
						 item_increaseGUISize: "Bigger (+10%)" 
					       },
			      item_faq:        "FAQ",
			      item_howtoPublish: "How to Publish?",
			      item_makingADildoPDF: "Making a Dildo (PDF)",
			      item_displayBezierString: "Display B&eacute;zier String",
			      item_showBezierInputDialog: "Paste B&eacute;zier String ...",
			      item_about:      "About"
			    }		   
	       },
    "register_card" : { mesh_controls       : { "_heading" : "Mesh Controls",
						"_register_head": "Mesh Settings"					    
					      },
			print_controls      : { "_heading" : "Advanced Settings",
						"_register_head": "Advanced Settings"					    
					      },
			background_settings : { "_heading" : "Background",
						"_register_head": "Background"					    
					      },
			color_settings      : { "_heading" : "Color",
						"_register_head": "Color"					    
					      }
		      }
};

_DILDOGEN_LANG.get = function( path, alt ) {
    if( path.length == 0 )
	return alt;

    var node = _DILDOGEN_LANG;
    for( i = 0; i < path.length; i++ ) {
	
	node = node[path[i]];

	if( typeof node == "undefined" )
	    return alt;
    }
    
    return node;
};
