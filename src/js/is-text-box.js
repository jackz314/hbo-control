function isTextBox(element) {
    var tagName = element.tagName.toLowerCase();
    return (tagName === 'input' || tagName === 'textarea');
}

export default isTextBox;
