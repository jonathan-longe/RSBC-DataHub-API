const builder = require('xmlbuilder2');

function generate(pdf_template_filepath, form_key_value_pairs) {
    const xml = get_xml(pdf_template_filepath, form_key_value_pairs)
    return new File([xml], "documentElement.xml")

}

function get_xml(pdf_template_filepath, form_key_value_pairs) {
    console.log("inside get_xml()")
    console.log(form_key_value_pairs)
    let root = builder.create({version: "1.0", encoding: "UTF-8"})
    .ele('xfdf', {'xmlns': 'http://ns.adobe.com/xfdf/', 'xml:space': 'preserve'} )
        .ele('f', {'href': pdf_template_filepath}).up()
        .ele('fields');
    Object.entries(form_key_value_pairs).forEach( property => {
        console.log("property", property)
        let name_attribute = {'name': property[0]}
        root.ele('field', name_attribute).ele('value').txt(String(property[1]));
    });
    root.up()
    .doc()
    const root_string = root.end({format: 'xml', prettyPrint: true})
    console.log("root_string", root_string )
    return root_string;

}

export default { generate }

