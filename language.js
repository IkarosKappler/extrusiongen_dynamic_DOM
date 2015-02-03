/**
 * The language pack file: EN
 *
 * @author  Ikaros Kappler
 * @date    2015-02-02
 * @version 1.0.0
 **/

var _DILDOGEN_LANG = {
    global:  {},
    menubar: { model: { _heading:        "Model",
			item_newFile:    "New",
			item_saveFile:   "Save (*.zip)",
			item_loadFile:   "Load (*.zip)",
			menu_exportMesh: { _heading: "Export Mesh &gt;",
					   item_exportSTL: "Surface Tesselation (*.stl)",
					   item_exportOBJ: "Wavefront File (*.obj)"
					 },
			item_publish:    "Publish ...",
			item_saveShape:  "Export Shape (*.json)",
			item_loadShape:  "Import Shape (*.json)"					   
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
