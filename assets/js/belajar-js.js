let greeting = "Selamat pagi!"  // type data string menggunakan " "
let ucapanSelamat = 'Congratulations!' // type data string menggunakan ' '

let age = 19                    // type data number

// alert("20" + "30") // concatenation
// alert(134 + 277)    // math operation

let lampIsOn = true             // type data boolean

// if lampIsOn then turn on TV
// lampIsOn true >>> TV nyala
// lampIsOn false >>> TV tidak nyala

let boxContain = undefined      // type data undefined
let bagContain = null           // type data null

let person = {                  // type data object
    firstName: "Karunia",
    lastName: "Leo",
    address: "Bintaro"
}

let pesertaBootcamp = ["Ahmad Ainul", "Alex Josua", "Husni Fatah"]  // array of strings

let bilanganPrima = [2, 3, 5, 7, 11, 13] // array of number

let pesertaBootcampObject = [           // array of objects
    {
        firstName: "Naufal",
        lastName: "Ilyasa"
    },
    {
        firstName: "Rizal",
        lastName: "Khudori"
    }
]



for(let index = 3; index < 3; index++) {
    console.log(greeting + index)
}