const CONSTANTS = {
    GRAVITY: 0.7,
}

export default class Character {
    constructor(options) {
        this.pos = options.pos
        this.vel = options.vel
        this.height = options.height
        this.width = options.width
        this.game = options.game
        this.isAttacking = false
        this.attackBox = {
            pos: {
                x: this.pos.x + this.width,
                y: this.pos.y
            },
            height: 75,
            width: 56
        }
        this.attackDir = null
        this.isInvulnerable = false
        this.health = null

        this.image = new Image()
        this.framesMax = options.framesMax
        this.frameX = options.frameX
        this.frameY = options.frameY
        this.frameWidth = options.frameWidth
        this.frameHeight = options.frameHeight
        this.offsetX = 50
        this.offsetY = 20
        this.offsetWidth = 0
        this.offsetHeight = 0

        this.framesElapsed = 0
        this.staggerFrames = 10
        this.playerState = "idle"
        this.spriteAnimations = []
        this.animationStates = []
        
    }

    draw(ctx) {
        // ctx.fillStyle = "red"
        // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)

        // attack box dir changes depending on if left or right arrow key is pressed
        if (this.attackDir === "rightFacing") {
            this.attackBox.pos.x = this.pos.x + this.width
        } else {
            this.attackBox.pos.x = this.pos.x - this.attackBox.width
        }
        this.attackBox.pos.y = this.pos.y + 5 // offset to align with attack
        
        // display attack only when attack key is pressed
        // if (this.isAttacking) {
            // ctx.fillStyle = "orange"
            // ctx.fillRect(
            //     this.attackBox.pos.x, 
            //     this.attackBox.pos.y,
            //     this.attackBox.width, 
            //     this.attackBox.height)
        // }

        ctx.drawImage(
            this.image, 
            this.frameX, 
            this.frameY, 
            this.frameWidth, 
            this.frameHeight,
            this.pos.x - this.offsetX, // offset to align left to hitbox
            this.pos.y - this.offsetY, // offset
            this.offsetWidth, // scale
            this.offsetHeight // scale
            )



        // temp hp display on top of character
        ctx.save()
        ctx.textAlign = "center"
        ctx.font = "50px Arial"
        ctx.fillStyle = "white"
        ctx.fillText(this.health, 
            this.pos.x + this.width * 0.5, 
            this.pos.y - 10)
        ctx.restore()
    }

    applyGravity() {
        // apply gravity
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.vel.y += CONSTANTS.GRAVITY
        this.collideWithFloor()
    }

    isOutofHP() {
        return this.health <= 0
    }

    collideWithFloor() {
        const characterBase = this.pos.y + this.height + this.vel.y
        if (characterBase >= 574) {
            this.vel.y = 0
        }
    }

    collideWith(otherObject) {
        // default do nothing
    }

    isCollidedWith(otherObject) {
        // default do nothing
    }

    // code from Franks Laboratory
    animateFrames() {
        let pos = Math.floor(this.framesElapsed/this.staggerFrames) % 
        this.spriteAnimations[this.playerState].loc.length
        this.frameX = this.frameWidth * pos
        this.frameY = this.spriteAnimations[this.playerState].loc[pos].y
        this.framesElapsed++
    }

    // animateFrames2() {
    //     this.framesElapsed++
    
    //     if (this.framesElapsed % this.framesHold === 0) {
    //         if (this.frameX < this.framesMax - 1) {
    //             this.frameX++
    //         } else {
    //             this.frameX = 0
    //         }
    //     }
    // }
}