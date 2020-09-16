const keys = document.querySelectorAll('.key.op');
const mainKeys = document.querySelectorAll('.main');
const btn = document.querySelector('.play');
const btn_cover = document.querySelector('.cover-btn');
const pause = document.querySelector('.reset');
const range = document.getElementById('range');

const windowWidth = window.innerWidth;

const small = windowWidth <= 600 ? true : false;

let speed = 300, seqIndex = 0, intervalId, paused = 0;

// play button
btn.addEventListener('click', e => {
    play();

});

// pause button
pause.addEventListener('click', e => {
    // console.log("reset clicked");
    paused = 1;
    btn_cover.classList.remove('show');
    clearInterval(intervalId);
});

// range slider to adjust speed...
range.addEventListener('input', ev => {
    speed = 600 - range.value
});



// original color and gray color toggle ==> Select or Unselect...
keys.forEach(el => {
    el.addEventListener('click', ev => {

        if (paused) {

            // el.classList.toggle('selected' ) ;            // el.classList.toggle('disabled') ;

            if (el.classList.contains('disabled')) {
                el.classList.add('rz');
            }
            // return ;
        }

        el.classList.toggle('selected');
        el.classList.toggle('disabled');
    })
})



// play individual sounds on leftmost keys
mainKeys.forEach(el => {
    el.addEventListener('click', (ev) => {
        let atr = el.getAttribute('data-key');
        // console.log({ el }, atr);
        let audio = document.querySelector(`audio[data-key="${atr}"]`);
        audio.currentTime = 0;
        audio.play();
    })
})


// play with selected array

let tempResult ;

function play(e) {

    tempResult = 0 ;

    paused = 0;

    let sequence = [];     // 2D array , contains selected sounds for each column....

    let selected, key;

    for (let i = 1; i <= 8; i++) {                // number of columns => 8

        sequence[i - 1] = [];

        selected = Array.from(document.querySelectorAll(`.selected[data-col="${i}"]`));       // select selected elements from each column....

        tempResult += selected.length ;

        selected.forEach(el => {
            key = el.getAttribute('data-key');

            sequence[i - 1].push({ "music": document.querySelector(`audio[data-key="${key}"]`), "elem": el, i: 0 });

        })
    }

    playSound(sequence, 1);
}


let roundCounter = 0 ;

// play sounds
function playSound(sequence, ans) {

    // console.log(sequence , tempResult ) ;



    if(tempResult == 0) {
        // console.log("Length 0 , dont play!!")
        return ;
    }

    btn_cover.classList.add('show');

    intervalId = setInterval(() => {

        if (seqIndex >= 8) {
            seqIndex = 0;
            // console.log(seqIndex) ;
            roundCounter++ ;
        };

        sequence[seqIndex].forEach(sounds => {
            sounds.music.currentTime = 0;

            // remove rotation
            sounds.elem.classList.remove('rz');

                if (roundCounter % 2 == 0) {
                    sounds.elem.style.transform =  ( small ? 'scale(0.9)' : 'rotate(3deg)' )
                } else {
                    sounds.elem.style.transform = ( small ? 'scale(1.05)' : 'rotate(-3deg)') 
                }
            // } 

            sounds.music.play()
        });
        seqIndex++;

    }, speed);

}


