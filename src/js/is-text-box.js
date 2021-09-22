const isTextBox = (element) => {
    var tagName = element.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') return true;
    else return false;
}

export default isTextBox;
