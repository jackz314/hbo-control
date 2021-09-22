import setupKeybinds from './setup-keybinds.js';

let prevVid;

function uiReady() {
    let v_list = document.querySelector('video');
    if (v_list?.length > 0) {
        setupKeybinds(v_list[0]);
    }
    //listen for DOM changes
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };
    const observer = new MutationObserver((mutations, me) => {
        let v_list = document.getElementsByTagName('video');
        if (v_list.length > 0 && prevVid !== v_list[0]) {//have video and video changed
            prevVid = v_list[0];
            setupKeybinds(v_list[0]);//set keybinds to new video
            // me.disconnect();//keep listening for video changes
        }
    });
    observer.observe(document.body, config);
}

export default uiReady;
