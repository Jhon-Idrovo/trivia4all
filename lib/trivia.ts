const CATEGORIES = {
  General: 9,
  Computers: 18,
  Books: 10,
  Films: 11,
  Music: 12,
  "Musicals&Theatres": 13,
  Television: 14,
  "Video Games": 15,
  "Board Games": 16,
  "Science&Nature": 17,
  Mathematics: 19,
  Mythology: 20,
  Sports: 21,
  Geography: 22,
  History: 22,
  Politics: 23,
  Art: 24,
  Celebrities: 25,
  Animals: 26,
  Vehicles: 27,
  Comics: 28,
  "Science Gadgets": 29,
  Anime: 30,
  Cartoons: 31,
};

export declare type Category = keyof typeof CATEGORIES;
export declare interface IUser {
  id: string;
  email: string;
  token: string;
  name: string;
  profilePic: string;
}
export declare interface IServerQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export declare interface IClientQuestion {
  options: string[];
  answerIndex: number;
  question: string;
}
export const getAllCategoryNames = () => {
  const categories = Object.keys(CATEGORIES);
  return categories as Category[];
};
export const getCategoryCode = (name: Category) => {
  return CATEGORIES[name];
};

export const calcPoints = (answers: string[]) => {
  return answers.filter((a) => a === "correct").length * 100;
};
