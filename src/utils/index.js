import FileSaver from 'file-saver';
import { surpriseMePrompts,productPrompts, quePrompts } from '../constants';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}


export function getRandomPromptProduct(prompt) {
  const randomIndex = Math.floor(Math.random() * productPrompts.length);
  const randomPrompt = productPrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export function getRandomPromptquePrompts(prompt) {
  const randomIndex = Math.floor(Math.random() * quePrompts.length);
  const randomPrompt = quePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}