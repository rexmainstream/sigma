import add_inline_animation from '../../res/scripts/animation_timing.js';
import { Fireworks } from '../../res/scripts/fireworks.js'

//Creates some fireworks when user finishes their focus. Yay!
export function render_fireworks() {
    const body = document.querySelector('main')
    const container = document.createElement('div');
    let time_out
    container.id = "fireworks";
    body.append(container)

    //Uses library routine
    const fireworks = new Fireworks(container, {
        rocketsPoint: 50,
        hue: { min: 0, max: 360 },
        delay: { min: 15, max: 30 },
        speed: 2,
        acceleration: 1.05,
        friction: 0.95,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        autoresize: true,
        brightness: { 
          min: 50, 
          max: 80,
          decay: { min: 0.015, max: 0.03 }
        },
        mouse: { 
          click: false, 
          move: false, 
          max: 3 
        },
        boundaries: { 
          x: 50, 
          y: 50, 
          width: container.clientWidth, 
          height: container.clientHeight 
        },
        sound: {
            enable: false
        }
    });
    fireworks.start();

    //After ten seconds it hides the fireworks and removes the container
    time_out = setTimeout(function() {
      add_inline_animation(container, 'fade_out', "3s", "ease-in", "", "", function() {
        fireworks.stop();
        body.removeChild(container);
      })
    }, 10000);

}