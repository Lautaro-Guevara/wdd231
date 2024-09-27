const year = document.querySelector("#year");

const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

lastModified.innerHTML = `Last modification: <span class="highlight">${document.lastModified}</span>`;

const mainnav = document.querySelector('.nav')
const hambutton = document.querySelector('#hamburger-menu');


hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    }
]



function renderCourses(filter = 'All') {
    const divCourses = document.getElementById("courses");
    divCourses.innerHTML = ""; // Limpiar contenido previo

    const filteredCourses = filter === 'All' 
        ? courses 
        : courses.filter(course => course.subject === filter);

    filteredCourses.forEach(course => {
        const courseBlock = document.createElement("div");
        courseBlock.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;

        courseBlock.innerHTML = `
            <button class="open-button" data-index="${course.number}">
                ${course.subject} ${course.number}
            </button>

            <div class="modal-container" id="modal-container-${course.number}">
                <div class="modal">
                    <span class="close" data-index="${course.number}">&times;</span>
                    <h1>${course.title}</h1>
                    <p>${course.description}</p>
                </div>
            </div>
        `;

        divCourses.appendChild(courseBlock);
    });

    // Funcionalidad para abrir y cerrar los modales
    document.querySelectorAll(".open-button").forEach(button => {
        button.addEventListener("click", function () {
            const index = button.getAttribute("data-index");
            const modal = document.getElementById(`modal-container-${index}`);
            modal.style.display = "block";
        });
    });

    document.querySelectorAll(".close").forEach(closeButton => {
        closeButton.addEventListener("click", function () {
            const index = closeButton.getAttribute("data-index");
            const modal = document.getElementById(`modal-container-${index}`);
            modal.style.display = "none";
        });
    });
}


renderCourses();

function displayTotalCredits() {
    const totalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
    const creditsContainer = document.getElementById("total-credits");
    creditsContainer.innerHTML = `Total Credits Required: ${totalCredits}`;
}


displayTotalCredits();
