valore = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
cp_valore = []
desorden = []
puzzleBoard = [[], [], [], []]
gameOver = 1
time = 60
setInterval(function () { clock() }, 1000);
win = 0
//inicializacion del arreglo de ids
ids = [[], [], [], []]
for (i = 0; i < 4; i++)
    for (j = 0; j < 4; j++)
        ids[i][j] = i + '_' + j
////////////////////////////////////////////////////////////
soluciones = [ //aqui agregar todas las soluciones posibles
[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]], //simple
[[0, 15, 14, 13], [12, 11, 10, 9], [8, 7, 6, 5], [4, 3, 2, 1]], //simple invertido
[[1, 2, 3, 4], [8, 7, 6, 5], [9, 10, 11, 12], [0, 15, 14, 13]], // escalera
[[0, 15, 14, 13], [9, 10, 11, 12], [8, 7, 6, 5], [1, 2, 3, 4]], // escalera invertida
[[1, 2, 3, 4], [12, 13, 14, 5], [11, 0, 15, 6], [10, 9, 8, 7]], //caracol
[[7, 8, 9, 10], [6, 15, 0, 11], [5, 14, 13, 12], [4, 3, 2, 1]]  //caracol invertido
]
////////////////////////////////////////////////////////////
function CpArray() {
    for (i = 0; i < valore.length; i++)
        cp_valore[i] = valore[i]
}

function RandInt(a) {
    return parseInt((a+1)*Math.random())
}

function Desordenar() {
    i = 0
    while (cp_valore.length) {
        aux = RandInt(cp_valore.length - 1)
        desorden[i++] = cp_valore[aux]
        cp_valore.splice(aux, 1)
    }
}

function FillPuzzleBoard() {
    aux = 0
    for (i in ids)
        for (j in ids[i])
            puzzleBoard[i][j] = desorden[aux++]
}

function PaintPuzzleBoard() {
    for (i in ids)
        for (j in ids[i])
            document.getElementById(ids[i][j]).innerHTML = puzzleBoard[i][j] ? puzzleBoard[i][j]:''
}

function CloseToCero(id) {
    res = 0
    i = j = 0
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) { 
            if (ids[i][j] == id)
                break
        }
        if (ids[i][j] == id)
            break
    }
    if (i > 0)
        if (puzzleBoard[i - 1][j] == 0) {
            res++
            i--
        }
    if (i < 3)
        if (puzzleBoard[i + 1][j] == 0) {
            res++
            i++
        }
    if (j > 0)
        if (puzzleBoard[i][j - 1] == 0) {
            res++
            j--
        }
    if (j < 3)
        if (puzzleBoard[i][j + 1] == 0) {
            res++
            j++
        }
    if (!res)
        i = j = undefined
    return [res, i, j]
}

function __init__() {
    gameOver = 0
    time = 300
    cp_valore = []
    desorden = []
    CpArray()
    Desordenar()
    FillPuzzleBoard()
    PaintPuzzleBoard()
    document.getElementById("resultados").innerHTML = 'te quedan ' + time + ' segundos'
}

function NumberClicked(id) {
    if (time > 0) {
        aux = CloseToCero(id)
        aux2 = [parseInt(id[0]), parseInt(id[2])]
        if (aux[0]) {
            puzzleBoard[aux[1]][aux[2]] = puzzleBoard[aux2[0]][aux2[1]]
            puzzleBoard[aux2[0]][aux2[1]] = 0
        }
        PaintPuzzleBoard()
        if (win = IsSolution()) {
            gameOver = 1
            alert('ganaste')
        }
    } else { 
        alert('perdiste')
    }
}

function IsSolution() {
    res = 0
    aux = 0
    for (i in soluciones) {
        aux = 0
        for (j in soluciones[i]) {
            for (k in soluciones[i][j]) {
                if (soluciones[i][j][k] == puzzleBoard[j][k]) {
                    aux++
                }
                if (aux == 16) {
                    res++
                    break
                }
                if (res)
                    break
            }
            if (res)
                break
        }
        if (res)
            break
    }
    return res
}

function clock() {
    if (!gameOver)
        time--
    if (time < 0) {
        time = 0
        gameOver = 1
    }
    if(!gameOver)
        document.getElementById("resultados").innerHTML = 'te quedan ' + time + ' segundos'
}

