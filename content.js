const isTextBox = element => {
    var tagName = element.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') return true;
    else return false;
    // if (tagName !== 'input') return false;
    // var type = element.getAttribute('type').toLowerCase(),
    //     // if any of these input types is not supported by a browser, it will behave as input type text.
    //     inputTypes = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week']
    // return inputTypes.indexOf(type) >= 0;
}

const setupKeybinds = v => {
    document.body.onkeydown = e => {
        if (e.isComposing || e.keyCode === 229) {//ignore when inside IME
            return;
        }
        if (isTextBox(e.target)) return;
        // console.log(e);
        //space play/pause
        let key = e.key;
        const seek = time => {
            v.currentTime += time;
        }
        const changeVol = vol => {
            v.volume = Math.min(Math.max(v.volume + vol, 0), 1);//limit to range between 0 and 1
        }
        if(e.shiftKey || e.altKey) return;
        if(e.ctrlKey || e.metaKey){ //meta key on macOS?
            if(key === 'ArrowRight'){
                seek(5);
            }else if(key === 'ArrowLeft'){
                seek(-5);
            }
        }else{
            // e.stopPropagation();
            // if (key === ' '){
            //     e.preventDefault();//prevent scroll or element select
            //     if(v.paused) v.play();
            //     else v.pause();
            // 
            // }
            //seeking
            if(key === 'ArrowRight'){
                seek(10);
            }else if(key === 'ArrowLeft'){
                seek(-10);
            //change volume by 5%
            }else if(key === 'ArrowUp'){
                changeVol(0.05);
            }else if(key === 'ArrowDown'){
                changeVol(-0.05);
            }else if(key.toLowerCase() === "m"){
                v.muted = !v.muted;
            }
            // }else if(key.toLowerCase() === "c"){
            //     if(ccBtn) ccBtn.click();
            // }
            // else if(key.toLowerCase() === "f"){
            //     e.preventDefault();
            //     if(fullScreenBtn) fullScreenBtn.click();
            // }
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