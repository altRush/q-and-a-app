import { qnaArray } from "../types";

export const createQuestionDOM = (questionArray: string[]): string => {
  const questionDOMArray = questionArray.map(
    (question) => `<div>${question}</div>`
  );

  return questionDOMArray.reduce((dom: string, question: string) => {
    return dom + question;
  });
};

export const renderQuestions = (questionDOM: string): void => {
  const element = document.getElementById("questions");

  if (element) element.innerHTML = questionDOM;
};

export const findAnswer = (qnaObject: qnaArray[], question: string): string => {
  return qnaObject.filter((entry) => entry.question === question)[0]["answer"];
};
