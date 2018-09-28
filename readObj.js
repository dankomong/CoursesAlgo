const fs = require("fs");

let rawdata = fs.readFileSync('courses.json');
let a = JSON.parse(rawdata);

// console.log(courses)
let conflicts = 0;
let newArr = [];
let output = {};
let reasonArr = [];
let counter = 0;
let counts = {};
let highestNumber = '0';

    for (let oneOfTwo in a){
      if (oneOfTwo === "courses"){
        for (let courseCode in a[oneOfTwo]) {
          if (a[oneOfTwo].hasOwnProperty(courseCode)) {
            let obj1 = a[oneOfTwo][courseCode];
            for (let attrs in obj1) {
              if (obj1.hasOwnProperty(attrs) && attrs === "sections") {
                let obj2 = a[oneOfTwo][courseCode][attrs];
                for (let sectionNum in obj2) {
                  let obj3 = a[oneOfTwo][courseCode][attrs][sectionNum];
                  if (obj2.hasOwnProperty(sectionNum)) {
                    for (let sectionNumAttr in obj3) {
                      if (obj3.hasOwnProperty(sectionNumAttr) && sectionNumAttr === "finalExam") {
                        let obj4 = a[oneOfTwo][courseCode][attrs][sectionNum][sectionNumAttr]
                        for (let finalExamAttr in obj4){
                          if (obj4.hasOwnProperty(finalExamAttr) && finalExamAttr === "conflicts"){
                            let obj5 = a[oneOfTwo][courseCode][attrs][sectionNum][sectionNumAttr][finalExamAttr]
                            if (Object.keys(obj5).length > 0){
                              conflicts += Object.keys(obj5).length
                            }
                            for (let conflict in obj5) {
                              if (obj5.hasOwnProperty(conflict)) {
                                let obj6 = a[oneOfTwo][courseCode][attrs][sectionNum][sectionNumAttr][finalExamAttr][conflict];
                                for (let k = 0; k < obj6.length; k++) {
                                  if (parseInt(highestNumber) < parseInt(obj6[k].reason)) {
                                    console.log("parse", parseInt(obj6[k].reason))
                                    highestNumber = obj6[k].reason;
                                  }

                                }
                                 reasonArr.push(highestNumber)
                              }
                            }

                          }
                        }
                      }
                    }
                  }
                }
                reasonArr.forEach(x => counts[x] = (counts[x] || 0)+1);
                console.log('fucking', counts)

                output = {
                  courseCode,
                  conflicts,
                  type: counts
                };
                newArr.push(output)
                conflicts = 0;
              }
            }
          }
          reasonArr = [];
          counts = {};
        }
      }
    }

//console.log('asdf', newArr)
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i].conflicts === 0) {
      newArr.splice(i, 1);
    }
  }

  console.log('final array', newArr)
