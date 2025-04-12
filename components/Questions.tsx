import React, { useState, useRef } from 'react';
import { SUBMIT_ANSWERS } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { useUser } from '@clerk/nextjs';

interface Question {
  id: number;
  text: string;
  answers: string[];
}

interface QuestionGroup {
  groupTitle: string;
  questions: Question[];
}

// ================= On-Campus Question Groups =================
const onCampusGroups: QuestionGroup[] = [
  {
    groupTitle: "International",
    questions: [
      { id: 34, text: "Are you international?", answers: ["Yes", "No"] },
      { id: 35, text: "Are you comfortable living with an international student?", answers: ["Yes", "No"] },
    ],
  },
  {
    groupTitle: "Sexuality",
    questions: [
      { id: 36, text: "Which sexuality do you identify with?", answers: ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"] },
      { id: 37, text: "Which of the following sexualities/identities are you not comfortable living with:", answers: ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"] },
    ],
  },
  {
    groupTitle: "Race/Ethnicity",
    questions: [
      { id: 38, text: "Which of the following races/ethnicities do you identify with:", answers: ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"] },
      { id: 39, text: "Which of the following races/ethnicities are you not comfortable living with:", answers: ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"] },
    ],
  },
  {
    groupTitle: "Religious Affiliation",
    questions: [
      { id: 40, text: "What is your religious affiliation?", answers: ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"] },
      { id: 41, text: "Which religious affiliations are you not comfortable living with:", answers: ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"] },
    ],
  },
  {
    groupTitle: "Political Affiliation",
    questions: [
      { id: 42, text: "What is your political affiliation", answers: ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"] },
      { id: 43, text: "Which political affiliations are you not comfortable living with:", answers: ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"] },
    ],
  },
  {
    groupTitle: "Smoking",
    questions: [
      { id: 44, text: "Do you smoke?", answers: ["Yes", "No"] },
      { id: 45, text: "Are you comfortable with your roommate smoking?", answers: ["Yes", "No"] },
    ],
  },
  {
    groupTitle: "Drinking",
    questions: [
      { id: 46, text: "Do you describe yourself as an alcoholic person/do you drink?", answers: ["Yes", "No"] },
      { id: 47, text: "Are you comfortable with your roommate drinking?", answers: ["Yes", "No"] },
    ],
  },
  {
    groupTitle: "Habits",
    questions: [
      { id: 48, text: "What temperature do you prefer in your room?", answers: ["Hot: 80℉+", "Warm: 75-80℉", "Moderate: 70-75℉", "Cool: 65-70℉", "Cold: 65℉-"] },
      { id: 49, text: "Would you be comfortable with your roommate hosting an overnight guest?", answers: ["Never", "Sometimes", "Frequently", "Only of the same sex"] },
      { id: 50, text: "Do you expect to have overnight guests?", answers: ["Never", "Sometimes", "Frequently", "Only of the same sex"] },
      { id: 51, text: "Do you plan to have friends visit your room?", answers: ["Never", "Sometimes", "Often"] },
      { id: 52, text: "Would you be comfortable with your roommate’s friend(s) hanging out in your shared room for several hours?", answers: ["Yes", "Depends on who they are", "No"] },
      { id: 53, text: "Are you an early bird or a night owl?", answers: ["Early bird", "Night owl"] },
      { id: 54, text: "How late do you typically stay up / how early do you typically wake up", answers: ["Wake up: 5 - 9 am", "Wake up: 9 am - 12 pm", "Wake up: past 12 pm", "Sleep: 9 pm - 11 pm", "Sleep: 11 pm - 1 am", "Sleep: past 1 am"] },
      { id: 55, text: "How do you typically fall asleep?", answers: ["Complete quiet", "Listen to music with headphones", "Background noise/music"] },
      { id: 56, text: "To sleep, the room needs to be:", answers: ["Completely dark", "Some light", "Lights on"] },
      { id: 57, text: "My friends think I am:", answers: ["Quiet", "Loud"] },
      { id: 58, text: "How important is cleanliness to you?", answers: ["Not that much", "Very"] },
      { id: 59, text: "How would you describe your housekeeping habits?", answers: ["Always clean and organized", "Slightly cluttered", "Messy"] },
      { id: 60, text: "Do you shower in the morning or before bed?", answers: ["Morning", "Night"] },
      { id: 61, text: "Where do you see yourself on weekends:", answers: ["Going home", "Partying", "Socializing", "Studying", "A little bit of everything"] },
      { id: 62, text: "To study, do you prefer:", answers: ["Complete quiet", "Listen to music with headphones", "Background noise/music"] },
      { id: 63, text: "How much time do you expect to stay in your room?", answers: ["Not very long", "Somewhat", "Very long", "The entire day"] },
    ],
  },
];

// ================= Off-Campus Question Groups =================
const offCampusGroups: QuestionGroup[] = [
  {
    groupTitle: "SHARING / EXPENSES",
    questions: [
      { id: 1, text: "How should we pay utilities?", answers: ["Split costs evenly", "Separate utility expenses (e.g. One pays for hydro, one pays for internet)"] },
      { id: 2, text: "What are your thoughts on sharing and borrowing?", answers: ["Let’s share everything - no need to ask", "You can probably borrow my stuff - just ask first", "I won’t say no in an emergency (I prefer to not share)", "Sorry, I don’t ever lend my stuff to others"] },
      { id: 3, text: "How should we share common-use items?", answers: ["Take turns buying", "Split costs evenly", "Buy our own items separately"] },
      { id: 4, text: "How should we share common food items?", answers: ["Take turns buying", "Split costs evenly", "Buy our own items separately"] },
    ],
  },
  {
    groupTitle: "CLEANLINESS / UPKEEP",
    questions: [
      { id: 5, text: "How tidy are you?", answers: ["Could eat off the floor", "Everything is put away", "A little messy", "Where’s the floor?"] },
      { id: 6, text: "What’s your kitchen like?", answers: ["Always sparkling clean", "Clean and mostly tidy", "Good luck finding stuff", "Salmonella’s best friend"] },
      { id: 7, text: "What’s your bathroom like?", answers: ["Spotlessly clean - daily tidy", "Pretty good - weekly clean", "Not bad - monthly clean", "Not sure - no cleaning products"] },
      { id: 8, text: "How do you handle dishes?", answers: ["Washed/put away daily", "Washed/dry overnight", "Wash in morning after overnight soak", "Wash only when everything else is dirty"] },
      { id: 9, text: "How will we handle cleaning?", answers: ["Rotate cleaning assignment", "Permanent cleaning assignment", "Decide when need for cleaning arises"] },
      { id: 10, text: "How often will you do your share of cleaning?", answers: ["Daily", "Weekly", "Bi-weekly", "Once a month", "When desired"] },
    ],
  },
  {
    groupTitle: "LIFESTYLE",
    questions: [
      { id: 11, text: "Do you smoke? (Cigarettes, shisha, etc.)", answers: ["Yes", "Yes, but not in the house", "No"] },
      { id: 12, text: "Does smoking bother you?", answers: ["Yes", "No"] },
      { id: 13, text: "Do you have pets?", answers: ["Dog", "Cat", "Other furry critter", "Fur-less critter", "None"] },
      { id: 14, text: "Do you mind pets?", answers: ["Dogs are fine", "Cats are fine", "Other furry critters are ok", "Fur-less critters are ok", "I don’t want pets around"] },
      { id: 15, text: "Where do you see yourself on weekends?", answers: ["Going home", "Partying", "Studying", "Night in"] },
    ],
  },
  {
    groupTitle: "NOISE LEVELS / QUIET HOURS",
    questions: [
      { id: 16, text: "When is noise acceptable?", answers: ["Any time of day or night", "During the day and evening, but not at night", "During the daytime only please", "I need the silence of a library"] },
      { id: 17, text: "How often do you have music on?", answers: ["Always!", "Often", "Rarely", "Never"] },
      { id: 18, text: "What’s the volume like?", answers: ["Shakes the floor", "Comfortable listening level", "Quiet, background level", "I use headphones"] },
      { id: 19, text: "When do you go to bed during the week?", answers: ["Early: between 8pm - 11pm", "Moderate: between 11pm - 1am", "Late: between 1am - 4am", "During daylight hours"] },
      { id: 20, text: "When do you go to bed during the weekends?", answers: ["Early: between 8pm - 11pm", "Moderate: between 11pm - 1am", "Late: between 1am - 4am", "During daylight hours"] },
      { id: 21, text: "Study habits?", answers: ["Must be completely quiet", "Some distractions are ok", "Usually study elsewhere", "Who needs to study?"] },
      { id: 22, text: "How often will you be coming and going?", answers: ["I’ll be home 24/7", "Once or twice per day", "Constantly"] },
      { id: 23, text: "My friends think I am:", answers: ["Quiet", "Loud"] },
    ],
  },
  {
    groupTitle: "ROOMIES",
    questions: [
      { id: 24, text: "What are you hoping for from me as a roommate?", answers: ["Someone to split the bills and chores", "Someone friendly, but don’t have to be best friends", "Someone who wants to hang out and do stuff with"] },
      { id: 25, text: "Which gender are you comfortable living with?", answers: ["Male", "Female"] },
      { id: 26, text: "Which race/ethnicity do you prefer:", answers: ["Asian", "Caucasian", "African"] },
    ],
  },
  {
    groupTitle: "SOCIALIZING",
    questions: [
      { id: 27, text: "What’s your guest policy?", answers: ["The more the merrier!", "Guests all the time", "Not a problem, just ask for a heads up", "One or two guests are okay occasionally", "On a rare occasion guests are fine", "I prefer no guests coming over"] },
      { id: 28, text: "How do you feel about guests spending the night?", answers: ["Doesn’t bother me", "Occasionally is fine, but not multiple nights", "Guests staying over regularly is fine", "I’m not comfortable with guests staying over"] },
      { id: 29, text: "How do you feel about parties?", answers: ["Love them, I’d host every week if I could!", "They’re fine, just provide notice ahead of time", "An occasional dinner/small gathering is fine", "I don’t want to have any parties at my home"] },
      { id: 30, text: "Will any guests be staying over?", answers: ["I have a guest who will stay over frequently (3+ x/week)", "I have a guest who will stay over occasionally (<3x)", "I do not anticipate any guests staying over"] },
    ],
  },
  {
    groupTitle: "FOOD / EATING / COOKING",
    questions: [
      { id: 31, text: "Anything about food I should know?", answers: ["I’m vegetarian/vegan but meat can be in the house", "I’m vegetarian/vegan and meat can’t be in the house", "I’m Kosher", "I’m Halal"] },
      { id: 32, text: "How often do you cook?", answers: ["All three meals, most days", "Usually dinners", "One or two big meals a week", "Pretty much never"] },
      { id: 33, text: "How do you feel about alcohol?", answers: ["I’m game for drinks during the week", "I save it for the weekends", "I drink a few times a month", "I don’t drink, but I don’t mind if you do", "I don’t drink, and I’d like an alcohol-free home"] },
    ],
  },
];

const flattenGroups = (groups: QuestionGroup[]): Question[] =>
  groups.reduce((acc, group) => [...acc, ...group.questions], [] as Question[]);

// ================= QuestionsPage Component =================
const QuestionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"onCampus" | "offCampus" | null>(null);
  const questions =
    selectedCategory === "onCampus"
      ? flattenGroups(onCampusGroups)
      : selectedCategory === "offCampus"
      ? flattenGroups(offCampusGroups)
      : [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [fade, setFade] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const lastScrollTimeRef = useRef<number>(0);
  const scrollThreshold = 1000; // milliseconds
  const [submitQuestionAnswer] = useMutation(SUBMIT_ANSWERS);
  const { user } = useUser();

  const handleCategorySelect = (category: "onCampus" | "offCampus") => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setSelectedAnswers({});
  };

  const handleAnswerSelect = (answer: string): void => {
    setSelectedAnswers((prev) => ({ ...prev, [questions[currentIndex].id]: answer }));
  };

  const changeQuestion = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= questions.length) return;
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(true);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 50);
    }, 300);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>): void => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < scrollThreshold) {
      event.preventDefault();
      return;
    }
    lastScrollTimeRef.current = now;
    if (isTransitioningRef.current) {
      event.preventDefault();
      return;
    }
    if (event.deltaY > 0) {
      if (!selectedAnswers[questions[currentIndex].id]) {
        event.preventDefault();
        return;
      }
      if (currentIndex < questions.length - 1) {
        isTransitioningRef.current = true;
        changeQuestion(currentIndex + 1);
      }
    } else if (event.deltaY < 0 && currentIndex > 0) {
      isTransitioningRef.current = true;
      changeQuestion(currentIndex - 1);
    }
  };

  const handleFinalSubmit = async () => {
    // Replace this with actual submission logic as needed.
    console.log("Submitting answers with:", {
      email: user?.primaryEmailAddress?.emailAddress,
      answers: selectedAnswers
    });
    try {
      const response = await submitQuestionAnswer({
        variables: {
          email: user?.primaryEmailAddress?.emailAddress || "",
          answers: selectedAnswers
        },
      });
    } catch (err) {
      console.error("Error submitting question answers:", err);
    }
    console.log("Submitted answers:", selectedAnswers);
    setIsSubmitted(true);
  };

  // If no category is selected, show the category selection UI.
  if (!selectedCategory) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-50">
        <h2 className="text-3xl font-bold mb-6">Looking For</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleCategorySelect("onCampus")}
            className="px-4 py-2 rounded-md border bg-white text-gray-800 hover:bg-gray-200"
          >
            On-Campus
          </button>
          <button
            onClick={() => handleCategorySelect("offCampus")}
            className="px-4 py-2 rounded-md border bg-white text-gray-800 hover:bg-gray-200"
          >
            Off-Campus
          </button>
        </div>
      </div>
    );
  }

  // If the survey is submitted, show a thank-you message.
  if (isSubmitted) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-neutral-50">
        <h2 className="text-3xl font-bold mb-4">Thank you!</h2>
        <p className="text-xl text-gray-700">Your responses have been submitted.</p>
      </div>
    );
  }

  if (currentIndex < 0 || currentIndex >= questions.length) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="h-screen w-full flex flex-col justify-center items-center overflow-hidden relative bg-neutral-50"
    >
      <div className={`transition-opacity duration-300 ease-in-out ${fade ? "opacity-100" : "opacity-0"} text-center px-4`}>
        <h2 className="text-3xl font-bold mb-6">{questions[currentIndex].text}</h2>
        <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
          {questions[currentIndex].answers.map((answer: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`block w-full text-left px-4 py-2 rounded-md border ${
                selectedAnswers[questions[currentIndex].id] === answer
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {answer}
            </button>
          ))}
        </div>
        {/* If it's the last question and an answer is selected, show the Submit button */}
        {currentIndex === questions.length - 1 && selectedAnswers[questions[currentIndex].id] && (
          <div className="mt-8">
            <button
              onClick={handleFinalSubmit}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
