const studentsData = [
    {
        ime: "John",
        fakultet: "FINKI",
        prosek: 8.2,
        grad: "Skopje"
    },
    {
        ime: "Jane",
        fakultet: "FIKT",
        prosek: 9.3,
        grad: "Bitola"
    },
    {
        ime: "Mile",
        fakultet: "Goce Delcev",
        prosek: 7.6,
        grad: "Stip"
    },
    {
        ime: "Oliver",
        fakultet: "FIKT",
        prosek: 8.9,
        grad: "Skopje"
    },
    {
        ime: "Timco",
        fakultet: "American College",
        prosek: 9.9,
        grad: "Struga"
    },
    {
        ime: "Trpe",
        fakultet: "FINKI",
        prosek: 10,
        grad: "Ohrid"
    },
    {
        ime: "Marija",
        fakultet: "FINKI",
        prosek: 9.2,
        grad: "Resen"
    },
    {
        ime: "Ana",
        fakultet: "FINKI",
        prosek: 7.2,
        grad: "Skopje"
    },
    {
        ime: "Elena",
        fakultet: "FIKT",
        prosek: 6.0,
        grad: "Bitola"
    },
]


// Task 1: Find all students from SKopje and print their names

const studentsFilter = studentsData
.filter(student => student.grad === "Skopje")
// console.log(studentsFilter)

// Task 2: Get all students ascending by prosek

const studentsSort = studentsData
.sort ((a, b) => a.prosek - b.prosek)
// console.log(studentsSort)

// Task 3: Find best student (one) from FINKI

function findBestStudent(studentsData, fakultet) {
    let studentsByFakultet = studentsData.filter(student => student.fakultet === fakultet)

    studentsByFakultet.sort((a, b) => b.prosek - a.prosek)

    return studentsByFakultet[0]
}

let bestStudent = findBestStudent(studentsData, "FINKI")
// console.log(bestStudent)

// Task 4: Find worst student (one) from Bitola

const studentsFromBitola = studentsData.filter(student => student.grad === "Bitola")

const worstStudent = studentsFromBitola.reduce((lowest, current) => {
    return lowest.prosek < current.prosek ? lowest : current
})

// console.log(worstStudent)

// Task 5: Podredete gi gradovite spored nivnite proseci, opagacki

const poGrad = {}
for (let student of studentsData) {
    if(poGrad[student.grad]) {
        poGrad[student.grad].push(student)
    } else {
        poGrad[student.grad] = [student]
    }
}
console.log(poGrad)

const gradovi = []
for (let grad in poGrad) {
    const studentiVoGrad = poGrad[grad]
    const prosekPoGrad = studentiVoGrad.reduce((sum, student) => sum + student.prosek, 0) /  studentiVoGrad.length
    gradovi.push({ grad, prosek: prosekPoGrad})
}

gradovi.sort((a, b) => b.prosek - a.prosek)
// console.log(gradovi)



