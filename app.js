//DOMContentLoaded means that the eventit's going to be fire once the HTML file has been completly readed
//It substitute put the script tag at the end of the file
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')

    function createDoodler(params) {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
    }

    createDoodler()

})