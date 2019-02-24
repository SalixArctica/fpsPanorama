const iohook = require('iohook');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const config = require('./config.json');
const ffi = require('ffi'),
user32 = ffi.Library('user32', {
    'mouse_event': ['void', ['int', 'int', 'int', 'int', 'int']]
});;



iohook.on('keydown', event => {
    if(event.rawcode == 80 && event.altKey) {
        console.log('hot key triggered');

        
        for(let i = 0; i < 16; i++) {
            
            setTimeout(() => {
                let filename = 'screenshot' + i + '.jpg';
                screenshot()
                    .then((img) => {
                        console.log(`writing ${config.screenshotFolder + filename}`);
                        fs.writeFile(config.screenshotFolder + filename, img, (err) => 
                            err ? console.log : null
                        );
                    })
                    .catch(err => console.error);

                user32.mouse_event(1, 500 ,0 ,0 ,0);

            }, 1000 * i);
        }
        
    }
});

iohook.start();