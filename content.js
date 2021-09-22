const isTextBox = element => {
    var tagName = element.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') return true;
    else return false;
}

const setupKeybinds = v => {
    document.body.onkeydown = e => {
        if (e.isComposing || e.keyCode === 229) {//ignore when inside IME
            return;
        }
        if (isTextBox(e.target)) return;
        let key = e.key;
        let command, amount;
        const seek = (time) => v.currentTime += time;
        const changeVol = (vol) => v.volume = Math.min(Math.max(v.volume + vol, 0), 1);
        const isModified = e.ctrlKey || e.altKey;

        switch(key.toLowerCase()) {
          case 'arrowleft':
            command = 'seek';
            amount = isModified ? -5 : -10;
            break;
          case 'arrowright':
            command = 'seek';
            amount = isModified ? 5 : 10;
            break;
          case 'arrowup':
            command = 'changeVol';
            amount = isModified ? 0.1 : 0.05;
            break;
          case 'arrowdown':
            command = 'changeVol';
            amount = isModified ? -0.1 : -0.05;
            break;
          case 'f':
            v.requestFullScreen({
              navigationUI: "hide"
            });
            break;
          case 'm':
            v.muted = !v.muted;
            break;
        }
        if (command) {
          eval(command).call(this, amount);
        }
    }
}

let prevVid;

const uiReady = () => {
    let v_list = document.getElementsByTagName('video');
    if (v_list.length > 0) {
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

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(uiReady, 1);
} else {
    document.addEventListener("DOMContentLoaded", uiReady);
}
