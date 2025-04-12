// const { PrismaClient, LivingType } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   // Off-Campus Questions 
//   const offCampusQuestions = [
//     // SHARING / EXPENSES
//     {
//       text: "How should we pay utilities?",
//       options: JSON.stringify([
//         "Split costs evenly",
//         "Separate utility expenses (e.g. One pays for hydro, one pays for internet)"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "What are your thoughts on sharing and borrowing?",
//       options: JSON.stringify([
//         "Let’s share everything - no need to ask",
//         "You can probably borrow my stuff - just ask first",
//         "I won’t say no in an emergency (I prefer to not share)",
//         "Sorry, I don’t ever lend my stuff to others"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How should we share common-use items?",
//       options: JSON.stringify([
//         "Take turns buying",
//         "Split costs evenly",
//         "Buy our own items separately"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How should we share common food items?",
//       options: JSON.stringify([
//         "Take turns buying",
//         "Split costs evenly",
//         "Buy our own items separately"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },

//     // CLEANLINESS / UPKEEP
//     {
//       text: "How tidy are you?",
//       options: JSON.stringify([
//         "Could eat off the floor",
//         "Everything is put away",
//         "A little messy",
//         "Where’s the floor?"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "What’s your kitchen like?",
//       options: JSON.stringify([
//         "Always sparkling clean",
//         "Clean and mostly tidy",
//         "Good luck finding stuff",
//         "Salmonella’s best friend"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "What’s your bathroom like?",
//       options: JSON.stringify([
//         "Spotlessly clean - daily tidy",
//         "Pretty good - weekly clean",
//         "Not bad - monthly clean",
//         "Not sure - no cleaning products"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How do you handle dishes?",
//       options: JSON.stringify([
//         "Washed/put away daily",
//         "Washed/dry overnight",
//         "Wash in morning after overnight soak",
//         "Wash only when everything else is dirty"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How will we handle cleaning?",
//       options: JSON.stringify([
//         "Rotate cleaning assignment",
//         "Permanent cleaning assignment",
//         "Decide when need for cleaning arises"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How often will you do your share of cleaning?",
//       options: JSON.stringify([
//         "Daily",
//         "Weekly",
//         "Bi-weekly",
//         "Once a month",
//         "When desired"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },

//     // LIFESTYLE
//     {
//       text: "Do you smoke? (Cigarettes, shisha, etc.)",
//       options: JSON.stringify(["Yes", "Yes, but not in the house", "No"]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Does smoking bother you?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Do you have pets?",
//       options: JSON.stringify(["Dog", "Cat", "Other furry critter", "Fur-less critter", "None"]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Do you mind pets?",
//       options: JSON.stringify([
//         "Dogs are fine",
//         "Cats are fine",
//         "Other furry critters are ok",
//         "Fur-less critters are ok",
//         "I don’t want pets around"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Where do you see yourself on weekends?",
//       options: JSON.stringify(["Going home", "Partying", "Studying", "Night in"]),
//       category: LivingType.OFF_CAMPUS,
//     },

//     // NOISE LEVELS / QUIET HOURS
//     {
//       text: "When is noise acceptable?",
//       options: JSON.stringify([
//         "Any time of day or night",
//         "During the day and evening, but not at night",
//         "During the daytime only please",
//         "I need the silence of a library"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How often do you have music on?",
//       options: JSON.stringify(["Always!", "Often", "Rarely", "Never"]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "What’s the volume like?",
//       options: JSON.stringify([
//         "Shakes the floor",
//         "Comfortable listening level",
//         "Quiet, background level",
//         "I use headphones"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "When do you go to bed during the week?",
//       options: JSON.stringify([
//         "Early: between 8pm - 11pm",
//         "Moderate: between 11pm - 1am",
//         "Late: between 1am - 4am",
//         "During daylight hours"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "When do you go to bed during the weekends?",
//       options: JSON.stringify([
//         "Early: between 8pm - 11pm",
//         "Moderate: between 11pm - 1am",
//         "Late: between 1am - 4am",
//         "During daylight hours"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Study habits?",
//       options: JSON.stringify([
//         "Must be completely quiet",
//         "Some distractions are ok",
//         "Usually study elsewhere",
//         "Who needs to study?"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How often will you be coming and going?",
//       options: JSON.stringify([
//         "I’ll be home 24/7",
//         "Once or twice per day",
//         "Constantly"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "My friends think I am:",
//       options: JSON.stringify(["Quiet", "Loud"]),
//       category: LivingType.OFF_CAMPUS,
//     },

//     // ROOMIES
//     {
//       text: "What are you hoping for from me as a roommate?",
//       options: JSON.stringify([
//         "Someone to split the bills and chores",
//         "Someone friendly, but don’t have to be best friends",
//         "Someone who wants to hang out and do stuff with"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Which gender are you comfortable living with?",
//       options: JSON.stringify(["Male", "Female"]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Which race/ethnicity do you prefer:",
//       options: JSON.stringify(["Asian", "Caucasian", "African"]),
//       category: LivingType.OFF_CAMPUS,
//     },

//     // SOCIALIZING
//     {
//       text: "What’s your guest policy?",
//       options: JSON.stringify([
//         "The more the merrier!",
//         "Guests all the time",
//         "Not a problem, just ask for a heads up",
//         "One or two guests are okay occasionally",
//         "On a rare occasion guests are fine",
//         "I prefer no guests coming over"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How do you feel about guests spending the night?",
//       options: JSON.stringify([
//         "Doesn’t bother me",
//         "Occasionally is fine, but not multiple nights",
//         "Guests staying over regularly is fine",
//         "I’m not comfortable with guests staying over"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How do you feel about parties?",
//       options: JSON.stringify([
//         "Love them, I’d host every week if I could!",
//         "They’re fine, just provide notice ahead of time",
//         "An occasional dinner/small gathering is fine",
//         "I don’t want to have any parties at my home"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "Will any guests be staying over?",
//       options: JSON.stringify([
//         "I have a guest who will stay over frequently (3+ x/week)",
//         "I have a guest who will stay over occasionally (<3x)",
//         "I do not anticipate any guests staying over"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },

//     // FOOD / EATING / COOKING
//     {
//       text: "Anything about food I should know?",
//       options: JSON.stringify([
//         "I’m vegetarian/vegan but meat can be in the house",
//         "I’m vegetarian/vegan and meat can’t be in the house",
//         "I’m Kosher",
//         "I’m Halal"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How often do you cook?",
//       options: JSON.stringify([
//         "All three meals, most days",
//         "Usually dinners",
//         "One or two big meals a week",
//         "Pretty much never"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     },
//     {
//       text: "How do you feel about alcohol? (Scale: 0 - 5)",
//       options: JSON.stringify([
//         "I’m game for drinks during the week",
//         "I save it for the weekends",
//         "I drink a few times a month",
//         "I don’t drink, but I don’t mind if you do",
//         "I don’t drink, and I’d like an alcohol-free home"
//       ]),
//       category: LivingType.OFF_CAMPUS,
//     }
//   ];

//   // On-Campus Questions 
//   const onCampusQuestions = [
//     // ROOMIES - International
//     {
//       text: "Are you international?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Are you comfortable living with an international student?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.ON_CAMPUS,
//     },
//     // Sexuality
//     {
//       text: "Which sexuality do you identify with?",
//       options: JSON.stringify([
//         "Lesbian/gay",
//         "Bisexual",
//         "Asexual/aromatic",
//         "Transgender",
//         "Non-binary",
//         "Straight"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Which of the following sexualities/identities are you not comfortable living with:",
//       options: JSON.stringify([
//         "Lesbian/gay",
//         "Bisexual",
//         "Asexual/aromatic",
//         "Transgender",
//         "Non-binary",
//         "Straight"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     // Race/Ethnicity
//     {
//       text: "Which of the following races/ethnicities do you identify with:",
//       options: JSON.stringify([
//         "Caucasian",
//         "Asian",
//         "East Asian",
//         "South Asian",
//         "Southeast Asian",
//         "Pacific Islander",
//         "Middle Eastern",
//         "African American",
//         "Hispanic/Latino",
//         "Native American"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Which of the following races/ethnicities are you not comfortable living with:",
//       options: JSON.stringify([
//         "Caucasian",
//         "Asian",
//         "East Asian",
//         "South Asian",
//         "Southeast Asian",
//         "Pacific Islander",
//         "Middle Eastern",
//         "African American",
//         "Hispanic/Latino",
//         "Native American"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     // Religious Affiliation
//     {
//       text: "What is your religious affiliation?",
//       options: JSON.stringify([
//         "Christianity",
//         "Judaism",
//         "Hinduism",
//         "Buddhism",
//         "Islam",
//         "Atheist",
//         "Agnostic"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Which religious affiliations are you not comfortable living with:",
//       options: JSON.stringify([
//         "Christianity",
//         "Judaism",
//         "Hinduism",
//         "Buddhism",
//         "Islam",
//         "Atheist",
//         "Agnostic"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     // Political Affiliation
//     {
//       text: "What is your political affiliation",
//       options: JSON.stringify([
//         "Democrat",
//         "Republican",
//         "Liberal",
//         "Conservative",
//         "Socialist",
//         "Green Party",
//         "Libertarian"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Which political affiliations are you not comfortable living with:",
//       options: JSON.stringify([
//         "Democrat",
//         "Republican",
//         "Liberal",
//         "Conservative",
//         "Socialist",
//         "Green Party",
//         "Libertarian"
//       ]),
//       category: LivingType.ON_CAMPUS,
//     },
//     // Smoking
//     {
//       text: "Do you smoke?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Are you comfortable with your roommate smoking?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.ON_CAMPUS,
//     },
//     // Drinking
//     {
//       text: "Do you describe yourself as an alcoholic person/do you drink?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.ON_CAMPUS,
//     },
//     {
//       text: "Are you comfortable with your roommate drinking?",
//       options: JSON.stringify(["Yes", "No"]),
//       category: LivingType.ON_CAMPUS,
//     }
//   ];

//   // Insert off-campus questions first
//   for (const q of offCampusQuestions) {
//     await prisma.question.create({ data: q });
//   }

//   // Then insert on-campus questions
//   for (const q of onCampusQuestions) {
//     await prisma.question.create({ data: q });
//   }

//   console.log("Seeding complete!");
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });



const { PrismaClient, LivingType } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // On-Campus HABITS Questions
  const onCampusHabitsQuestions = [
    {
      text: "What temperature do you prefer in your room?",
      options: JSON.stringify([
        "Hot: 80℉+",
        "Warm: 75-80℉",
        "Moderate: 70-75℉",
        "Cool: 65-70℉",
        "Cold: 65℉-"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Would you be comfortable with your roommate hosting an overnight guest?",
      options: JSON.stringify([
        "Never",
        "Sometimes",
        "Frequently",
        "Only of the same sex"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Do you expect to have overnight guests?",
      options: JSON.stringify([
        "Never",
        "Sometimes",
        "Frequently",
        "Only of the same sex"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Do you plan to have friends visit your room?",
      options: JSON.stringify([
        "Never",
        "Sometimes",
        "Often"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Would you be comfortable with your roommate’s friend(s) hanging out in your shared room for several hours?",
      options: JSON.stringify([
        "Yes",
        "Depends on who they are",
        "No"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Are you an early bird or a night owl?",
      options: JSON.stringify([
        "Early bird",
        "Night owl"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "How late do you typically stay up / how early do you typically wake up",
      options: JSON.stringify([
        "Wake up: 5 - 9 am",
        "Wake up: 9 am - 12 pm",
        "Wake up: past 12 pm",
        "Sleep: 9 pm - 11 pm",
        "Sleep: 11 pm - 1 am",
        "Sleep: past 1 am"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "How do you typically fall asleep?",
      options: JSON.stringify([
        "Complete quiet",
        "Listen to music with headphones",
        "Background noise/music"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "To sleep, the room needs to be:",
      options: JSON.stringify([
        "Completely dark",
        "Some light",
        "Lights on"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "My friends think I am:",
      options: JSON.stringify([
        "Quiet",
        "Loud"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "How important is cleanliness to you?",
      options: JSON.stringify([
        "Not that much",
        "Very"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "How would you describe your housekeeping habits?",
      options: JSON.stringify([
        "Always clean and organized",
        "Slightly cluttered",
        "Messy"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Do you shower in the morning or before bed?",
      options: JSON.stringify([
        "Morning",
        "Night"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "Where do you see yourself on weekends:",
      options: JSON.stringify([
        "Going home",
        "Partying",
        "Socializing",
        "Studying",
        "A little bit of everything"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "To study, do you prefer:",
      options: JSON.stringify([
        "Complete quiet",
        "Listen to music with headphones",
        "Background noise/music"
      ]),
      category: LivingType.ON_CAMPUS,
    },
    {
      text: "How much time do you expect to stay in your room?",
      options: JSON.stringify([
        "Not very long",
        "Somewhat",
        "Very long",
        "The entire day"
      ]),
      category: LivingType.ON_CAMPUS,
    },
  ];

  // Insert the on-campus habits questions into the database
  for (const q of onCampusHabitsQuestions) {
    await prisma.question.create({ data: q });
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
