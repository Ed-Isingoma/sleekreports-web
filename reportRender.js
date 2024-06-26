document.querySelector('.populator').addEventListener('click', () => { populate() })

const subjsList = ['ENGLISH', 'PHYSICS', 'HISTORY', 'GEOGRAPHY', 'BIOLOGY', 'MATHEMATICS', 'CHEMISTRY', 'PHYSICAL EDUCATION', 'AGRICULTURE', 'ENTREPRENEURSHIP', 'ART', 'ICT', 'CRE', 'IRE', 'LUGANDA', 'LITERATURE', 'KISWAHILI']
const eoysubjsList = ['ENGLISH', 'PHYSICS', 'ENTREPRENEURSHIP', 'LITERATURE', 'GEOGRAPHY', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY', 'HISTORY', 'ICT', 'CRE', 'LUGANDA', 'KISWAHILI', 'IRE', 'PHYSICAL EDUCATION', 'ART', 'AGRICULTURE']
const svaArr = ['Mathematical Computation', 'Communication', 'Creativity', 'Commitment', 'Critical Thinking', 'Cooperation', 'Self-directed learning', 'Problem solving', 'ICT proficiency', 'Logical thinking', 'Leadership', 'Empathy', 'Kindness', 'Sharing', 'Unnecessarily talkative', 'Generally stubborn', 'Often sleepy during class', 'Helpful', 'Disrupts normal order during class', 'Tends to be inactive'] //this relates to titlesArr in the server upstream

let bodyWrdsData;//new: after adding data to this, dispatch event on populator
let topicsArrrs;
fetch('https://sleekreportsserver.onrender.com/schdata', {
    // fetch('http://127.0.0.1:3000/schdata', { //leave for testing purposes
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        schoolKey: localStorage.getItem("schoolKey")
    })
}).then(response=> response.json())
.then(resp => {
    bodyWrdsData = resp.theData
    topicsArrrs = resp.theTopics
    // console.log('bodyWrdsData', bodyWrdsData)
    // console.log('topicsArrrs', topicsArrrs)
    localStorage.removeItem('schoolKey')
    document.querySelector('.populator').dispatchEvent(new MouseEvent("click"))
})

function populate() {
    let itsThirdTerm = false
    //setting up divs for eoy assessment results
    //these are declared in wider scope because someone else needs them
    const eoycover = document.createElement('div')
    const eoybodyrow = document.createElement('div')
    if (itsThirdTerm) {
        eoycover.className = 'eoycover'
        const eoycoverHeading = document.createElement('div')
        eoycoverHeading.className = 'eoycoverHeading'
        // eoycoverHeading.innerHTML = 'END OF YEAR ASSESSMENT'
        eoycoverHeading.innerHTML = ''
        eoycover.appendChild(eoycoverHeading.cloneNode(true))
        const eoyheaderrow = document.createElement('div')
        eoyheaderrow.className = 'eoyheaderrow'
        eoybodyrow.className = 'eoybodyrow'
        const longeoy = document.createElement('div')
        longeoy.className = 'longeoy'
        const shorteoy = document.createElement('div')
        shorteoy.className = 'shorteoy'

        eoyheaderrow.appendChild(longeoy.cloneNode(true))
        eoybodyrow.appendChild(longeoy.cloneNode(true))
        for (let i = 0; i < 4; i++) {
            eoyheaderrow.appendChild(shorteoy.cloneNode(true))
            eoybodyrow.appendChild(shorteoy.cloneNode(true))
        }
        const eoyheaderrowData = ['SUBJECT', 'Formative Score\n(makes up 20%)', 'End Of Year Exam Score\n(makes up 80%)', 'Total Score', 'Grade']

        const eoyheaderrowSlctr = [...eoyheaderrow.querySelectorAll('div')]
        for (let i = 0; i < eoyheaderrowData.length; i++) {
            eoyheaderrowSlctr[i].innerHTML = eoyheaderrowData[i]
        }
        eoycover.appendChild(eoyheaderrow.cloneNode(true))
    }
    for (let i = 1; i < bodyWrdsData.length; i++) {
        const repClone = document.querySelector('.person1').cloneNode(true)
        document.querySelector('body').appendChild(repClone)
    }
    //this code gives names, classes n genders (and shifts them from the array). will also work for old curriculum
    const reportIntros = ['addName', 'addClass', 'addGender']
    for (let r = 0; r < reportIntros.length; r++) {
        for (let i = 1; i <= bodyWrdsData.length; i++) {
            const scoop = bodyWrdsData[i - 1].shift()
            const theTarget = document.querySelectorAll('.person1')[i-1].querySelector(`.${reportIntros[r]}`)
            theTarget.innerHTML = scoop
        }
    }
    //now the real populating. The loop below selects a particular learner
    for (let r = 1; r <= bodyWrdsData.length; r++) {
        const childsClassTopics = +document.querySelectorAll('.person1')[r-1].querySelector('.addClass').innerHTML.substring(2) -1
        const childsFullName = document.querySelectorAll('.person1')[r-1].querySelector('.addName').innerHTML
        const childs1stName = childsFullName.includes(' ') 
  ? childsFullName.split(' ')[1].charAt(0).toUpperCase() + childsFullName.split(' ')[1].slice(1).toLowerCase() 
  : childsFullName.charAt(0).toUpperCase() + childsFullName.slice(1).toLowerCase();

        const voidSubjRow = document.querySelectorAll('.person1')[r-1].querySelector('.forSubj')
        //the second realReport table
        const newTabl = document.createElement('div')
        newTabl.className = 'realReport2'
        newTabl.appendChild(document.querySelectorAll('.person1')[r-1].querySelector('.forHeading').cloneNode(true))
        //working on a single subject
        let pageToll = 0
        for (let b = 0; b < topicsArrrs[childsClassTopics].length; b++) {
            const rowClone = voidSubjRow.cloneNode(true)
            rowClone.querySelector('.subjName').innerHTML = subjsList[b]
            let whetherWeAppend = false
            let rowToll = 0
            for (let dee = 0; dee < topicsArrrs[childsClassTopics][b].length; dee++) {
                if (topicsArrrs[childsClassTopics][b][dee] && bodyWrdsData[r - 1][4 * b + dee]) {
                    const topicDiv = document.createElement('div')
                    topicDiv.classList.add('addTopic')
                    topicDiv.innerHTML = topicsArrrs[childsClassTopics][b][dee]
                    rowClone.querySelector('.leftmid').appendChild(topicDiv)
                    const scoreDiv = document.createElement('div')
                    scoreDiv.classList.add('addScore')
                    scoreDiv.innerHTML = Math.round(+bodyWrdsData[r - 1][4 * b + dee], 3)
                    rowClone.querySelector('.rightmid').appendChild(scoreDiv)
                    rowToll += 1
                    whetherWeAppend = true
                }
            }
            if (whetherWeAppend) {
                //determining the div heights
                if (rowToll == 1) {
                    rowClone.querySelector('.leftmost').style.height = '84px'
                    rowClone.querySelector('.rightmost').style.height = '84px'
                    rowClone.querySelector('.addTopic').style.height = '84px'
                    rowClone.querySelector('.addScore').style.height = '84px'
                    pageToll += 2
                } else {
                    rowClone.querySelector('.leftmost').style.height = `${rowToll * 42}px`
                    rowClone.querySelector('.rightmost').style.height = `${rowToll * 42}px`
                    rowClone.querySelectorAll('.addTopic').forEach(el => el.style.height = '42px')
                    rowClone.querySelectorAll('.addScore').forEach(el => el.style.height = '42px')
                    pageToll += rowToll
                }
                rowClone.querySelector(`.trsRmrks`).innerHTML = calcRmrks(rowClone.querySelectorAll('.addScore'), childs1stName)
                rowClone.style.display = 'block'
                let destinatnTab = document.querySelectorAll('.person1')[r-1].querySelector('.realReport')
                if (pageToll >= 24) {
                    destinatnTab = document.querySelectorAll('.person1')[r-1].querySelector('.realReport').insertAdjacentElement("afterend", newTabl)
                }
                destinatnTab.appendChild(rowClone)
            }
        }
        //the end of year marks table
        if (itsThirdTerm) {
            const studentsEoy = eoycover.cloneNode(true)
            for (let p = 88; p < 105; p++) {//89 to 105 (instead of to bodyWrdsData[r-1].length). That is the range of subjects with EOY marks
                if (bodyWrdsData[r - 1][p]) {
                    const totalAOIs = +bodyWrdsData[r - 1][p + 17]
                    const eoyMrks = +bodyWrdsData[r - 1][p]
                    const studentsEoyrow = eoybodyrow.cloneNode(true)
                    const intoEoybodyrow = [eoysubjsList[p - 88], totalAOIs, eoyMrks, totalAOIs + eoyMrks, calcGrade(totalAOIs + eoyMrks)]
                    const eoyBodyrowDivs = [...studentsEoyrow.querySelectorAll('div')]
                    eoyBodyrowDivs.forEach((e) => { e.innerHTML = intoEoybodyrow[eoyBodyrowDivs.indexOf(e)] })
                    //console.log(studentsEoyrow)
                    studentsEoy.appendChild(studentsEoyrow)
                }
            }
            document.querySelectorAll('.person1')[r-1].querySelector('.sva').before(studentsEoy)
        }
        //removing the first forSubj which is empty
        voidSubjRow.remove()
        //observed skills, values n attitudes
        let weAddedListEl = false;//how to hide SVAs box when its empty
        for (let d = 68; d < 88; d++) {//68 is the index of the first sva item. 4X17. This changes if the num of subjects changes. 88 is the index of the 21st sva item
            if (bodyWrdsData[r - 1][d] == 1) {
                const newSVA = document.createElement('li')
                newSVA.innerHTML = svaArr[d - 68]
                document.querySelectorAll('.person1')[r-1].querySelector('.svas>ul').appendChild(newSVA)
                weAddedListEl = true
            }
        }
        if (!weAddedListEl) {
            document.querySelectorAll('.person1')[r-1].querySelector('.sva').style.display = 'none'
        }
    }
}
function calcGrade(mark) {
    const rangeMin = [0, 30, 40, 50, 60, 70, 80, 90]
    const theGrades = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'A+']
    for (let i = rangeMin.length - 1; i >= 0; i--) {
        if (mark >= rangeMin[i]) return theGrades[i]
    }
    return 'Error 404' //just in case, to prevent an error
}
function calcRmrks(nodelis, name) {
    const rawComms = {
        0: {
            0: `${name} finds it considerably difficult in foundational learning concepts and is encouraged to personally revisit them from the basics`,
            1: `${name}'s efforts of coming to class and participating in class activities may not be fruitful yet but there is more chance to try again next term`,
            2: `${name}'s teacher would like to believe that the outcomes of this term are not a reflection of the learner's inner abilities and love for the subject.`
        },
        1: {
            0: `${name} has grasped little concerning the subject matter and cannot easily recount their experiences with the class activities.`,
            1: `The teacher will keep encouraging your efforts and supporting your endeavors to learn subject content, one step at a time`,
            2: `${name} labours to give attention to the subject with an intention to excel and therefore should not settle for anything mediocre.`
        },
        2: {
            0: `${name} demonstrates evidence of exposure to subject material, although they need more encouragement to perfect their skills and understanding.`,
            1: `${name} has shown consistency in grasping the concepts from the learning activities and the teacher knows that even more can be achieved.`,
            2: `${name} has the ability to consistently show evidence of complete understanding of learning activities but it is not yet being seen clearly.`
        },
        3: {
            0: `${name} exhibits a solid grasp of class concepts and has ability to apply their knowledge and understanding extensively.`,
            1: `${name} is already good at the subject but can also become very good at it in a short while.`,
            2: `The teacher knows that ${name} has put commitment and dedication into their studies and that this is a worthy attribute.`
        },
        4: {
            0: `${name}'s competence in the subject is exceptional and commendable. The learner showed impressive performance and is also able to influence classmates to do the same.`,
            1: `The teacher is very impressed with ${name}'s level of comprehension of subject material.`,
            2: `${name} is a natural talent. Any attempt made to pick the knowledge, skills and values in class yields effortlessly.`
        }
    }
    // const rawComms = {
    //     0: {
    //         0: '1 Comment 1',
    //         1: '1 Comment 2',
    //         2: '1 Comment 3'
    //     },
    //     1: {
    //         0: '2 Comment 1',
    //         1: '2 Comment 2',
    //         2: '2 Comment 3'
    //     },
    //     2: {
    //         0: '3 Comment 1',
    //         1: '3 Comment 2',
    //         2: '3 Comment 3'
    //     },
    //     3: {
    //         0: '4 Comment 1',
    //         1: '4 Comment 2',
    //         2: '4 Comment 3'
    //     },
    //     4: {
    //         0: '5 Comment 1',
    //         1: '5 Comment 2',
    //         2: '5 Comment 3'
    //     }
    // }
    let scores = []
    nodelis.forEach(el => {
        if (el.innerHTML) {
            scores.push(el.innerHTML)
        }
    })
    let avg = 0
    for (let i = 0; i < scores.length; i++) {
        avg += +scores[i]
    }
    avg = avg / scores.length
    let trsComm = ''
    const avgArray = [1.3, 1.75, 2.2, 2.65, 3.1]
    for (let i = 0; i < avgArray.length; i++) {
        if (avg < avgArray[i]) {
            const rand = Math.floor(Math.random() * 3)
            trsComm = rawComms[i][rand]
            break
        }
    }
    return trsComm
}
//later, you can import the currbod from oldcurrtemp

// function convertHTMLToPDF() {
//     const element = document.body;
//     const options = {
//         margin: 0.5,
//         filename: 'generated_pdf.pdf',
//         image: { type: 'jpeg', quality: 1.0 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
//     html2pdf().from(element).set(options).save();
// }
// convertHTMLToPDF()
