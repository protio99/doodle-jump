//DOMContentLoaded means that the eventit's going to be fire once the HTML file has been completly readed
//It substitute put the script tag at the end of the file
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    const startButton = document.createElement('button')
    const h2 = document.createElement('h2')
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0

    function createStartButton() {
        let tittle = "Doodle Jump"
        let label = 'Start'
        const p = document.createElement('p')
        grid.appendChild(h2)
        grid.appendChild(startButton)
        startButton.classList.add('start-button')
        h2.classList.add('tittle')
        startButton.innerText = label
        // startButton.appendChild(p)
        h2.innerText = tittle
        // p.innerText = label



    }
    function createDoodler() {
        grid.appendChild(doodler)
        //classList.add help us to add a new class to an element
        doodler.classList.add('doodler')
        //element.style add inline styles ex <div class="doodler" style="left: 50px; bottom: 150px;"></div>
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = `${doodlerLeftSpace}px`
        doodler.style.bottom = `${doodlerBottomSpace}px`
    }

    class Platform {
        constructor(newPlatBottom, i) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')
            this.i = i
            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = `${this.left}px`
            visual.style.bottom = `${this.bottom}px`
            grid.appendChild(visual)

        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            //600 height of the grid
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom, i)
            platforms.push(newPlatform)

        }
    }
    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                //con platform
                platform.bottom -= 4
                // console.log("----", platform.bottom);
                let visual = platform.visual
                // console.log("visual", visual);
                visual.style.bottom = `${platform.bottom}px`
                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score++
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)

                }
            })

        }

    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 20
            doodler.style.bottom = `${doodlerBottomSpace}px`
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }

        }, 30)
    }

    function fall() {

        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 5
            doodler.style.bottom = `${doodlerBottomSpace}px`
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 28) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log("Landed");
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })

        }, 30);
    }

    function gameOver() {
        console.log("Game over");
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)

    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            console.log("Left");
            moveLeft()

        } else if (e.key === "ArrowRight") {
            console.log("Right");
            moveRight()

        } else if (e.key === "ArrowUp") {
            console.log("Up");
            moveStraight()
        }

    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false

        }
        isGoingLeft = true
        leftTimerId = setInterval(() => {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5
                doodler.style.left = `${doodlerLeftSpace}px`

            } else moveRight()
        }, 20)


    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false

        }
        isGoingRight = true
        rightTimerId = setInterval(() => {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 5
                doodler.style.left = `${doodlerLeftSpace}px`

            } else moveLeft()
        }, 20)

    }

    function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)

    }
    createStartButton()
    startButton.addEventListener('click', start)
    function start() {
        if (!isGameOver) {
            grid.removeChild(startButton)
            grid.removeChild(h2)
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keyup', control)


        }
    }

})