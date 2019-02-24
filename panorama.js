const iohook = require('iohook');
const screenshot = require('screenshot-desktop');
const jimp = require('jimp');
const config = require('./config.json');
const ffi = require('ffi'),
user32 = ffi.Library('user32', {
    'mouse_event': ['void', ['int', 'int', 'int', 'int', 'int']]
});;


//listen for hotkey
iohook.on('keydown', event => {
    if(event.rawcode == 80 && event.altKey) {

        console.log('hot key triggered');
        
        for(let i = 0; i < 16; i++) {
            
            //small delay for clear screenshots
            setTimeout(() => {

                //take screenshot
                let filename = 'screenshot' + i + '.jpg';
                handleScreenshot(config.screenshotFolder + filename);

                //move mouse
                user32.mouse_event(1, 500 ,0 ,0 ,0);

            }, 500 * i);
        }   
    }
});

//takes screenshot, crops, and saves it to 'outputFile'
handleScreenshot = outputFile => {

    screenshot() //take screenshot
    .then((imgData) => {

        //crop and save
        jimp.read(imgData)
        .then(image => {
            image
                .crop(300, 130, 1600, 770)
                .write(outputFile);
        });
    })
    .catch(err => console.error);
}

//start listening for hotkey
iohook.start();
console.log("\x1b[32m%s\x1b[0m", 'Ready and listening for hotkey...')