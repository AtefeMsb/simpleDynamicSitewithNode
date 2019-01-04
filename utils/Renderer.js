const fs = require('fs');

// private function
function htmlReader(viewName) {
    return fs.readFileSync(`./views/${viewName}.html`, 'utf8');
};  

// private function
function getFullHTML(viewNames) {
    const headerContent = htmlReader('header');
    const footerContent = htmlReader('footer');
    let contentHTML = '';
    
    if (!Array.isArray(viewNames)) {
        viewNames = [viewNames];
    }

    for (const viewName of viewNames) {
        contentHTML += htmlReader(viewName);
    }

    return headerContent + contentHTML + footerContent;
}


class Renderer {

    constructor(response) {
        this.response = response;
    }

    render(viewNames, params = {}) {
        let html = getFullHTML(viewNames);
        for (const key in params) {
            if (!params.hasOwnProperty(key)) {
                continue;
            }
            const value = params[key];
            html = html.replace(`{{${key}}}`, value);
        }
        this.response.end(html);
    }
}

module.exports = Renderer;