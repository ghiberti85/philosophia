import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getQuestionsFor } from '@/data/quizzes';
import { QuizModal } from './QuizModal';

const questions = getQuestionsFor('plato');

function renderModal() {
  return render(
    <QuizModal
      questions={questions}
      locale="en"
      philosopherName="Plato"
      storageKey="test:best:plato"
    />,
  );
}

describe('QuizModal', () => {
  it('renders only the trigger button initially', () => {
    renderModal();
    expect(screen.getByRole('button', { name: /take the quiz/i })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the quiz in a dialog when triggered', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /take the quiz/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument();
  });

  it('closes on the close button', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /take the quiz/i }));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /take the quiz/i }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('locks body scroll while open and restores it on close', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /take the quiz/i }));
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.body.style.overflow).toBe('');
  });
});
