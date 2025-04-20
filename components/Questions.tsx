// pages/questions.tsx

import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { SUBMIT_ANSWERS, SUBMIT_WEIGHTS } from '@/graphql/mutations';

interface Question {
  id: number;
  text: string;
  answers: string[];
}

interface QuestionGroup {
  groupTitle: string;
  questions: Question[];
}

// ================= On‑Campus Question Groups =================
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
      { id: 37, text: "Which sexualities/identities are you not comfortable living with?", answers: ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"] },
    ],
  },
  {
    groupTitle: "Race/Ethnicity",
    questions: [
      { id: 38, text: "Which race/ethnicity do you identify with?", answers: ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"] },
      { id: 39, text: "Which race/ethnicity are you not comfortable living with?", answers: ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"] },
    ],
  },
  {
    groupTitle: "Religious Affiliation",
    questions: [
      { id: 40, text: "What is your religious affiliation?", answers: ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"] },
      { id: 41, text: "Which religious affiliations are you not comfortable living with?", answers: ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"] },
    ],
  },
  {
    groupTitle: "Political Affiliation",
    questions: [
      { id: 42, text: "What is your political affiliation?", answers: ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"] },
      { id: 43, text: "Which political affiliations are you not comfortable living with?", answers: ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"] },
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
      { id: 46, text: "Do you drink?", answers: ["Yes", "No"] },
      { id: 47, text: "Are you comfortable with your roommate drinking?", answers: ["Yes", "No"] },
    ],
  },
  {
    groupTitle: "Habits",
    questions: [
      { id: 48, text: "What temperature do you prefer in your room?", answers: ["Hot: 80℉+", "Warm: 75–80℉", "Moderate: 70–75℉", "Cool: 65–70℉", "Cold: <65℉"] },
      { id: 49, text: "Would you be comfortable with a roommate hosting an overnight guest?", answers: ["Never", "Sometimes", "Frequently", "Only of the same sex"] },
      { id: 50, text: "Do you expect to have overnight guests?", answers: ["Never", "Sometimes", "Frequently", "Only of the same sex"] },
      { id: 51, text: "Do you plan to have friends visit your room?", answers: ["Never", "Sometimes", "Often"] },
      { id: 52, text: "Comfortable with roommates’ friends hanging out for hours?", answers: ["Yes", "Depends on who they are", "No"] },
      { id: 53, text: "Are you an early bird or a night owl?", answers: ["Early bird", "Night owl"] },
      { id: 54, text: "What’s your sleep/wake schedule?", answers: ["5–9 am", "9 am–12 pm", "After 12 pm", "9–11 pm", "11 pm–1 am", "After 1 am"] },
      { id: 55, text: "How do you fall asleep?", answers: ["Complete quiet", "Headphones", "Background noise"] },
      { id: 56, text: "To sleep, the room needs to be:", answers: ["Completely dark", "Some light", "Lights on"] },
      { id: 57, text: "My friends think I am:", answers: ["Quiet", "Loud"] },
      { id: 58, text: "How important is cleanliness to you?", answers: ["Not that much", "Very"] },
      { id: 59, text: "Describe your housekeeping habits:", answers: ["Always clean", "Slightly cluttered", "Messy"] },
      { id: 60, text: "Do you shower in the morning or before bed?", answers: ["Morning", "Night"] },
      { id: 61, text: "Where do you spend weekends?", answers: ["Home", "Partying", "Socializing", "Studying", "Mixed"] },
      { id: 62, text: "To study, do you prefer:", answers: ["Complete quiet", "Headphones", "Background noise"] },
      { id: 63, text: "How long are you in your room?", answers: ["Short", "Somewhat", "Long", "All day"] },
    ],
  },
];

// ================= Off‑Campus Question Groups =================
const offCampusGroups: QuestionGroup[] = [
  {
    groupTitle: "Sharing / Expenses",
    questions: [
      { id: 1, text: "How should we pay utilities?", answers: ["Split costs evenly", "Separate utilities"] },
      { id: 2, text: "Thoughts on sharing/borrowing?", answers: ["Share freely", "Borrow with ask", "Emergency only", "Never lend"] },
      { id: 3, text: "Share common items?", answers: ["Take turns", "Split evenly", "Own separate"] },
      { id: 4, text: "Share food items?", answers: ["Take turns", "Split evenly", "Own separate"] },
    ],
  },
  {
    groupTitle: "Cleanliness / Upkeep",
    questions: [
      { id: 5, text: "How tidy are you?", answers: ["Eat off floor", "Everything away", "A bit messy", "Floor hidden"] },
      { id: 6, text: "What’s your kitchen like?", answers: ["Sparkling", "Mostly tidy", "Cluttered", "Dirty"] },
      { id: 7, text: "What’s your bathroom like?", answers: ["Daily tidy", "Weekly clean", "Monthly clean", "Never clean"] },
      { id: 8, text: "How handle dishes?", answers: ["Daily wash", "Overnight soak", "Morning wash", "When very dirty"] },
      { id: 9, text: "Cleaning assignment?", answers: ["Rotate", "Permanent", "Ad-hoc"] },
      { id: 10, text: "Cleaning frequency?", answers: ["Daily", "Weekly", "Bi-weekly", "Monthly", "As needed"] },
    ],
  },
  {
    groupTitle: "Lifestyle",
    questions: [
      { id: 11, text: "Do you smoke?", answers: ["Yes in house", "Yes outside", "No"] },
      { id: 12, text: "Does smoking bother you?", answers: ["Yes", "No"] },
      { id: 13, text: "Do you have pets?", answers: ["Dog", "Cat", "Other", "None"] },
      { id: 14, text: "Pet preference?", answers: ["Dogs ok", "Cats ok", "Other ok", "No pets"] },
      { id: 15, text: "Weekend plans?", answers: ["Home", "Party", "Study", "Night in"] },
    ],
  },
  {
    groupTitle: "Noise Levels / Quiet Hours",
    questions: [
      { id: 16, text: "When is noise okay?", answers: ["Any time", "No night noise", "Day only", "Library quiet"] },
      { id: 17, text: "Music on how often?", answers: ["Always", "Often", "Rarely", "Never"] },
      { id: 18, text: "Volume level?", answers: ["Shakes floor", "Comfortable", "Quiet", "Headphones"] },
      { id: 19, text: "Weekday bedtime?", answers: ["8–11 pm", "11–1 am", "After 1 am", "Daytime"] },
      { id: 20, text: "Weekend bedtime?", answers: ["8–11 pm", "11–1 am", "After 1 am", "Daytime"] },
      { id: 21, text: "Study habits?", answers: ["Completely quiet", "Some distractions", "Study elsewhere", "Don’t study"] },
      { id: 22, text: "Coming & going?", answers: ["24/7 home", "Once daily", "Constant"] },
      { id: 23, text: "Friends think I am:", answers: ["Quiet", "Loud"] },
    ],
  },
  {
    groupTitle: "Roommate Preferences",
    questions: [
      { id: 24, text: "What do you want from a roommate?", answers: ["Split chores", "Friendly", "Hang out"] },
      { id: 25, text: "Preferred roommate gender?", answers: ["Male", "Female"] },
      { id: 26, text: "Preferred race/ethnicity?", answers: ["Asian", "Caucasian", "African"] },
    ],
  },
  {
    groupTitle: "Socializing",
    questions: [
      { id: 27, text: "Guest policy?", answers: ["All the time", "Frequent", "Occasional", "Rare", "None"] },
      { id: 28, text: "Guests staying over?", answers: ["Fine", "Sometimes", "Regular", "Not comfortable"] },
      { id: 29, text: "Party preference?", answers: ["Host weekly", "Ok with notice", "Small gatherings", "No parties"] },
      { id: 30, text: "Will guests stay over?", answers: ["Frequently", "Occasionally", "Never"] },
    ],
  },
  {
    groupTitle: "Food / Eating / Cooking",
    questions: [
      { id: 31, text: "Food restrictions?", answers: ["Veg with meat", "Veg no meat", "Kosher", "Halal"] },
      { id: 32, text: "Cooking frequency?", answers: ["Daily", "Dinner only", "Weekly", "Never"] },
      { id: 33, text: "Alcohol policy?", answers: ["Week drinks ok", "Weekend only", "Few times a month", "Don’t drink", "No alcohol"] },
    ],
  },
];

const flattenGroups = (groups: QuestionGroup[]): Question[] =>
  groups.reduce((acc, g) => [...acc, ...g.questions], [] as Question[]);

const QuestionsPage: React.FC = () => {
  const { user } = useUser();
  const [step, setStep] = useState<'questions'|'rank'|'done'>('questions');
  const [selectedCategory, setSelectedCategory] = useState<'onCampus'|'offCampus'|null>(null);

  // Build question & category lists dynamically
  const questions = selectedCategory === 'onCampus'
    ? flattenGroups(onCampusGroups)
    : selectedCategory === 'offCampus'
      ? flattenGroups(offCampusGroups)
      : [];
  const categoryTitles = selectedCategory === 'onCampus'
    ? onCampusGroups.map(g => g.groupTitle)
    : selectedCategory === 'offCampus'
      ? offCampusGroups.map(g => g.groupTitle)
      : [];

  // Step 1 state: survey answers
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number,string>>({});
  const [fade, setFade] = useState(true);
  const isTransitioningRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollThreshold = 1000;

  // Step 2 state: category rankings
  const [categoryRatings, setCategoryRatings] = useState<Record<string,number>>(
    Object.fromEntries(categoryTitles.map(c => [c, 5]))
  );

  // GraphQL mutations
  const [submitAnswers] = useMutation(SUBMIT_ANSWERS);
  const [submitWeights] = useMutation(SUBMIT_WEIGHTS);

  // Handlers...
  const handleCategorySelect = (cat: 'onCampus'|'offCampus') => setSelectedCategory(cat);

  const handleAnswerSelect = (answer: string) =>
    setSelectedAnswers(a => ({ ...a, [questions[currentIndex].id]: answer }));

  const changeQuestion = (newIdx: number) => {
    if (newIdx<0||newIdx>=questions.length) return;
    setFade(false);
    setTimeout(()=>{
      setCurrentIndex(newIdx);
      setFade(true);
      isTransitioningRef.current=false;
    },300);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < scrollThreshold || isTransitioningRef.current) {
      e.preventDefault(); return;
    }
    lastScrollTimeRef.current = now;
    if (e.deltaY>0) {
      if (!selectedAnswers[questions[currentIndex].id]) { e.preventDefault(); return; }
      isTransitioningRef.current=true;
      changeQuestion(currentIndex+1);
    } else {
      isTransitioningRef.current=true;
      changeQuestion(currentIndex-1);
    }
  };

  const handleFinalSubmitAnswers = async () => {
    await submitAnswers({
      variables: {
        email: user?.primaryEmailAddress?.emailAddress || '',
        answers: selectedAnswers
      }
    });
    setStep('rank');
  };

  const handleRatingChange = (category: string, rating: number) =>
    setCategoryRatings(r => ({ ...r, [category]: rating }));

  const handleSubmitRatings = async () => {
    await submitWeights({
      variables: {
        email: user?.primaryEmailAddress?.emailAddress || '',
        weights: categoryRatings
      }
    });
    setStep('done');
  };

  // Render flows:

  // 1) Choose on/off campus
  if (!selectedCategory && step==='questions') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-50">
        <h2 className="text-3xl font-bold mb-6">Looking For</h2>
        <div className="flex space-x-4">
          <button onClick={()=>handleCategorySelect('onCampus')}
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100">
            On‑Campus
          </button>
          <button onClick={()=>handleCategorySelect('offCampus')}
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100">
            Off‑Campus
          </button>
        </div>
      </div>
    );
  }

  // 2) Survey questions
  if (step==='questions' && selectedCategory) {
    const q = questions[currentIndex];
    return (
      <div onWheel={handleWheel}
           className="h-screen w-full flex flex-col justify-center items-center bg-neutral-50 overflow-hidden">
        <div className={`transition-opacity duration-300 ${fade?'opacity-100':'opacity-0'} text-center px-4`}>
          <h2 className="text-3xl font-bold mb-6">{q.text}</h2>
          <div className="space-y-4 w-full max-w-md mx-auto">
            {q.answers.map((a,i)=>(
              <button key={i}
                onClick={()=>handleAnswerSelect(a)}
                className={`w-full text-left px-4 py-2 border rounded ${
                  selectedAnswers[q.id]===a
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >{a}</button>
            ))}
          </div>
          {currentIndex===questions.length-1 && selectedAnswers[q.id] && (
            <button onClick={handleFinalSubmitAnswers}
                    className="mt-8 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
              Continue
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3) Category ranking
  if (step==='rank') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
        <h2 className="text-2xl font-bold mb-4">Please rank the following categories of the questions in terms of importance (1–10)</h2>
        <div className="w-full max-w-lg space-y-6">
          {categoryTitles.map(cat=>(
            <div key={cat} className="flex items-center justify-between">
              <span className="font-medium">{cat}</span>
              <select
                value={categoryRatings[cat]}
                onChange={e=>handleRatingChange(cat, +e.target.value)}
                className="border rounded px-2 py-1"
              >
                {[...Array(10)].map((_,i)=>(
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleSubmitRatings}
                className="mt-8 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
          Submit Rankings
        </button>
      </div>
    );
  }

  // 4) Thank you
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-50">
      <h2 className="text-3xl font-bold">Thank You!</h2>
      <p className="mt-4 text-gray-700">Your responses and rankings have been submitted.</p>
    </div>
  );
};

export default QuestionsPage;
