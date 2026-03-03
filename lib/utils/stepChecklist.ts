export interface StepChecklistItem {
  id: string;
  title: string;
  details: string;
}

const ACTION_SENTENCE_RE =
  /\b(create|install|open|run|set|configure|connect|test|verify|confirm|deploy|click|add|enable|choose|write|copy|paste|commit|push|publish|start|stop|review|validate|select|download|sign in|log in|setup)\b/i;

const VERIFY_SENTENCE_RE = /\b(verify|confirm|test|validate|check)\b/i;

function toPlainText(html: string): string {
  return html
    .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function toSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|(?<=\.)\s+(?=[A-Z])|\n+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function titleFromSentence(sentence: string): string {
  const cleaned = sentence
    .replace(/^(then|next|after that|finally|now)\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= 84) {
    return cleaned;
  }
  return `${cleaned.slice(0, 81).trim()}...`;
}

function toId(value: string, index: number): string {
  return `${index}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function buildStepChecklist(stepTitle: string, stepBodyHtml: string): StepChecklistItem[] {
  const plain = toPlainText(stepBodyHtml);
  const sentences = toSentences(plain);

  const actionSentences: string[] = [];
  for (const sentence of sentences) {
    if (!ACTION_SENTENCE_RE.test(sentence)) {
      continue;
    }
    if (actionSentences.some((existing) => existing.toLowerCase() === sentence.toLowerCase())) {
      continue;
    }
    actionSentences.push(sentence);
    if (actionSentences.length >= 4) {
      break;
    }
  }

  const checklist: StepChecklistItem[] = actionSentences.map((sentence, index) => ({
    id: toId(titleFromSentence(sentence), index),
    title: titleFromSentence(sentence),
    details: sentence,
  }));

  const hasVerificationItem = checklist.some((item) => VERIFY_SENTENCE_RE.test(item.title));
  if (!hasVerificationItem) {
    const verificationSentence =
      sentences.find((sentence) => VERIFY_SENTENCE_RE.test(sentence)) ??
      "Verify the expected output, behavior, or result before continuing.";
    checklist.push({
      id: toId("verify-step", checklist.length),
      title: "Verify this step is complete",
      details: verificationSentence,
    });
  }

  if (checklist.length < 3) {
    checklist.unshift({
      id: toId("complete-primary-action", 0),
      title: `Complete: ${stepTitle}`,
      details: "Carry out the primary action described in this step before moving forward.",
    });
    checklist.push({
      id: toId("capture-result", checklist.length + 1),
      title: "Capture what changed",
      details: "Note the output, config change, or UI result so you can debug faster if something fails later.",
    });
  }

  return checklist.slice(0, 6);
}
