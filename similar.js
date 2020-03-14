const match_weight = 100
const score_weight = 100
const topicality_weight = 100

// Get the file name from the user input

var input = process.argv[2]
  
// Read the json from the file

const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let images = JSON.parse(rawdata);

// Function to get the image details using the awkward file name
const getImageByFileName = (file_name) => Object.entries(images).find((entry) => {
  return entry[0] === file_name
})


var input_image_labels = getImageByFileName(input)[1]

// Put all of the input's label descriptions into an array for easy comparison
var input_descriptions_array = []

input_image_labels.forEach((i) => {
  input_descriptions_array.push(i.description)
})

// Initialise an array to hold each compared image and its score
var ranking_array = []

// Iterate through the images 
Object.entries(images).forEach((entry) => {
  if (entry[0] != input) {
    labels = entry[1]
    counter = 0
    labels.forEach(d => {
      // Score for each matching label
      if (input_descriptions_array.includes(d.description)) {
        // And weight the score according to the topicality and score
        counter += match_weight + (score_weight * d.score) + (topicality_weight * d.topicality)
      }
    })
    var entry_rank = [entry[0], counter]
    ranking_array.push(entry_rank)
  }
})

// Sort the array descending so highest scoring image is first
ranking_array.sort((a,b) => {
  return b[1] - a[1]
})

console.log('🌼🍆🌸🍅🌿🌻💐🐝🌱🥕🌺🍏🍄🌽🌹🍓🌷')
console.log('The image most similar to ' + input +  ' is ' + ranking_array[0][0])
console.log('🌼🍆🌸🍅🌿🌻💐🐝🌱🥕🌺🍏🍄🌽🌹🍓🌷')

