const setupKeybinds = (v) => {
    document.body.onkeydown = (e) => {
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
};

modules.export = setupKeybinds;
