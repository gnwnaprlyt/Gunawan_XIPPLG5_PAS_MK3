let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

// Menetapkan event listener untuk setiap kotak pada papan permainan
boxes.forEach(e => {
    e.innerHTML = ""
    e.addEventListener("click", () => {
        // bagian Memastikan permainan belum berakhir dan kotak belum terisi
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    })
})

// bagian untuk menjalankan program if & else
// Fungsi untuk mengganti giliran pemain
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Fungsi untuk mengecek ada pemenang alias untuk yg
function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
// Bagian Pengulangan
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // Jika ada pemenang, mengakhiri permainan dan menampilkan hasil pemenang
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " Menang ";
            document.querySelector("#play-again").style.display = "inline"

            // Memberi warna latar belakang pada kotak yang membentuk garis kemenangan
            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

// Fungsi untuk mengecek apakah permainan berakhir seri
function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        })

        // Jika seri, mengakhiri permainan dan menampilkan hasil Pemenang
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Seri";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

// Menetapkan event listener untuk tombol "Play Again" atau bermain lagi
document.querySelector("#play-again").addEventListener("click", () => {
    // Mengatur ulang variabel dan tampilan untuk memulai permainan baru
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Mengatur ulang setiap kotak pada papan permainan
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})
