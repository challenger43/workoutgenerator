const upperBodyWorkouts = ["tricep dips", "arm circles", "pushups", "arm front raises", "arm lateral raises"]
const legWorkouts = ["bodyweight squats", "lunge/reverse lunges", "calf raises", "step ups", "straight leg raises"]
const abWorkouts = ["situps", "curl up/crunches", "oblique heel touches", "mountain climbers", "Russian Twist"]
const cardioEnduranceWorkouts = ["high knees", "jog(in place)", "upper arm plank", "forearm plank", "squat hold"]
const flexibilityWorkouts = ["hamstring stretch", "downward dog", "quad stretch", "butterfly stretch", "hip stretch"]
//arrays holding workouts
const bodySectionCheckboxes = document.getElementsByName("bodySections")
const intensityLevel = document.getElementsByName("workoutIntensity")
const para1 = document.getElementById("para1")
//get stuff from html
const maxBodySectionCheckables = 3;
//number set to max checkboxes of body sections you can have at once else there will be an array getting thrown
let bodySectionCheckedCount = 0;
let selectedBodySections = []; //an array that holds all check boxes actively checked
let selectedIntensityValue; //the variable holding what the radio button holding intensity level's value is
let numReps; //pre initializing the various variables that are needed in the generate workout function
let numExercises;
let finalWorkout;
let workoutType;

for (const bodySectionCheckbox of bodySectionCheckboxes) { //finds what values are selected from the checkbox and puts it into an array for future usage 
    bodySectionCheckbox.addEventListener("change", function () { //add event listener attaches a function to if a button changed everytime as in when the button is changed the function below is called
        if (this.checked) {
            if (selectedBodySections.length >= maxBodySectionCheckables) { //checks if there are alread 3 boxes checked, meaning you cannot check it again
                this.checked = false;
                alert(`You can only select up to ${maxBodySectionCheckables} options.`); //sends alert
                return;
            }
            selectedBodySections.push(this.value); //if it isn't max array length, it will push it to the end of the array selectedBodySections
        } else {
            selectedBodySections = selectedBodySections.filter(value => value !== this.value); // Remove from array if unchecked, for each value if the value doesn't equal the value that is checked/ want to remove
            //it will evaluate to true and those that are true and put it into a new array, which will then be assigned to the same selectedBodySections array. 
        }
    });
}
function getSelectedIntensity() { //gets the selected intensity by upon clicking generateWorkout it will call this, get the selected intensity if it exists, which then goes into getValues as a parameter.
    let selected = document.querySelector('input[name="workoutIntensity"]:checked');
    return selected ? selected.value : null; //condition if true ? if false return as null
}
function generateWorkout(intensity) {
    if (getSelectedIntensity() && selectedBodySections.length !== 0) {
        selectedIntensityValue = intensity
        para1.innerHTML = "" //resets the paragraph thing where the actual workout will spawn 
        switch (selectedIntensityValue) { //sets the cases for each possible selectedIntensityValue
            case "low":
                numReps = 5
                numExercises = 1
                break
            case "medium":
                numReps = 15
                numExercises = 3
                break
            case "high":
                numReps = 25
                numExercises = 5
                break
            default:
                numReps = 10
                numExercises = 4
                break
        }
        let tempArray = [] //create temporary arrays to shuffle workouts
        let tempValue;
        let feederWorkout
        for (let section of selectedBodySections) { //sets each temporary feederworkout array to the workout array selected by checkbox for each body section selected
            switch (section) {
                case "upperBody":
                    feederWorkout = upperBodyWorkouts
                    workoutType = "reps"
                    break
                case "legs":
                    feederWorkout = legWorkouts
                    workoutType = "reps"
                    break
                case "abs":
                    feederWorkout = abWorkouts
                    workoutType = "reps"
                    break
                case "endurance":
                    feederWorkout = cardioEnduranceWorkouts
                    workoutType = "time"
                    break
                case "flexibility":
                    feederWorkout = flexibilityWorkouts
                    workoutType = "time"
                    break
            }
            let lenArray = feederWorkout.length
            for (let i = 0; i < lenArray; i++) { //shuffle the array
                tempValue = feederWorkout[Math.floor(Math.random() * feederWorkout.length)]  //pick a random index from feederWorkout and set that to tempValue
                tempArray.push(tempValue) //put tempValue into tempAray 
                feederWorkout = feederWorkout.filter(value => value !== tempValue) //remove tempValue from the original array 
            }
            for (let i = 0; i < numExercises; i++) {
                feederWorkout.push(tempArray.pop()) //get rid of tempArray by putting the new reordered version into feederWorker
                // console.log(feederWorkout)
            }
            if (workoutType === "reps") { //sets the actual workout text based on what type of workout it was 
                para1.innerHTML += `<h1>Body Section: ${section}</h1> <h2>Exercises:</h2>
                <p>Reps: ${numReps}</p> <p>${feederWorkout.join(", ")}</p>`
            }
            else {
                para1.innerHTML += `<h1>Body Section: ${section}</h1> <h2>Exercises:</h2> 
                <p>Time: ${numReps} seconds</p> <p>${feederWorkout.join(", ")}</p>`;
            }
        }
    }
    else {
        alert("Please fill out the whole form");
    }
}