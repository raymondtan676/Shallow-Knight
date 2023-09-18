import Player from "./player";
import Boss from "./boss";

export default class Game {
    constructor(ctx) {
        this.player = new Player({
            pos: {
                x: 0,
                y: 574 - 250,
            },
            vel: {
                x: 0,
                y: 0,
            },
            game: this,
            health: 3
        });
        this.boss = new Boss({
            pos: {
                x: 450,
                y: 0,
            },
            vel: {
                x: 0,
                y: 0,
            },
            game: this,
            health: 20
        });
        this.projectiles = [];
        this.ctx = ctx
    }

    static DIM_X = 1000
    static DIM_Y = 574

    add(object) {
        if (object instanceof Player) {
            this.player.push(object)
        } else if (object instanceof Boss) {
            this.boss.push(object)
        }
    }
    
    allObjects() {
        return [this.player, this.boss] // this.projectiles
    }

    draw() {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        this.allObjects().forEach((object) => {
            object.draw(this.ctx)
        })
    }

    updateObjects() {
        this.allObjects().forEach((object) => {
            object.update()
        })
    }

    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];
                // console.log(obj1.isCollidedWith(obj2))
                if (obj1 === obj2) continue

                if (obj1.isCollidedWith(obj2)) {
                    // console.log("collided")
                //     const collision = obj1.collideWith(obj2);
                //     if (collision) return;
                }
            }
        }
    }

    step() {
        this.updateObjects()
        this.checkCollisions()
    }
    // isOutofBounds(pos) {
    //     return (pos[0] < 0) || (pos[1] < 0) ||
    //     (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
    // }

    play() {
        this.running = true
        this.animate()
    }

    restart() {
        this.running = false
        // this.player = new Player
        // this.level = level 1
    }

    // depending on movement state, adjust player's x or y axis
    

    animate() {
        this.step()
        this.draw()
        requestAnimationFrame(this.animate.bind(this))
    }

}